// MY_PHONE_NUMBER='+19252559538'
// TWILIO_ACCOUNT_SID='AC698d096295ce013e8bcf2fed8ce6c077'
// TWILIO_AUTH_TOKEN='1dad5051b87866e51cd8fc7dd555c070'
// SERVICE_SID='IS4cb9a5c5500aba73e13d29c837cce2ad'
// VERIFICATION_SERVICE_SID='VA0022aa25fab981021f83d90c3420d8dc'

import { ipcMain } from "electron";

const sayHello = () => {
  return ipcMain.handle("hello", async (event, ...args) => {
    // const result = await somePromise(...args)
    console.log("hello");
  });
};

const handleVerification = (channel) => {
  // switch (channel) {
  //   case "hello":
  //     sayHello();
  //     break;
  //   default:
  //     return;
  // }
  console.log("hello");
};

export default async (channel) => {
  const result = await handleVerification();
  return result;
};

// router.post("/mobile", notificationsController.postMobile, (req, res) => {
//   console.log("received POST mobile number request");
//   res.status(200).json("verification code has been sent");
// });

// notificationsController.postMobile = (req, res, next) => {
//   const notificationChannel = "sms";
//   const { mobileNumber } = req.body;
//   console.log(mobileNumber);
//   // const mobileNumber = '+79190877777'; // CHECK THAT IT WORKS.
//   if (mobileNumber === undefined) {
//     return next({
//       log: "notificationsRouter.postMobile: ERROR: mobile number is undefined",
//       message: {
//         err:
//           "notificationsRouter.postMobile: ERROR: Check server logs for details",
//       },
//     });
//   }
//   sendVerification(mobileNumber, notificationChannel);
//   next();
// };

// require("dotenv").config();
// const twilioNumber = process.env.MY_PHONE_NUMBER;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const verifySid = process.env.VERIFICATION_SERVICE_SID;

// module.exports.sendVerification = function (to, channel) {
//   const client = require("twilio")(accountSid, authToken);
//   client.verify
//     .services(verifySid)
//     .verifications.create({ to, channel })
//     .then((verification) => console.log(verification.sid))
//     .then(function (data) {
//       console.log("Verification code sent to user");
//     })
//     .catch(function (err) {
//       console.error("Could not send verification code to user");
//       console.error(err);
//     });
// };
