require('dotenv').config();
const twilioNumber = process.env.MY_PHONE_NUMBER

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// CLEAN UP THIS PART
// const serviceSid = process.env.SERVICE_SID;

// const client = require('twilio')(accountSid, authToken);

// const notificationOpts = {
//     toBinding: JSON.stringify({
//       binding_type: 'sms',
//       address: '+13479811289',                          // PASS IN THE TARGET PHONE NUMBER
//     }),
//     body: 'Knock-Knock! This is your first Notify SMS', // PASS IN THE NOTIFICATION MESSAGE
//   };
  
// client.notify
//     .services(serviceSid)
//     .notifications.create(notificationOpts)
//     .then(notification => console.log(notification.sid))
//     .catch(error => console.log(error));

// // END OF CLEANING

module.exports.sendSms = function(to, message) {
    var client = require('twilio')(accountSid, authToken);
    return client.api.messages
    .create({
        body: message,
        to: to,
        from: twilioNumber,
    }).then(function(data) {
       console.log('User notified');
    }).catch(function(err) {
       console.error('Could not notify user');
       console.error(err);
    });
};
    