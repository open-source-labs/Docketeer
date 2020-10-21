const express = require('express');
const { sendSms } = require('../../send_sms');

const notificationsRouter = express.Router();

notificationsRouter.postMobile = (req, res, next) => {           
    // const { mobileNumber } = req.body                   // CHECK WITH RICHIE THAT IT WORKS
    // console.log(mobileNumber)
    const mobileNumber = '+79190877777'                     // TO BE KILLED AFTER CHECKING THE POST REQUEST
    const message = 'Your phone number is successfully added to the notification list'
    sendSms(mobileNumber, message)
    // ADD SAVING THE PHONE NUMBER TO THE DATABASE
    // ADD UPDATING THE VARIABLE NUMBER HERE (IF NECESSARY) 
    next()
}

notificationsRouter.postEvent = (req, res, next) => {           
    // const { triggeringEvent } = req.body                   // CHECK WITH MAT THAT IT WORKS
    // console.log(triggeringEvent)
    // const { mobileNumber } = req.body                   // CHECK WITH MAT THAT IT WORKS
    // console.log(mobileNumber)
    // USER MOBILE NUMBER CAN ALSO BE ALWAYS TAKEN FROM THE DATABASE
    const mobileNumber = '+79190877777'                     // TO BE KILLED AFTER CHECKING THE POST REQUEST
    const triggeringEvent = 'Triggering event XXX has happened'
    sendSms(mobileNumber, triggeringEvent)
    next()
}

module.exports = notificationsRouter;