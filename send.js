const nodemailer = require('nodemailer');
const fs = require('fs');

// نستقبل فقط الإيميل والاسم والموضوع
const [,, target, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'admin@sad360htd.com', '-t', '-i']
});

async function run() {
    try {
        // قراءة محتوى الرسالة من الملف المخزن في GitHub
        const htmlContent = fs.readFileSync('message.html', 'utf8');

        await transporter.sendMail({
            from: `"${senderName}" <admin@sad360htd.com>`,
            to: target,
            subject: subject,
            html: htmlContent
        });
        console.log(`✅ Sent successfully to ${target}`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}
run();
