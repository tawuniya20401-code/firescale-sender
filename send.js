
const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendBulk() {
  // قراءة القائمة البريدية
  const rawData = fs.readFileSync('list.json');
  const contacts = JSON.parse(rawData);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(`Starting to send ${contacts.length} emails...`);

  for (let contact of contacts) {
    try {
      let info = await transporter.sendMail({
        from: `"FireScale 🔥" <${process.env.EMAIL_USER}>`,
        to: contact.email,
        subject: `أهلاً ${contact.name}، لدينا عرض خاص لك!`,
        html: `<h1>مرحباً ${contact.name}</h1><p>هذا عرض حصري من FireScale المصمم خصيصاً لك.</p>`
      });
      console.log(`✅ Sent to: ${contact.email}`);
      
      // تأخير 2 ثانية بين كل إرسال لضمان الـ Inboxing
      await new Promise(resolve => setTimeout(resolve, 2000)); 
    } catch (err) {
      console.log(`❌ Failed for: ${contact.email} - Error: ${err.message}`);
    }
  }
  console.log("All emails processed!");
}

sendBulk().catch(console.error);
