const nodemailer = require('nodemailer');

// استقبال المدخلات الأربعة بالترتيب
const [,, target, senderName, subject, messageBody] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'admin@sad360htd.com', '-t', '-i'] // الإعدادات الأكثر استقراراً
});

async function run() {
    if (!target || !messageBody) {
        console.error("❌ Error: Recipient or Message is missing.");
        return;
    }

    console.log(`🚀 Sending custom email to: ${target}`);

    try {
        await transporter.sendMail({
            from: `"${senderName}" <admin@sad360htd.com>`,
            to: target,
            subject: subject,
            html: messageBody
        });
        console.log("✅ Successfully dispatched to Microsoft Mail Queue!");
    } catch (error) {
        console.error("❌ Critical Error:", error.message);
    }
}

run();
