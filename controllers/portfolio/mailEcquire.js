const sgMail = require("@sendgrid/mail");
const { ctrlWrapper } = require("../../utils");

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (req, res) => {
    const { contactName, contactEmail, message } = req.body;
    
    console.log(contactName, contactEmail, message);

  const email = {
    to: "alex.berd86@icloud.com",
    from: "alex.berd86@gmail.com",
    subject: "from portfolio",
    html: `<p>Hello World! ${message}</p> Best regards, ${contactName}, my email ${contactEmail}`,
  };

  try {
      const result = await sgMail.send(email);
    res.json({
      code: 200,
      message: "Email sent successfully",
      email: email,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      code: 500,
      message: "An error occurred while sending the email.",
    });
  }
};

module.exports = {
  sendMail: ctrlWrapper(sendMail),
};
