const nodemailer = require('nodemailer');
const fs = require('fs');

const [,, emailListRaw, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'no-reply@skyagent.com.br', '-t', '-i']
});

async function runRapidBulk() {
    try {
        const emails = emailListRaw.split(',').map(e => e.trim());
        const htmlContent = fs.readFileSync('message.html', 'utf8');

        console.log(`🚀 Dispatching ${emails.length} emails with Unique IDs...`);

        const tasks = emails.map(target => {
            // توليد كود عشوائي فريد لكل مستلم داخل الحلقة
            const randomId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            
            // تخصيص محتوى الـ HTML لكل رسالة بشكل منفرد
            const uniqueHtml = htmlContent.replace('</body>', 
                `<div style="display:none !important; opacity:0; color:transparent;">Verification Ref: ${randomId}</div></body>`
            );

            return transporter.sendMail({
                from: `"${senderName}" <no-reply@skyagent.com.br>`,
                to: target,
                subject: subject,
                html: uniqueHtml
            }).then(() => console.log(`✅ Queued [ID: ${randomId}]: ${target}`))
              .catch(err => console.error(`❌ Failed: ${target}`, err.message));
        });

        await Promise.all(tasks);
        console.log("🏁 All unique emails are now in the system queue!");
    } catch (err) {
        console.error("❌ Critical Error:", err.message);
    }
}

runRapidBulk();
