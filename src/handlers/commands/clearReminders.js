/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const clearReminders = async (data) => {
  try {
    const { from } = data;

    const query_string = 'UPDATE reminders SET reminded = true WHERE phone_number = $1';

    const { success } = await query('db', query_string, [from]);

    if (!success) await sendMessage(`+${from}`, 'something messed up, try again later.');
    if (success) {
      await sendMessage(`+${from}`, 'reminders cleared successfully.');
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default clearReminders;
