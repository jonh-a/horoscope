/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import telnyx from '../clients/telnyx.js';

dotenv.config();

const sendMessage = async (to, text) => {
  console.log(`Sending message ${text} to ${to}...`);
  try {
    const data = { from: process.env.SMS_PROVIDER_FROM_NUMBER, to: `+${to?.replace('+', '')}`, text };

    const resp = await telnyx.post('v2/messages', data);
    if (resp.status === 200) {
      console.log(`...message successfully sent to ${to}.`);
      return true;
    }
    console.log(`...failed to send message to ${to}.`);
    return false;
  } catch (e) {
    console.log(e?.response?.data?.errors);
  }
};

const epochTimeNow = () => Math.floor(new Date().getTime() / 1000);

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

export {
  sendMessage, epochTimeNow, randomNumber,
};
