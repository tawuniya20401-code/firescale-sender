const nodemailer = require('nodemailer');
const fs = require('fs');

const [,, target, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'admin@sad360htd.com', '-t', '-i']
});

async function run() {
    try {
        const htmlContent = fs.readFileSync('message.html', 'utf8');
        await transporter.sendMail({
            from: `"${senderName}" <admin@sad360htd.com>`,
            to: target,
            subject: subject,
            html: htmlContent
        });
        console.log(`✅ Success: ${target}`);
    } catch (e) { console.error(e.message); }
}
run();
