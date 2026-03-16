# 🌸 Flower Shop Website - Setup Guide

Perfect! Now let's deploy your **flower selling website**!

---

## ✅ SETUP (2 steps):

### Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `flower-shop` (or any name you like)
3. Click **"Create repository"**

---

### Step 2: Add Files to GitHub

#### FILE 1: `index.html`
1. Click **"Add file"** → **"Create new file"**
2. Name: `index.html`
3. Copy code from: `flowers-shop-index.html` (file I created)
4. Paste everything
5. **"Commit changes"**

#### FILE 2: `api/send-email.js`
1. Click **"Add file"** → **"Create new file"**
2. Name: `api/send-email.js`
3. Paste this code:

```javascript
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
```

4. **"Commit changes"**

---

## 🚀 Deploy to Vercel

### Step 1: Connect to Vercel
1. Go to https://vercel.com/
2. Click **"New Project"**
3. Select your **flower-shop** GitHub repo
4. Click **"Import"**

### Step 2: Add Environment Variable
1. In Vercel, click **"Settings"**
2. Click **"Environment Variables"**
3. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (re_abc123...)
4. Click **"Save"**
5. Click **"Redeploy"** to apply changes

---

## ✅ DONE!

Your flower shop website is now LIVE! 🌸

You'll get a URL like: `https://flower-shop.vercel.app`

---

## 📋 FORM FIELDS:

When customers order, they fill:
- **Цветы** (Flowers): Roses, Tulips, Lilies, etc.
- **Количество** (Quantity): 1, 3, 5, 7, 11, 21, 51, 101 pieces
- **Цвет** (Color): Red, Pink, White, Yellow, etc.
- **По случаю** (Occasion): Birthday, Wedding, Apology, etc.
- **Дата доставки** (Delivery date): Tomorrow to 30 days ahead
- **Имя** (Name): Customer name
- **Телефон** (Phone): Customer phone

---

## 📧 EMAILS GO TO:

When someone orders flowers, email is sent to: **timfesc@gmail.com**

The email includes all order details!

---

## ✨ CUSTOMIZE:

Want to:
- Change email address? → Edit both HTML and API
- Change colors? → Edit HTML (pink colors are used)
- Add/remove flowers? → Edit `flowerTypes` array in HTML
- Change occasions? → Edit `occasions` array in HTML

---

**Enjoy your flower shop! 🌹🌸💐**
