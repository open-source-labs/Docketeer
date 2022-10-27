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
const twilioNumber = process.env.TWILIO_NUMBER;

const postEvent = (mobileNumber, eventMessage) => {
  const client = twilio(accountSid, authToken);
  return client.api.messages
    .create({
      body: eventMessage,
      to: mobileNumber,
<<<<<<< HEAD
      from: twilioNumber
=======
      from: twilioNumber,
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
    })
    .then(() => {
      console.log('User notified');
    })
    .catch(function (err) {
      console.error('Could not notify user');
      console.error(err);
    });
};

<<<<<<< HEAD
// export default postEvent;
=======
export default postEvent;
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
