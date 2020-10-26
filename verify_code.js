require("dotenv").config();
const twilioNumber = process.env.MY_PHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

// Link to verification action plan: https://www.twilio.com/docs/verify/api/verification-check


module.exports.verifyCode = function (to, code) {
  const client = require("twilio")(accountSid, authToken);
  return client.verify.services(verifySid)
  .verificationChecks
  .create({ to, code })
  .then(data => data.status)
  .catch(function (err) {
    console.error("Could not check the code with Twilio API");
    console.error(err);
  });
};


// Example of JSON API response:
// {
//     "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "service_sid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "to": "+15017122661",
//     "channel": "sms",
//     "status": "approved",
//     "valid": true,
//     "amount": null,
//     "payee": null,
//     "date_created": "2015-07-30T20:00:00Z",
//     "date_updated": "2015-07-30T20:00:00Z"
// }