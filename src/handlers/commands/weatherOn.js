/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const addWeatherToDatabase = async (from, zip) => {
  const query_string = 'INSERT INTO users (phone_number, weather, zip) '
    + 'VALUES ($1, true, $2) '
    + 'ON CONFLICT (phone_number) DO UPDATE '
    + 'SET weather = true, zip = $2';

  const { success, error } = await query(
    'db',
    query_string,
    [from, zip],
  );

  console.log(success, error);

  if (success) return true;
  return false;
};

const weatherOn = async (data) => {
  try {
    const { from, text } = data;

    const zip = text?.split(' ')[1]?.toLowerCase();

    if (!zip || Number.isNaN(parseInt(zip, 10))) {
      await sendMessage(`+${from}`, 'you must provide a valid US zipcode (ex. /horoscopeon 12345).');
      return false;
    }

    const confirmation = await addWeatherToDatabase(from, zip);
    if (confirmation) {
      await sendMessage(`+${from}`, 'daily weather data enabled');
      return true;
    }
    await sendMessage(`+${from}`, 'something got messed up, try again later.');
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default weatherOn;
