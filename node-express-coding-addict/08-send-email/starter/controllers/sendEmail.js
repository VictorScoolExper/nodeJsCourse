const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res)=>{
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'victoria.padberg31@ethereal.email',
            pass: 'wSTXuEkVuUVRRuF1sJ'
        }
    });

    let info = await transporter.sendMail({
        from: '"Coding School" <victorScool@outlook.com>',
        to:'bar@example.com',
        subject: "Hello",
        html:'<h2>Sending Emails with nodejs</h2>',
        text:'This is text'
    });

    res.json({info})

    //res.send('send email function')
}

const sendEmail = async (req, res)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'victoria.padberg31@ethereal.email', // Change to your recipient
        from: 'victorscool477@outlook.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    const info = await sgMail.send(msg);
    res.json(info);
}

module.exports = sendEmail