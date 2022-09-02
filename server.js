import express from 'express';
import cron from 'node-cron';
import handleIncomingSms from './src/handlers/incomingMessage.js';
import checkReminders from './src/jobs/checkReminders.js';
import sendHoroscopes from './src/jobs/sendHoroscopes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (_, res) => res.json({ status: 'OK' }));

app.post('/messages/webhooks', handleIncomingSms);

app.listen('3030', () => console.log('Listening on port 3030.'));

cron.schedule('* * * * *', async () => checkReminders());
cron.schedule(
  '58 * * * *',
  async () => sendHoroscopes(),
  { scheduled: true, timezone: 'America/Atka' },
);
