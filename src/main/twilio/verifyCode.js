import twilio from 'twilio';
import { config } from 'dotenv';

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

const verifyCode = (body) => {
  console.log('VERIFYCODE CALLBACK');
  const { mobileNumber, code } = body;
  const client = twilio(accountSid, authToken);
  return client.verify
    .services(verifySid)
    .verificationChecks.create({ to: mobileNumber, code })
    .then((data) => {
      return status;
    })
    .catch(function (err) {
      console.error('Could not check the code with Twilio API');
      console.error(err);
    });
};

// Function to automate adding numbers as verified outgoing call IDs via Twilio API. Note: the use of this API endpoint is restricted to premium Twilio Accounts. So teams will need to manually add the numbers of their developers on the Twilio console.
const addVerifiedNumber = (phoneNumber, status) => {
  const client = twilio(accountSid, authToken);
  client.validationRequests
    .create({friendlyName: phoneNumber, phoneNumber })
    .then((response) => {
      console.log(response);
      return status;
    })
    .catch((err) => {
      console.log(err);
    });
};
export default verifyCode;
