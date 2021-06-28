import twilio from 'twilio';
import { config } from 'dotenv';

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

const verifyCode = (body) => {
  const { mobileNumber, code } = body;
  const client = twilio(accountSid, authToken);
  return client.verify
    .services(verifySid)
    .verificationChecks.create({ to: mobileNumber, code })
    .then((data) => data.status)
    .catch(function (err) {
      console.error('Could not check the code with Twilio API');
      console.error(err);
    });
};

export default verifyCode;
