const nodemailer = require('nodemailer');
const fs = require('fs');

// الآن نحتاج فقط لاسم المرسل والموضوع من الـ CMD
const [,, senderName, subject] = process.argv;

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    args: ['-f', 'runner@github.com'] 
});

async function runAutoPilot() {
    try {
        // 1. قراءة قائمة الإيميلات
        const emails = JSON.parse(fs.readFileSync('list.json', 'utf8'));
        
        // 2. قراءة محتوى الرسالة HTML
        const htmlContent = fs.readFileSync('message.html', 'utf8');

        console.log(`🚀 Bulk sending started for ${emails.length} recipients...`);

        for (const target of emails) {
            await transporter.sendMail({
                from: `"${senderName}" <admin@sad360htd.com>`,
                to: target,
                subject: subject,
                html: htmlContent // الرسالة من الملف مباشرة
            });
            console.log(`✅ Dispatched to: ${target}`);
        }

        console.log("🏁 Campaign Finished Successfully.");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

runAutoPilot();
