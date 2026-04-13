const nodemailer = require('nodemailer');

// استقبال المدخلات بالترتيب: الإيميل، الاسم، الموضوع، الرسالة
const [,, target, senderName, subject, message] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
});

async function run() {
    if (!target || !message) {
        console.error("❌ Missing required fields!");
        return;
    }

    console.log(`🚀 Dispatching from: ${senderName} to: ${target}`);

    await transporter.sendMail({
        from: `"${senderName}" <admin@sad360htd.com>`, // التحكم في اسم المرسل
        to: target,
        subject: subject, // التحكم في الموضوع
        html: `<div style="font-family: sans-serif;">${message}</div>` // التحكم في محتوى الرسالة
    });

    console.log("✅ Message delivered to queue!");
}

run();
