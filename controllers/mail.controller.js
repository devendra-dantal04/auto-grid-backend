var nodemailer = require('nodemailer');
const  asyncHandler = require("../middleware/async")


// @desc    Login a user
// @route   POST api/v1/mail/
// @access  Public

exports.sendMail = asyncHandler(async (req,res) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
     });

    var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Sending Email using Node.js[nodemailer]',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(400).json({message : error.message})
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
            message : "Email Sent Successfuly"
        })
    }
    });  
});