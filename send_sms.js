require('dotenv').config();
const twilioNumber = process.env.MY_PHONE_NUMBER

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

module.exports.sendSms = function(to, message) {
    const client = require('twilio')(accountSid, authToken);
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
    