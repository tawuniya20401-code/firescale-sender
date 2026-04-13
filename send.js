const nodemailer = require('nodemailer');
const fs = require('fs');

// استقبال: قائمة الإيميلات (نص)، اسم المرسل، الموضوع
const [,, emailListRaw, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'admin@kuwait-invoice.web.app', '-t', '-i']
});

async function runBulk() {
    try {
        // تحويل النص إلى قائمة (Array)
        const emails = emailListRaw.split(',').map(e => e.trim());
        const htmlContent = fs.readFileSync('message.html', 'utf8');

        console.log(`🚀 Starting bulk send for ${emails.length} recipients in ONE workflow.`);

        for (const target of emails) {
            if (!target) continue;
            try {
                await transporter.sendMail({
                    from: `"${senderName}" <admin@kuwait-invoice.web.app>`,
                    to: target,
                    subject: subject,
                    html: htmlContent
                });
                console.log(`✅ Sent to: ${target}`);
            } catch (err) {
                console.error(`❌ Failed for ${target}:`, err.message);
            }
            // تأخير بسيط (3 ثوانٍ) بين كل إيميل داخل السيرفر لتجنب الـ Spam
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        console.log("🏁 All emails processed.");
    } catch (error) {
        console.error("❌ Critical Error:", error.message);
    }
}

runBulk();
