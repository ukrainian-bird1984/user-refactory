const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'e6eea44e09bd3c',
    pass: '8364b6e6b19335',
  },
});

app.post('/send-email', async (req, res) => {
  const { imageUrl, senderName, senderEmail, recipientName, recipientEmail, message } = req.body;

  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: recipientEmail,
    subject: `Messaggio da ${senderName}`,
    html: `
      <p>Ciao ${recipientName},</p>
      <p>${message}</p>
      <img src="${imageUrl}" alt="Immagine selezionata" style="max-width: 100%; height: auto;">
      <p>Inviato da ${senderName} (${senderEmail})</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Errore nell\'invio email' });
  }
});

app.listen(3000, () => {
  console.log('Server in ascolto su http://localhost:3000');
});
