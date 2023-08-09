const nodemailer = require("nodemailer");
const { ctrlWrapper } = require("../../utils");


const { MAIL } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "alex.berd@meta.ua",
    pass: MAIL,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (req, res) => {
  const { contactName, contactEmail, message } = req.body;

  console.log(contactName, contactEmail, message);

  const email = {
    to: "alex.berd86@gmail.com",
    from: "alex.berd@meta.ua",
    subject: "from portfolio",
    html: `<p>Hello World! ${message}</p> Best regards, ${contactName}, my email ${contactEmail}`,
  };

  try {
    const info = await transporter.sendMail(email);
    res.json({
      code: 200,
      message: "Email sent successfully",
      email: email,
    });
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {sendEmail: ctrlWrapper(sendEmail)};
