export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    customerName,
    customerPhone,
    flowerType,
    quantity,
    color,
    occasion,
    deliveryDate,
    submissionTime
  } = req.body;

  if (!customerName || !customerPhone || !flowerType || !quantity) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'timfesc@gmail.com',
        subject: `Новый заказ цветов: ${quantity} ${flowerType}`,
        html: `
<h2>Новый заказ букета цветов</h2>
<p><strong>Информация о клиенте:</strong></p>
<ul>
  <li>Имя: ${customerName}</li>
  <li>Телефон: ${customerPhone}</li>
</ul>
<p><strong>Детали заказа:</strong></p>
<ul>
  <li>Цветы: ${flowerType}</li>
  <li>Количество: ${quantity} шт.</li>
  <li>Цвет: ${color}</li>
  <li>По случаю: ${occasion}</li>
  <li>Дата доставки: ${deliveryDate}</li>
</ul>
<p>Время заказа: ${submissionTime}</p>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: 'Failed to send email',
        error: data
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}
