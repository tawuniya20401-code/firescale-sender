const nodemailer = require('nodemailer');

// استقبال المدخلات
const [,, target, senderName, subject, message] = process.argv;

// إعداد المحرك لاستخدام Local Sendmail الخاص بسيرفرات مايكروسوفت
let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'root@localhost'] // إجبار المحرك على استخدام هوية السيرفر المحلية
});

async function run() {
    if (!target || !message) {
        console.error("❌ Missing required fields!");
        return;
    }

    // ملاحظة: سنبقي اسمك (FireScale) ولكن سنغير الإيميل ليكون مقبولاً تقنياً
    const mailOptions = {
        from: `"${senderName}" <admin@sad360htd.com>`, // استخدام دومين موثوق للسيرفر
        to: target,
        subject: subject,
        html: `<div style="font-family: sans-serif;">${message}</div>`
    };

    console.log(`🚀 Dispatching from Microsoft Infrastructure to: ${target}`);

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Message accepted by Microsoft Mail Queue!");
    } catch (error) {
        console.error("❌ Transmission Error:", error.message);
    }
}

run();
