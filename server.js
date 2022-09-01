import express from 'express';
import cron from 'node-cron';
import handleIncomingSms from './src/handlers/incoming_sms.js';
import checkReminders from './src/jobs/checkReminders.js';

const app = express();
app.use(express.json());

app.get('/health', async (_, res) => res.json({ status: 'OK' }));

app.post('/messages/webhooks', handleIncomingSms);

app.listen('3030', () => console.log('Listening on port 3030.'));

cron.schedule('* * * * *', async () => checkReminders());
