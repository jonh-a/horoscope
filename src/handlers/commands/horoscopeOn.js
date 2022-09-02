/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const addHoroscopeToDatabase = async (from, sign) => {
  const query_string = 'INSERT INTO users (phone_number, horoscope, zodiac) '
    + 'VALUES ($1, true, $2) '
    + 'ON CONFLICT (phone_number) DO UPDATE '
    + 'SET horoscope = true, zodiac = $2';

  const { success, error } = await query(
    'db',
    query_string,
    [from, sign],
  );

  console.log(success, error);

  if (success) return true;
  return false;
};

const horoscopeOn = async (data) => {
  try {
    const { from, text } = data;

    const sign = text?.split(' ')[1]?.toLowerCase();

    const validSigns = [
      'aries',
      'taurus',
      'gemini',
      'cancer',
      'leo',
      'virgo',
      'libra',
      'scorpio',
      'sagittarius',
      'capricorn',
      'aquarius',
      'pisces',
    ];

    if (!sign || !validSigns.includes(sign)) {
      await sendMessage(`+${from}`, 'you must provide a valid sign (ex. /horoscopeon leo).');
      return false;
    }

    const confirmation = await addHoroscopeToDatabase(from, sign);
    if (confirmation) {
      await sendMessage(`+${from}`, 'daily horoscopes enabled');
      return true;
    }
    await sendMessage(`+${from}`, 'something got messed up, try again later.');
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default horoscopeOn;
