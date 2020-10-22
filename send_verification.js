require('dotenv').config();
const twilioNumber = process.env.MY_PHONE_NUMBER
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID

// ADD INFORMATION TO THE README FILE             
// verification service was created here: https://www.twilio.com/console/verify/services
// code length and serviceSID can be taken from the link above

module.exports.sendVerification = function (to, channel) {
    const client = require('twilio')(accountSid, authToken);
    client.verify.services(verifySid)
        .verifications
        .create({to: '+79190877777', channel: 'sms'})
        .then(verification => console.log(verification.sid))
        .then(function(data) {
            console.log('Verification code sent to user');
        }).catch(function(err) {
            console.error('Could not send verification code to user');
            console.error(err);
        });
}

//  = function(to, channel) {
//     var client = require('twilio')(accountSid, authToken);
//     return client.api.verifications
//     .create({to: '+79190877777', channel: 'sms'})
//     .then(function(data) {
//        console.log('Verification code sent to user');
//     }).catch(function(err) {
//        console.error('Could not send verification code to user');
//        console.error(err);
//     });
// };