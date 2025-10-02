import nodemailer  from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth:  {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      text,
      html
    })
    console.log("Email sent successfully: ", info)
    console.log("URL: ", nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.log("Email not sent: ", error)
  }
}

export { sendEmail }