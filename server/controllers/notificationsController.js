const express = require("express");
const { sendSms } = require("../../send_sms");
const { sendVerification } = require("../../send_verification");
const db = require("../../src/components/helper/psqlQuery.js");
const databaseFunctions =  require ("../../src/constants/queryTypes.js");

const notificationsController = {};

notificationsController.postMobile = (req, res, next) => {
  const notificationChannel = "sms";
  // const { mobileNumber } = req.body;
  // console.log(mobileNumber);
  const mobileNumber = '+79190877777'
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
  const username = "Anton";                                                                 //  <---------SAVE THE DATA FROM GITHUB OAUTH AFTER IT IS DONE
  const writeData = () => {
    db.query(databaseFunctions.WRITE_USER, [username, mobileNumber])
    .then(data => console.log(data))
    .catch((err) => next(err))
  }
  writeData()
  next()
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
