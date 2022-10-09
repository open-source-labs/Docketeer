import twilio from 'twilio';
import { config } from 'dotenv';

config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  VERIFICATION_SERVICE_SID,
} = process.env;
const client = async () => await twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const postEvent = (mobileNumber, eventMessage) => {
  return client.api.messages
    .create({
      body: eventMessage,
      to: mobileNumber,
      from: TWILIO_NUMBER,
    })
    .then(() => {
      console.log('User notified');
    })
    .catch(function (err) {
      console.error('Could not notify user', err);
    });
};

export const verifyCode = (body) => {
  const { mobileNumber, code } = body;

  return client.verify
    .services(VERIFICATION_SERVICE_SID)
    .verificationChecks.create({ to: mobileNumber, code })
    .then((data) => {
      return data;
    })
    .catch(function (err) {
      console.error('Could not check the code with Twilio API', err);
    });
};

/**
 * @description Function to automate adding numbers as verified outgoing call IDs via Twilio API.
 *
 * Note: the use of this API endpoint is restricted to premium Twilio Accounts.
 * So teams will need to manually add the numbers of their developers on the Twilio console.
 */
export const addVerifiedNumber = (phoneNumber, status) => {
  client.validationRequests
    .create({ friendlyName: phoneNumber, phoneNumber })
    .then((response) => {
      console.log(response);
      return status;
    })
    .catch((err) => {
      console.log('Could not add verified number', err);
    });
};

export const verifyMobileNumber = async (mobileNumber) => {
  const notificationChannel = 'sms';

  client.verify
    .services(VERIFICATION_SERVICE_SID)
    .verifications.create({ to: mobileNumber, channel: notificationChannel })
    .then((verification) => console.log(verification.sid))
    .then(() => console.log('Verification code sent to user'))
    .catch((err) => console.error('Error with mobile verification', err));
};
