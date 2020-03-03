const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'suheyladurna@gmail.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, console.error);






// const sendGrid = require("@sendgrid/mail");
// sendGrid.setApiKey();

// let message = {
//     to: 'suheyladurna@gmail.com',
//     from: "test123@nothing.com",
//     subject: "TEST",
//     text: "TEST"
// }

// sendGrid.send(message).then(console.log).catch(console.log)