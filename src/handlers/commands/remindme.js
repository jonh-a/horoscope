/* eslint-disable consistent-return */
import { v4 as uuid } from 'uuid';
import { sendMessage, epochTimeNow } from '../common.js';
import { query } from '../../db/database.js';

const addReminderToDatabase = async (number, reminder_raw, reminder_command) => {
  try {
    const time_now = epochTimeNow();

    let remind_at;
    if (reminder_command === '/remindme5mins') remind_at = time_now + 300;
    else if (reminder_command === '/remindme2hrs') remind_at = time_now + 7200;
    else if (reminder_command === '/remindme12hrs') remind_at = time_now + 43200;
    else if (reminder_command === '/remindme24hrs') remind_at = time_now + 86400;
    else return;

    const id = uuid();

    const reminder = reminder_raw.toString().slice(0, 100);

    const query_string = 'INSERT INTO reminders (id, phone_number, reminder, remind_at, reminded) '
      + 'VALUES ($1, $2, $3, $4, false)';

    console.log([id, number, reminder, remind_at]);

    const { success } = await query(
      'db',
      query_string,
      [id, number, reminder, remind_at],
    );

    if (success) await sendMessage(`+${number}`, `Reminder set for ${new Date(remind_at * 1000)?.toUTCString()}.`);

    return true;
  } catch (e) {
    console.log(e);
  }
};

const remindMe = async (data) => {
  try {
    const { command, from, text } = data;

    const reminder = text?.split(' ')?.slice(1)?.join(' ');

    const confirmation = await addReminderToDatabase(from, reminder, command);
    if (confirmation) return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default remindMe;
