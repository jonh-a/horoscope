import { epochTimeNow, sendMessage } from '../handlers/common.js';
import { query } from '../db/database.js';

const checkReminders = async () => {
  try {
    const timeNow = epochTimeNow();
    const timeIn5Mins = timeNow + 300;

    const query_string = 'SELECT * FROM reminders WHERE remind_at >= $1 AND remind_at <= $2 '
      + 'AND reminded = false';

    const { data, error } = await query(
      'db',
      query_string,
      [timeNow, timeIn5Mins],
    );

    if (data) {
      data?.forEach(async (reminder) => {
        await sendMessage(reminder?.phone_number, `Reminder: ${reminder?.reminder}`);
        const update_query = 'UPDATE reminders SET reminded = true WHERE id = $1';
        await query('db', update_query, [reminder?.id]);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default checkReminders;
