/* eslint-disable consistent-return */
import { sendMessage } from '../common.js';
import { query } from '../../db/database.js';

const listReminders = async (data) => {
  try {
    const { from } = data;

    const query_string = 'SELECT * FROM reminders WHERE phone_number = $1 '
      + 'AND reminded = false AND reminder IS NOT NULL AND remind_at IS NOT NULL '
      + 'ORDER BY remind_at LIMIT 5';

    const { data: reminders } = await query('db', query_string, [from]);

    if (!reminders) await sendMessage(`+${from}`, 'no reminders found');
    if (reminders) {
      await sendMessage(`+${from}`, `your reminders:\n${reminders?.map((r) => (
        `${new Date(r.remind_at * 1000)?.toUTCString()?.toLowerCase()} - ${r.reminder}`
      ))?.join('\n')}`);
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default listReminders;
