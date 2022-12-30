const sgMail = require('@sendgrid/mail');

const sendgridAPI = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPI);

sgMail.send({
  to: 'bgarcia.95@outlook.com',
  from: 'bgarcia.95@outlook.com',
  subject: 'This is my first creation!',
  text: 'I hope this one actually get to you',
});

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: email,
    subject: `Thanks for joining in!`,
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
};

module.exports = {
  sendWelcomeEmail,
}