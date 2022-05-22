const nodemailer = require('nodemailer')
const config = require('../config')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        // informazioni che riguardano l'invio della mail
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD
        }
    })

    // informazioni del ricevente della mail
    const mailOptions = {
        from: config.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }
    
    await transporter.sendMail(mailOptions)
}


module.exports = sendEmail
