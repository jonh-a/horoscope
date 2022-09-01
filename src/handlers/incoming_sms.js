import remindme from './commands/remindme.js';

const handleIncomingSms = async (req, res) => {
  console.log(req);
  try {
    const payload = req?.body?.payload;
    const { from, text } = payload;

    if (
      !from
      || !text
      || typeof from !== 'string'
      || typeof text !== 'string'
    ) return res.json({ ok: false });

    const validCommands = [
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
    console.log(command);

    if (!validCommands.includes(command)) return res.json({ ok: false });

    if (command?.startsWith('/remindme')) {
      const resp = remindme({ command, from, text });
      if (resp) return res.json({ ok: true });
      return res.json({ ok: false });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({ ok: false });
  }
};

export default handleIncomingSms;
