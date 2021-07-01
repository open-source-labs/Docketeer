import twilio from 'twilio';
import { config } from 'dotenv';

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const postEvent = (mobileNumber, eventMessage) => {
  const client = twilio(accountSid, authToken);
  return client.api.messages
    .create({
      body: eventMessage,
      to: mobileNumber,
      from: twilioNumber,
    })
    .then(() => {
      console.log('User notified');
    })
    .catch(function (err) {
      console.error('Could not notify user');
      console.error(err);
    });
};

export default postEvent;
