
const nodemailer = require('nodemailer');

async function main() {
  // إعداد المحرك باستخدام البيانات السرية التي وضعتها في Secrets
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // إرسال إيميل تجريبي لنفسك للتأكد من نجاح "الثغرة"
  let info = await transporter.sendMail({
    from: `"FireScale Global" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, 
    subject: "Success: Azure Microsoft Server Bypass 🚀",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #00ffcc;">
        <h2 style="color: #00ffcc;">تم الاختراق بنجاح يا أسامة!</h2>
        <p>هذه الرسالة خرجت من سيرفرات مايكروسوفت أزور وتجاوزت قيود فايربايز.</p>
        <p>جاهزون الآن لإرسال القائمة البريدية الضخمة.</p>
      </div>
    `,
  });

  console.log("Email sent: %s", info.messageId);
}

main().catch(console.error);
