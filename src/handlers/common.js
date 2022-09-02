/* eslint-disable consistent-return */
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { query } from '../db/database.js';
import twilio from '../clients/twilio.js';
import telnyx from '../clients/telnyx.js';

dotenv.config();

const sendMessage = async (to, text) => {
  console.log(`Sending message ${text} to ${to}...`);
  try {
    if (process.env.SMS_PROVIDER === 'twilio') {
      const params = new URLSearchParams();
      params.append('To', `+${to}`);
      params.append('Body', text);
      params.append('MessagingServiceSid', process.env.TWILIO_MESSAGING_SERVICE_SID);

      const resp = await twilio.post('', params);
      if (resp.status === 201) return true;
      return false;
    } if (process.env.SMS_PROVIDER === 'telnyx') {
      const data = { to: `+${to}`, text };

      const resp = await telnyx.post('', data);
      if (resp.status === 200) return true;
      return false;
    }
  } catch (e) {
    console.log(e)
  }
};

const epochTimeNow = () => Math.floor(new Date().getTime() / 1000);

const addReminderToDatabase = async (number, reminder_raw, reminder_command) => {
  try {
    const time_now = epochTimeNow();

    let remind_at;
    if (reminder_command === '/remindme5mins') remind_at = time_now + 300;
    else if (reminder_command === '/remindme2hrs') remind_at = time_now + 7200;
    else if (reminder_command === '/remindme12hrs') remind_at = time_now + 43200;
    else if (reminder_command === '/remindme24hrs') remind_at = time_now + 86400;
    else return;

    const phone_number = parseInt(number?.replace('+', ''), 10);
    if (typeof phone_number !== 'number') return;

    const id = uuid();

    const reminder = reminder_raw.toString().slice(0, 100);

    const query_string = 'INSERT INTO reminders (id, phone_number, reminder, remind_at, reminded) '
      + 'VALUES ($1, $2, $3, $4, false)';

    console.log([id, phone_number, reminder, remind_at]);

    const { success } = await query(
      'db',
      query_string,
      [id, phone_number, reminder, remind_at],
    );

    if (success) await sendMessage(phone_number, `Reminder set for ${new Date(remind_at * 1000)?.toUTCString()}.`);

    return true;
  } catch (e) {
    console.log(e);
  }
};

export { sendMessage, addReminderToDatabase, epochTimeNow };
