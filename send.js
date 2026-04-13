const nodemailer = require('nodemailer');

// استقبال البيانات من سطر الأوامر (Arguments)
const target = process.argv[2]; 
const campaign = process.argv[3] || "General";

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
});

async function run() {
    if (!target) {
        console.error("❌ No target email specified.");
        return;
    }

    console.log(`🚀 Dispatching to: ${target} for campaign: ${campaign}`);

    await transporter.sendMail({
        from: '"Oussama | FireScale" <admin@sad360htd.com>',
        to: target,
        subject: `Important Update: ${campaign}`,
        text: "Verified communication from FireScale Infrastructure.",
        html: `<p>Hello, this is an automated message for <b>${campaign}</b>.</p>`
    });

    console.log("✅ Sent Successfully!");
}

run();
