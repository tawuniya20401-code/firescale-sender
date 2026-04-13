const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');

// إعدادات مخصصة لتجاوز فلاتر السيرفرات الأوروبية
const options = {
    name: 'mail.firescale.ma', // استخدم اسم دومين يوحي بالثقة حتى لو وهمي
    debug: true,
    helperThread: true // استخدام خيوط مساعدة لزيادة سرعة الاتصال
};

const transporter = nodemailer.createTransport(directTransport(options));

async function sendToWP() {
    console.log("🛰️ Target: wp.pl | Infrastructure: Microsoft Azure");

    const mailOptions = {
        from: '"FireScale Support" <info@firescale.ma>', 
        to: "przemek.olejnik37@o2.pl", // ضع إيميل الـ wp.pl الخاص بك هنا
        subject: "Verification Protocol: Azure Node.js",
        text: "Direct connection test from Azure to WP.pl servers.", // إضافة نص عادي بجانب الـ HTML
        html: `
            <div style="padding: 20px; background-color: #f4f4f4; border-left: 5px solid #0052cc;">
                <h2>FireScale System Node</h2>
                <p>Testing direct SMTP handshake from <b>GitHub Actions</b>.</p>
                <p>Status: <b>Verified</b></p>
            </div>
        `
    };

    try {
        console.log("Connecting to wp.pl MX records...");
        let info = await transporter.sendMail(mailOptions);
        
        // هنا سنطبع الـ Envelope لنعرف المسار الذي سلكته الرسالة
        console.log("✅ Mail Sent Successfully!");
        console.log("Recipient: ", info.accepted);
        console.log("Server Response: ", info.response);
    } catch (error) {
        console.error("❌ Handshake Failed:", error.message);
    }
}

sendToWP();
