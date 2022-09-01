import remindme from './commands/remindme.js';

const handleIncomingSms = async (req, res) => {
  try {
    let from;
    let text;

    const contentType = req?.headers?.['content-type'];
    const body = req?.body;

    if (contentType?.includes('urlencoded')) {
      from = body?.From;
      text = body?.Body;
    }

    if (contentType?.includes('json')) {
      from = body?.payload?.from?.phone_number;
      text = body?.payload?.text;
    }

    if (
      !from
      || !text
      || typeof from !== 'string'
      || typeof text !== 'string'
    ) return res.json({ ok: false, error: 'Could not determine from number or text.' });

    const validCommands = [
      '/help',
      '/horoscopeon',
      '/horoscopeoff',
      '/remindme5mins',
      '/remindme2hrs',
      '/remindme12hrs',
      '/remindme24hrs',
      '/remindme1week',
      '/reminders',
      '/weatheron',
      '/weatheroff',
    ];

    const command = text?.split(' ')[0];

    if (!validCommands.includes(command)) return res.json({ ok: false, error: 'Invalid command.' });

    if (command?.startsWith('/remindme')) {
      const resp = remindme({ command, from, text });
      if (resp) return res.json({ ok: true });
      return res.json({ ok: false, error: 'Failed to parse reminder.' });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({ ok: false, error: 'Unexpected error.' });
  }
};

export default handleIncomingSms;
