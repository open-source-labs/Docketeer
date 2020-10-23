const express = require("express");
const { sendSms } = require("../../send_sms");
const { sendVerification } = require("../../send_verification");

const notificationsController = {};

notificationsController.postMobile = (req, res, next) => {
  const notificationChannel = "sms";
  const { mobileNumber } = req.body; // CHECK WITH RICHIE THAT IT WORKS
  // const mobileNumber = '+79190877777'                     // TO BE KILLED AFTER CHECKING THE POST REQUEST +19252559538
  console.log(mobileNumber);
  if (mobileNumber === undefined) {
    return next({
      log: "notificationsRouter.postMobile: ERROR: mobile number is undefined",
      message: {
        err:
          "notificationsRouter.postMobile: ERROR: Check server logs for details",
      },
    });
  }
  sendVerification(mobileNumber, notificationChannel);
  // CHECK VERIFICATION CODE FROM TWILIO API AND THE ONE USER TYPES IN
  // ADD SAVING THE PHONE NUMBER TO THE DATABASE
  // ADD UPDATING THE VARIABLE NUMBER HERE (IF NECESSARY)
  next();
};

notificationsController.postEvent = (req, res, next) => {
  // const { triggeringEvent } = req.body                   // CHECK WITH MAT THAT IT WORKS
  // const { mobileNumber } = req.body                   // CHECK WITH MAT THAT IT WORKS
  // USER MOBILE NUMBER CAN ALSO BE ALWAYS TAKEN FROM THE DATABASE
  const mobileNumber = "+79190877777"; // TO BE KILLED AFTER CHECKING THE POST REQUEST
  const triggeringEvent = "Triggering event XXX has happened";
  // CATCH ERROR LOGS
  if (mobileNumber === undefined || triggeringEvent === undefined) {
    return next({
      log:
        "notificationsRouter.postEvent: ERROR: mobile number and/or triggeringEvent is undefined",
      message: {
        err:
          "notificationsRouter.postEvent: ERROR: Check server logs for details",
      },
    });
  }
  sendSms(mobileNumber, triggeringEvent);
  next();
};

module.exports = notificationsController;
