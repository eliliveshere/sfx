export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, signature, ip, timestamp, checkoutUrl } = req.body;
  const fullName = firstName + ' ' + lastName;

  const td1 = 'style="padding:8px 20px 8px 0;color:#666;font-size:13px;white-space:nowrap;"';
  const td2 = 'style="padding:8px 0;font-size:13px;"';

  const html = `
<div style="font-family:sans-serif;max-width:600px;">
  <h2 style="margin:0 0 24px;">Purchase Agreement Signed</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td ${td1}>Timestamp</td><td ${td2}>${timestamp}</td></tr>
    <tr><td ${td1}>IP Address</td><td ${td2}>${ip}</td></tr>
    <tr><td ${td1}>Full Name</td><td ${td2}>${fullName}</td></tr>
    <tr><td ${td1}>Email</td><td ${td2}>${email}</td></tr>
    <tr><td ${td1}>Signature</td><td style="padding:8px 0;font-size:13px;font-style:italic;">${signature}</td></tr>
    <tr><td ${td1}>Checkout URL</td><td style="padding:8px 0;font-size:12px;word-break:break-all;">${checkoutUrl}</td></tr>
  </table>

  <hr style="margin:32px 0;border:none;border-top:1px solid #e0e0e0;" />

  <h3 style="margin:0 0 16px;font-size:15px;">SFX LED / WLED Lab — Customer Purchase Agreement</h3>
  <p style="font-size:13px;color:#444;line-height:1.6;">By signing and proceeding to checkout, the customer acknowledged and agreed to the following terms.</p>

  <h4 style="margin:20px 0 8px;font-size:13px;">1. Final Sale Policy</h4>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>All purchases are final once the order has been shipped.</li>
    <li>Due to the nature of our products and fulfillment process, we do not offer refunds after shipment.</li>
    <li>Customers agree that placing an order constitutes acceptance of this final sale policy.</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">2. Faulty or Damaged Products</h4>
  <p style="font-size:13px;color:#444;line-height:1.6;margin:0 0 8px;">If a product arrives faulty or damaged, the customer must notify us within 7 days of delivery with:</p>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>Order number</li>
    <li>Clear photo or video evidence showing the issue</li>
    <li>A brief description of the problem</li>
  </ul>
  <p style="font-size:13px;color:#444;line-height:1.6;margin:8px 0 0;">Claims submitted after 7 days of delivery may not be eligible for replacement.</p>

  <h4 style="margin:20px 0 8px;font-size:13px;">3. Delivery Confirmation</h4>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>Once an order has been marked as delivered by the shipping carrier, the order is considered successfully fulfilled.</li>
    <li>If a package is marked delivered but cannot be located, the customer agrees to contact the shipping carrier directly.</li>
    <li>We are not responsible for packages that are lost or stolen after confirmed delivery.</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">4. Address Accuracy</h4>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>Customers are responsible for providing a correct and complete shipping address.</li>
    <li>Orders shipped to an address provided by the customer are considered fulfilled once delivered to that address.</li>
    <li>We are not responsible for delivery issues caused by incorrect address information.</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">5. Product Use &amp; Responsibility</h4>
  <p style="font-size:13px;color:#444;line-height:1.6;margin:0 0 8px;">Our products are intended for personal use only. The customer assumes responsibility for proper handling, installation, and operation. We are not liable for damages caused by:</p>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>Improper installation</li>
    <li>Product modification</li>
    <li>Misuse or unsafe operation</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">6. Chargeback &amp; Dispute Policy</h4>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>The customer agrees to contact us first to resolve any issues before initiating a chargeback or payment dispute.</li>
    <li>Initiating a chargeback after agreeing to these terms may be considered a violation of this agreement.</li>
    <li>We reserve the right to submit this signed agreement as evidence in the event of a payment dispute.</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">7. Agreement Confirmation</h4>
  <p style="font-size:13px;color:#444;line-height:1.6;margin:0 0 8px;">By signing and proceeding to checkout, the customer confirmed they:</p>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>Have read and understood this agreement</li>
    <li>Accept the final sale policy</li>
    <li>Agree to report any faulty products within 7 days with photo or video evidence</li>
    <li>Accept the delivery confirmation policy</li>
    <li>Agree to contact us before initiating any payment dispute</li>
  </ul>

  <h4 style="margin:20px 0 8px;font-size:13px;">8. Shipping &amp; Delivery Times</h4>
  <ul style="font-size:13px;color:#444;line-height:1.8;padding-left:20px;margin:0;">
    <li>SFX RGBW Wireless Tube Kits typically arrive within <strong>1–2 weeks</strong> from the order date.</li>
    <li>WLED DMX RGBW Kits and Wireless WLED PCB Kits can take up to <strong>4–6 weeks</strong> depending on current stock.</li>
    <li>For an exact shipping estimate, contact hello@sfxled.com before ordering.</li>
  </ul>
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
