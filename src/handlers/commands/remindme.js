/* eslint-disable consistent-return */
import { addReminderToDatabase } from '../common.js';

const remindme = async (data) => {
  try {
    const { command, from, text } = data;

    const reminder = text?.split(' ')?.slice(1)?.join(' ');

    const confirmation = await addReminderToDatabase(from, reminder, command);
    if (confirmation) return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default remindme;
