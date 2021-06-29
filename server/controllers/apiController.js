/**
 * ************************************
 *
 * @module API Controller
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Contains middleware that sends email to user
 *
 * ************************************
 */

const express = require('express');
const nodemailer = require('nodemailer');
const gmail = require('../../security/gmail');

const apiController = {};

// create transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmail.username,
    pass: gmail.password
  }
});

// sends notification email when container issue occurs
apiController.issueEmail = (req, res, next) => {
  console.log('hit apiController');
  console.log('gmail', gmail.username, gmail.password);
  
  const { email } = req.body;

  const mailDetails = {
    from: 'team.docketeer@gmail.com',
    to: email,
    subject: 'Docketeer: test mail',
    html: '<h1>container notification</h1>'
  };

  transporter.sendMail(mailDetails)
    .then((info) => {
      console.log('Email sent successfully.');
      console.log(info);
      return next();
    })
    .catch((err) => {
      console.log('hit error', err);
      return next({
        log: `Error in apiController sendEmail: ${err}`,
        message: { err: 'An error occured creating new user in database. See apiController.sendEmail.' },
      });
    });
};

// sends email with username/password when user signs up

module.exports = apiController;