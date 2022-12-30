const sgMail = require('@sendgrid/mail');

const sendgridAPI = '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';

sgMail.setApiKey(sendgridAPI);

sgMail.send({
  to: 'bgarcia.95@outlook.com',
  from: 'bgarcia.95@outlook.com',
  subject: 'This is my first creation!',
  text: 'I hope this one actually get to you',
});

