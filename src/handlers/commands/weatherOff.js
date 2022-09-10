/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const removeWeatherFromDatabase = async (from) => {
  const query_string = 'UPDATE USERS set weather = false WHERE phone_number = $1';

  const { success, error } = await query(
    'db',
    query_string,
    [from],
  );

  console.log(success, error);

  if (success) return true;
  return false;
};

const weatherOff = async (data) => {
  try {
    const { from } = data;

    const confirmation = await removeWeatherFromDatabase(from);
    if (confirmation) {
      await sendMessage(`+${from}`, 'daily weather disabled');
      return true;
    }
    await sendMessage(`+${from}`, 'something got messed up, try again later.');
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default weatherOff;
