import twilio from "twilio";
import { config } from "dotenv";

config();

const postEvent = (mobileNumber, eventMessage) => {
  // const mobileNumber = "+79190877777";
  const client = twilio(accountSid, authToken);
  return client.api.messages
    .create({
      body: eventMessage,
      to: mobileNumber,
      from: twilioNumber,
    })
    .then(() => {
      console.log("User notified");
    })
    .catch(function (err) {
      console.error("Could not notify user");
      console.error(err);
    });
};

export default postEvent;
