require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); 

app.use(express.json()); 

// Ruta POST 
app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body; // Extrae los datos del cuerpo de la solicitud

  if (!to || !subject || !html) {
    return res.status(400).json({ message: 'Missing required fields: to, subject, html' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Cambia a tu dirección de correo
      to: [to], // Usa el destinatario recibido en el cuerpo
      subject,
      html,
    });

    res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Abort: You need to define RESEND_API_KEY in the .env file.');
  }
  
  console.log('Listening on http://localhost:3000');
});
