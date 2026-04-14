const nodemailer = require('nodemailer');

const fs = require('fs');



const [,, emailListRaw, senderName, subject] = process.argv;



let transporter = nodemailer.createTransport({

    sendmail: true,

    newline: 'unix',

    path: '/usr/sbin/sendmail',

    args: ['-f', 'fambet@github.com', '-t', '-i']

});



async function runRapidBulk() {

    const emails = emailListRaw.split(',').map(e => e.trim());

    const htmlContent = fs.readFileSync('message.html', 'utf8');



    console.log(`🚀 Dispatching ${emails.length} emails to Sendmail Queue...`);



    // إرسال الكل في نفس اللحظة إلى طابور النظام

    const tasks = emails.map(target => 

        transporter.sendMail({

            from: `"${senderName}" <fambet@github.com>`,

            to: target,

            subject: subject,

            html: htmlContent

        }).then(() => console.log(`✅ Queued: ${target}`))

          .catch(err => console.error(`❌ Failed: ${target}`, err.message))

    );



    await Promise.all(tasks);

    console.log("🏁 All emails are now in the system queue!");

}



runRapidBulk();
