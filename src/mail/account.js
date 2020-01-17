const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//   to: 'joshuawsample@gmail.com',
//   from: 'joshuawsample@gmail.com',
//   subject: 'This is my first creation!',
//   text: 'I hope this actually gets to where it belongs'
// })

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'joshuawsample@gmail.com',
    subject: 'Thanks for joining Task App',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'joshuawsample@gmail.com',
    subject: 'Sorry to see you go',
    text: `Sorry that you are leaving Task Master, ${name}. Let me know how we may improve and be of better service in the future.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}