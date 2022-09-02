/* eslint-disable consistent-return */
import axios from 'axios';
import { sendMessage, randomNumber } from '../handlers/common.js';
import { query } from '../db/database.js';
import activities from '../files/activities.js';

const fetchHoroscope = async (sign) => {
  try {
    const resp = await axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`);
    if (
      resp?.data?.description
      && resp?.data?.current_date
      && resp?.data?.mood
      && resp?.data?.color
    ) {
      return resp?.data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

const fetchActivity = (sign) => activities[sign][randomNumber(0, activities[sign].length)];

const parseHoroscope = async (number, sign) => {
  const horoscope = await fetchHoroscope(sign);
  if (!horoscope) return;
  const activity = fetchActivity(sign);

  let horoscopeParsed = `${horoscope?.current_date?.toLowerCase()}\n\n`
    + `today you're feeling ${horoscope?.mood?.toLowerCase()}.`;
  if (activity) horoscopeParsed += ` you should ${activity}`;
  horoscopeParsed += `\n\nyour lucky number is ${horoscope?.lucky_number}.`;

  const resp = await sendMessage(`+${number}`, horoscopeParsed);
  if (!resp) console.log(`Failed to send horoscope to ${number}.`);
};

const sendHoroscopes = async () => {
  try {
    const query_string = 'SELECT * FROM users WHERE horoscope = true AND zodiac IS NOT NULL';
    const { data, error } = await query('db', query_string, []);

    if (data && !error) {
      data?.forEach(async (user) => {
        await parseHoroscope(user?.phone_number, user?.zodiac);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default sendHoroscopes;
