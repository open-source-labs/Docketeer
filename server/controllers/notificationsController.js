const express = require("express");
const { sendSms } = require("../../send_sms");
const { sendVerification } = require("../../send_verification");
const { verifyCode } = require ("../../verify_code");
// const db = require("../../src/components/helper/psqlQuery.js");
// const databaseFunctions =  require ("../../src/constants/queryTypes.js");

const notificationsController = {};
// let phoneNumber                                           // CHECK THAT IT WORKS. IS USED IN ORDER NOT TO USE THE DATABASE FOR THE STEPS AFTER THE USER PROVIDED HIS/HER MOBILE NUMBER ON THE SETTING PAGE


notificationsController.postMobile = (req, res, next) => {
  const notificationChannel = "sms";
  const { mobileNumber } = req.body;
  console.log(mobileNumber);
  // phoneNumber = '+79190877777'                             // CHECK THAT IT WORKS. 
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
  
  // <--------- KILL AFTER SAVING INFORMATION AT THE FRONT-END LEVEL
  // ADD SAVING THE PHONE NUMBER TO THE DATABASE
  // const username = "TEST";                                                                 
  // const writeData = () => {
  //   db.query(databaseFunctions.WRITE_USER, [username, mobileNumber])
  //   .then(data => console.log(data))
  //   .catch((err) => next(err))
  // }
  // writeData()
  next()
};

notificationsController.postEvent = (req, res, next) => {
  // const { triggeringEvent } = req.body                   // CHECK WITH MAT THAT IT WORKS
  // const { mobileNumber } = req.body                   // CHECK WITH MAT THAT IT WORKS
  // USER MOBILE NUMBER CAN ALSO BE ALWAYS TAKEN FROM THE DATABASE
  const mobileNumber = "+79190877777"; // TO BE KILLED AFTER CHECKING THE POST REQUEST
  const triggeringEvent = "Triggering event XXX has happened";
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

notificationsController.postCode = (req, res, next) => {
  // const { code } = req.body
  const code = '411708'
  const phone = '+79190877777'
  async function newFunc() {
  console.log("starting newFunc")
  const result = await verifyCode(phone, code)
  // console.log(result)
  res.locals.respond = result
  next();
  }
  newFunc();
};

module.exports = notificationsController;
