import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default axios.create({
  baseURL: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
  auth: {
    username: process.env.TWILIO_ACCOUNT_SID,
    password: process.env.TWILIO_API_KEY,
  },
});
