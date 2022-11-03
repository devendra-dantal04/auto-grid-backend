const nodemailer = require("nodemailer");

const sendMail = async ({from, to, subject, text, html}) => {
    //Sendinblue, mailgun, sendgrid

    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure: true,
        auth: {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
    })


    let info = await transporter.sendMail({
        from : `AutoGrid <${from}>`,
        to,
        subject,
        text,
        html,
    })

}

module.exports = sendMail;