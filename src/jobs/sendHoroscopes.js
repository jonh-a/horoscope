/* eslint-disable consistent-return */
import axios from 'axios';
import { sendMessage, randomNumber } from '../handlers/common.js';
import { query } from '../db/database.js';
import activities from '../files/activities.js';
import openweathermap from '../clients/openweathermap.js';

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

const fetchWeather = async (zip) => {
  console.log(`Fetching weather for ${zip}...`);
  const params = {
    zip: `${zip},US`,
    units: 'imperial',
  };

  const resp = await openweathermap.get('forecast', { params });
  console.log(resp);
  if (!resp?.data?.list || resp?.status !== 200) {
    console.log('...Failed to fetch weather.', resp?.data?.message);
    return false;
  }

  const time_now = Math.floor(new Date().getTime() / 1000);

  const forecast = resp?.data?.list?.filter((f) => (
    f?.dt >= time_now && f?.dt <= time_now + 10800
  ))[0];

  if (!forecast?.main?.feels_like || !forecast?.weather[0]?.description) {
    console.log('...Forecast not found.');
    return false;
  }

  return `in a few hours, it'll feel like ${Math.floor(forecast?.main?.feels_like)} with ${forecast?.weather[0]?.description}.`;
};

const fetchActivity = (sign) => activities[sign][randomNumber(0, activities[sign].length)];

const parseHoroscope = async (number, sign, weather) => {
  const horoscope = await fetchHoroscope(sign);
  if (!horoscope) return;
  const activity = fetchActivity(sign);

  let horoscopeParsed = `${horoscope?.current_date?.toLowerCase()}\n\n`
    + `today you're feeling ${horoscope?.mood?.toLowerCase()}.`;
  if (activity) horoscopeParsed += ` you should ${activity}`;
  horoscopeParsed += `\n\nyour lucky number is ${horoscope?.lucky_number}.`;
  if (weather) horoscopeParsed += `\n\n${weather}`;

  const resp = await sendMessage(`+${number}`, horoscopeParsed);
  if (!resp) console.log(`Failed to send horoscope to ${number}.`);
};

const sendHoroscopes = async () => {
  console.log('Running horoscope job.');
  try {
    const query_string = 'SELECT * FROM users WHERE horoscope = true AND zodiac IS NOT NULL';
    const { data, error } = await query('db', query_string, []);

    if (data && !error) {
      data?.forEach(async (user) => {
        let weather = false;
        if (user?.weather === true && user?.zip) {
          weather = await fetchWeather(user?.zip);
        }
        await parseHoroscope(user?.phone_number, user?.zodiac, weather);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default sendHoroscopes;
