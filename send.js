const nodemailer = require('nodemailer');

// إعداد الإرسال عبر محرك السيرفر المحلي (Sendmail)
let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail', // مسار المحرك داخل نظام Linux
});

async function runGlobalSender() {
    console.log("🚀 Powering up FireScale Direct Sender on GitHub Infrastructure...");

    const mailOptions = {
        from: '"FireScale Global" <admin@github.com>', // هنا نستخدم "Valid From" من قلب السيرفر
        to: 'przemek.olejnik37@o2.pl', // ضع إيميلك هنا للتجربة
        subject: "Direct Azure-Node Dispatch ⚡",
        html: `
            <div style="background: #000; color: #0f0; padding: 20px; border: 1px solid #0f0; font-family: monospace;">
                <h2>[ SYSTEM: DIRECT DISPATCH ]</h2>
                <p>Origin: GitHub Azure Virtual Machine</p>
                <p>Protocol: Direct Sendmail (No External SMTP)</p>
                <hr style="border: 0.5px solid #0f0;">
                <p>Status: <b>BROADCASTING FROM CLOUD INFRASTRUCTURE</b></p>
            </div>
        `
    };

    try {
        console.log("Sending directly via system binaries...");
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Dispatch Successful: The message has left the Microsoft server.");
        console.log("Details:", info.envelope);
    } catch (error) {
        console.error("❌ System Error:", error.message);
    }
}

runGlobalSender();
