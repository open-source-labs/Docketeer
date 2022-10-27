<<<<<<< HEAD
const twilio = require('twilio');
// import { config } from 'dotenv';
// config();
=======
import twilio from 'twilio';
import { config } from 'dotenv';

config();
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

const verifyMobileNumber = async (mobileNumber) => {
  const notificationChannel = 'sms';
  const client = twilio(accountSid, authToken);

  client.verify
    .services(verifySid)
    .verifications.create({ to: mobileNumber, channel: notificationChannel })
    .then((verification) => console.log(verification.sid))
    .then(() => console.log('Verification code sent to user'))
    .catch((err) => console.error(err));
};

<<<<<<< HEAD
// export default verifyMobileNumber;
=======
export default verifyMobileNumber;
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
