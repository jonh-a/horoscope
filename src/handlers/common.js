/* eslint-disable consistent-return */
import dotenv from 'dotenv';
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
    console.log(e);
  }
};

const epochTimeNow = () => Math.floor(new Date().getTime() / 1000);

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

export {
  sendMessage, epochTimeNow, randomNumber,
};
