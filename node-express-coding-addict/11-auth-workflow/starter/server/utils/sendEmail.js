const nodemailerConfig = require('./nodemailerConfig')
const nodemailer = require('nodemailer')

const sendEmail = async ({to, subject, html}) => {
    let testAccount = await nodemailer.createTestAccount();
    
    //these values should be in .env
    const transporter = nodemailer.createTransport(nodemailerConfig);
    
    // send mail with defined transport object
    return info = await transporter.sendMail({
        from: '"Fred Foo 👻" <priscilla.zieme36@ethereal.email>', // sender address
        to:to,
        subject:subject,
        html:html
    });
}

module.exports = sendEmail;