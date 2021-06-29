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
  
  const { email, containerName, time, date, stopped } = req.body;
  let emailBody;

  if (stopped) {
    emailBody = ` <h2>Alert: Container ${containerName} has stopped!</h2>
                  <p>Container ${containerName} stopped running at ${time} on ${date}.</p>
                  <p>Please login to Docketeer for more details.</p>
                  <br />
                  <p>Warmest regards,</p>
                  <p>Team Docketeer</p> `;
  } else {
    const { percent, type, threshold } = req.body;
    emailBody = ` <h2>Alert: Container ${containerName} has breached ${type} threshold!</h2>
                  <p>Container ${containerName} used ${percent}% ${type} at ${time} on ${date}.</p>
                  <p>This exceeds the ${type} threshold of ${threshold}%.</p>
                  <p>Please login to Docketeer for more details.</p>
                  <br />
                  <p>Warmest regards,</p>
                  <p>Team Docketeer</p> `;
  }

  const mailDetails = {
    from: 'team.docketeer@gmail.com',
    to: email,
    subject: 'Docketeer: Container Issue',
    html: `${emailBody}`
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
          <p>We are so excited to have you onboard!</p>
          <h3>Username: ${username}</h3>
          <h3>Password: ${password}</h3>
          <p>For any questions or concerns, please reach out to us at team.docketeer@gmail.com.</p>
          <br/>
          <p>Warmest regards,</p>
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