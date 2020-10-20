require('dotenv').config();
const twilioNumber = process.env.MY_PHONE_NUMBER

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

const notificationOpts = {
    toBinding: JSON.stringify({
      binding_type: 'sms',
      address: '+79190877777',                          // THINK HOW TO PASS IN THE TARGET PHONE NUMBER
    }),
    body: 'Knock-Knock! This is your first Notify SMS', // THINK HOW TO PASS IN THE NOTIFICATION MESSAGE
  };
  
client.notify
    .services(serviceSid)
    .notifications.create(notificationOpts)
    .then(notification => console.log(notification.sid))
    .catch(error => console.log(error));

// All historical messages can be checked here: https://www.twilio.com/console/sms/logs



// ADD TO THE README FILE
// 1. Download the helper library from https://www.twilio.com/docs/node/install
// 2. Follow the step plan to managing Twilio SMS notifications: https://www.twilio.com/docs/notify/quickstart/sms#messagingservice
// 3. Store your (i) Twilio number, (ii) Account Sid, (iii) Auth Token from twilio.com/console and (iv) SERVICE_SID     in .env file in the following format:
// MY_PHONE_NUMBER='+19252559538'
// TWILIO_ACCOUNT_SID='code from your console'
// TWILIO_AUTH_TOKEN='token from your console'
// SERVICE_SID='code from notify service instance'
// 4. In order to send a test message type in the terminal: 'node send_sms.js'