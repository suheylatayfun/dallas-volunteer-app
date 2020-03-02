const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey();

let message = {
    to: 'mykenzierogers@gmail.com',
    from: "test123@nothing.com",
    subject: "TEST",
    text: "TEST"
}

sendGrid.send(message).then(console.log).catch(console.log)