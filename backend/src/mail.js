const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const makeAnEmail = text => `
  <div className="email" style="border: 1px solid #eee; padding: 20px; font-size: 18px;">
    <h2>Email Testing</h2>
    <p>${text}</p>
  </div>
`

exports.transport = transport;
exports.makeAnEmail = makeAnEmail;