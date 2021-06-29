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
apiController.sendEmailAlert = (req, res, next) => {
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
        log: `Error in apiController sendEmailAlert: ${err}`,
        message: { err: 'An error occured creating new user in database. See apiController.sendEmailAlert.' },
      });
    });
};

// sends email with username/password when user signs up
apiController.signupEmail = (req, res, next) => {
  console.log('hit apiController');

  const { email, username, password } = req.body;

  const mailDetails = {
    from: 'team.docketeer@gmail.com',
    to: email,
    subject: 'Docketeer: Account Details',
    html: `<h1>Welcome to Docketeer</h1>
          <p>We are so excited to have you on board!</p>
          </br>
          </br>
          <h3>Username: ${username}</h3>
          </br>
          <h3>Password: ${password}</h3>
          </br>
          </br>
          <p>For any questions or concerns, please reach out to us at team.docketeer@gmail.com.</p>
          </br>
          </br>
          <p>Warmest regards,</p>
          </br>
          <p>Team Docketeer</p>`
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
        log: `Error in apiController signupEmail: ${err}`,
        message: { err: 'An error occured creating new user in database. See apiController.signupEmail.' },
      });
    });
};

module.exports = apiController;