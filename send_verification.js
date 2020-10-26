require("dotenv").config();
const twilioNumber = process.env.MY_PHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

module.exports.sendVerification = function (to, channel) {
  const client = require("twilio")(accountSid, authToken);
  client.verify
    .services(verifySid)
    .verifications.create({ to, channel })
    .then((verification) => console.log(verification.sid))
    .then(function (data) {
      console.log("Verification code sent to user");
    })
    .catch(function (err) {
      console.error("Could not send verification code to user");
      console.error(err);
    });
};
