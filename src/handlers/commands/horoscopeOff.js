/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const removeHoroscopeFromDatabase = async (from) => {
  const query_string = 'UPDATE USERS set horoscope = false WHERE phone_number = $1';

  const { success, error } = await query(
    'db',
    query_string,
    [from],
  );

  console.log(success, error);

  if (success) return true;
  return false;
};

const horoscopeOff = async (data) => {
  try {
    const { from } = data;

    const confirmation = await removeHoroscopeFromDatabase(from);
    if (confirmation) {
      await sendMessage(`+${from}`, 'daily horoscopes disabled');
      return true;
    }
    await sendMessage(`+${from}`, 'something got messed up, try again later.');
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default horoscopeOff;
