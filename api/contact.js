export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const fullName = firstName + ' ' + lastName;

  const td1 = 'style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;"';
  const td2 = 'style="padding:8px 0;font-size:13px;"';

  const html = `
<div style="font-family:sans-serif;max-width:600px;">
  <h2 style="margin:0 0 24px;">New Contact Form Submission</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td ${td1}>Name</td><td ${td2}>${fullName}</td></tr>
    <tr><td ${td1}>Email</td><td ${td2}><a href="mailto:${email}">${email}</a></td></tr>
  </table>
  <hr style="margin:24px 0;border:none;border-top:1px solid #e0e0e0;" />
  <p style="font-size:13px;color:#444;white-space:pre-wrap;line-height:1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
</div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SFX LED <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL,
        reply_to: email,
        subject: 'Contact Form — ' + fullName,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
