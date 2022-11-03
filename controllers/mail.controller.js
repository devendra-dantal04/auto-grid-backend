var nodemailer = require('nodemailer');
const emailService = require("../middleware/emailService");
const  asyncHandler = require("../middleware/async")


// @desc    Login a user
// @route   POST api/v1/mail/
// @access  Public

exports.sendMail = asyncHandler(async (req,res) => {

    const {emailFrom, emailTo} = req.body;

    emailService({
        from : emailFrom,
        to : emailTo,
        subject : "AutoGrid Email Automation",
        text : `${emailFrom} send email to you.`,
        html : require('../middleware/emailTemplate')({
            emailFrom: emailFrom
        })

    });

    res.status(200).json({success:true, msg : "Successfuly email send"})
    


    //For GMAIL:

    // let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: process.env.SMTP_PORT,
    //     secure: true,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD
    //     }
    //  });

    // var mailOptions = {
    // from: process.env.SENDER_EMAIL,
    // to: process.env.RECEIVER_EMAIL,
    // subject: 'Sending Email using Node.js[nodemailer]',
    // text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    //     res.status(400).json({message : error.message})
    //     console.log(error);
    // } else {
    //     console.log('Email sent: ' + info.response);
    //     res.status(200).json({
    //         message : "Email Sent Successfuly"
    //     })
    // }
    // });  
});