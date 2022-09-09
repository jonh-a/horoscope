import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default axios.create({
  baseURL: 'https://api.telnyx.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
  },
});
