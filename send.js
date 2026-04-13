const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');

// إعداد الإرسال المباشر (بدون كلمة مرور وبدون سيرفر وسيط)
const options = {
    name: 'github.com', // يظهر للسيرفر المستلم أن الطلب قادم من GitHub
    debug: true // لتظهر لك تفاصيل المحاولة في الـ Logs
};

const transporter = nodemailer.createTransport(directTransport(options));

async function sendDirect() {
    console.log("🚀 Starting Direct Delivery Bypass from GitHub Azure Infrastructure...");

    // يمكنك هنا وضع إيميلك الشخصي للتجربة
    const targetEmail = "YOUR_EMAIL_HERE@example.com"; 

    const mailOptions = {
        from: '"FireScale Global Operations" <admin@github.com>', // انتحال هوية تقني
        to: targetEmail,
        subject: "Direct Azure-to-Inbox Bypass Test ⚡",
        html: `
            <div style="background-color: #0a0a0a; color: #00ffcc; padding: 30px; font-family: 'Courier New', monospace; border: 2px solid #00ffcc;">
                <h1 style="border-bottom: 1px solid #00ffcc; padding-bottom: 10px;">SYSTEM STATUS: ACTIVE</h1>
                <p style="font-size: 1.2em;">This message was generated and sent directly from <b>Microsoft Azure</b> servers via GitHub Actions.</p>
                <ul style="list-style: none; padding: 0;">
                    <li>> Bypass Firebase: SUCCESS</li>
                    <li>> SMTP Relay: SKIPPED (Direct Mode)</li>
                    <li>> Brand: FireScale</li>
                </ul>
                <p style="margin-top: 20px; color: #ff00ff;">-- Oussama Ibertillou --</p>
            </div>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Process Completed!");
        console.log("Full Response Context:", info.response);
    } catch (error) {
        console.error("❌ Direct Delivery Error:", error.message);
    }
}

sendDirect();
