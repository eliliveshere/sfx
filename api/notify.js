export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, signature, ip, timestamp, checkoutUrl } = req.body;
  const fullName = firstName + ' ' + lastName;

  const html = [
    '<div style="font-family:sans-serif;max-width:600px;">',
    '<h2 style="margin:0 0 24px;">Purchase Agreement Signed</h2>',
    '<table style="border-collapse:collapse;width:100%;">',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">Timestamp</td><td style="padding:8px 0;font-size:13px;">' + timestamp + '</td></tr>',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">IP Address</td><td style="padding:8px 0;font-size:13px;">' + ip + '</td></tr>',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">Full Name</td><td style="padding:8px 0;font-size:13px;">' + fullName + '</td></tr>',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">Email</td><td style="padding:8px 0;font-size:13px;">' + email + '</td></tr>',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">Signature</td><td style="padding:8px 0;font-size:13px;font-style:italic;">' + signature + '</td></tr>',
    '<tr><td style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;">Checkout URL</td><td style="padding:8px 0;font-size:12px;word-break:break-all;">' + checkoutUrl + '</td></tr>',
    '</table>',
    '</div>',
  ].join('');

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
        subject: 'Purchase Agreement Signed — ' + fullName,
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
