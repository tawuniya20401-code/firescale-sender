const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
});

async function runGlobalSender() {
    console.log("🚀 Powering up FireScale Professional Dispatch...");

    const mailOptions = {
        from: '"Oussama | FireScale" <admin@sad360htd.com>',
        to: 'przemek.olejnik37@o2.pl',
        subject: "بخصوص تطوير العمليات الرقمية", // موضوع عربي لكسر نمط السبام الإنجليزي
        // النص العادي (Text Version) مهم جداً لتجاوز السبام
        text: "مرحباً، أردت التواصل معك بخصوص تحديثات الأنظمة الجديدة في FireScale. تحياتي، أسامة.", 
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
                <p>مرحباً،</p>
                <p>أردت إخبارك أن نظام التواصل الجديد الخاص بـ <strong>FireScale</strong> قد تم تفعيله بنجاح وهو يعمل الآن بكفاءة عالية.</p>
                <p>هذا البريد مخصص لاختبار سرعة الاستجابة والموثوقية من خلال بنيتنا التحتية الجديدة.</p>
                <br>
                <p>تحياتي،<br>
                <strong>أسامة</strong><br>
                FireScale Global Team</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <small style="color: #999;">هذا بريد إداري تقني لعملاء sad360htd.com</small>
            </div>
        `
    };

    try {
        console.log("Sending clean professional email...");
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Dispatch Successful!");
        console.log("Details:", info.envelope);
    } catch (error) {
        console.error("❌ System Error:", error.message);
    }
}

runGlobalSender();
