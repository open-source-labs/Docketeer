const express = require('express');
const { sendSms } = require('../../send_sms');
const { sendVerification } = require('../../send_verification');
const { verifyCode } = require('../../verify_code');

const notificationsController = {};

notificationsController.postMobile = (req, res, next) => {
  const notificationChannel = 'sms';
  const { mobileNumber } = req.body;
  console.log(mobileNumber);
  // const mobileNumber = '+79190877777'; // CHECK THAT IT WORKS.
  if (mobileNumber === undefined) {
    return next({
      log: 'notificationsRouter.postMobile: ERROR: mobile number is undefined',
      message: {
        err:
          'notificationsRouter.postMobile: ERROR: Check server logs for details',
      },
    });
  }
  sendVerification(mobileNumber, notificationChannel);
  next();
};

notificationsController.postEvent = (req, res, next) => {
  const { triggeringEvent } = req.body; // CHECK WITH MAT THAT IT WORKS
  const { mobileNumber } = req.body; // CHECK WITH MAT THAT IT WORKS
  console.log(triggeringEvent);
  console.log(mobileNumber);
  // USER MOBILE NUMBER CAN ALSO BE ALWAYS TAKEN FROM THE DATABASE
  // const mobileNumber = "+79190877777"; // TO BE KILLED AFTER CHECKING THE POST REQUEST
  // const triggeringEvent = "Triggering event XXX has happened";
  if (mobileNumber === undefined || triggeringEvent === undefined) {
    return next({
      log:
        'notificationsRouter.postEvent: ERROR: mobile number and/or triggeringEvent is undefined',
      message: {
        err:
          'notificationsRouter.postEvent: ERROR: Check server logs for details',
      },
    });
  }
  sendSms(mobileNumber, triggeringEvent);
  next();
};

notificationsController.postCode = (req, res, next) => {
  const { code } = req.body;
  const { mobileNumber } = req.body;
  console.log(code);
  console.log(mobileNumber)
  // const code = '906347';
  // const mobileNumber = '+79190877777';
  async function newFunc() {
    // console.log("starting newFunc")
    const result = await verifyCode(mobileNumber, code);
    // console.log(result)
    res.locals.respond = result;
    next();
  }
  newFunc();
};

module.exports = notificationsController;
