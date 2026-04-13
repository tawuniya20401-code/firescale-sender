const nodemailer = require('nodemailer');
const fs = require('fs');

const [,, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    // تغيير التنسيق هنا لتجنب خطأ 64
    args: ['-f', 'admin@sad360htd.com', '-t', '-i'] 
});

async function runAutoPilot() {
    try {
        const emails = JSON.parse(fs.readFileSync('list.json', 'utf8'));
        const htmlContent = fs.readFileSync('message.html', 'utf8');

        console.log(`🚀 Bulk sending started for ${emails.length} recipients...`);

        for (const target of emails) {
            await transporter.sendMail({
                // تأكد من أن الإيميل التقني بسيط، واسمك يظهر في خانة الاسم فقط
                from: `"${senderName}" <admin@sad360htd.com>`,
                to: target,
                subject: subject,
                html: htmlContent
            });
            console.log(`✅ Dispatched to: ${target}`);
        }

        console.log("🏁 Campaign Finished.");
    } catch (error) {
        console.error("❌ Error Details:", error.message);
    }
}

runAutoPilot();
