/**
 * @module API Controller
 * @description Contains middleware that sends emails to user for container issues and signup information
 */

import { Request, Response, NextFunction } from 'express';
import nodemailer from "nodemailer";
import email from "../../security/email";
import { ApiController, ServerError } from '../../types';

// create transporter object to make sure these values are filled out in email.js
const transporter = nodemailer.createTransport({
  host: email.host,
  port: email.port,
  secure: true,
  auth: {
    user: email.username,
    pass: email.password,
  },
});

const apiController: ApiController = {

  // sends notification email when container issue occurs
  sendEmailAlert: (req: Request, res: Response, next: NextFunction) => {
    const { email, containerName, time, date, stopped } = req.body;
    let emailBody;

    if (stopped === "true") {
      emailBody = `
        <h2>Alert: ${containerName} has stopped!</h2>
        <h3>Container <b>${containerName}</b> stopped running at <b>${time}</b> on <b>${date}</b>.</h3>
        <p>Please login to Docketeer for more details.</p>
        <br />
        <p>Warmest regards,</p>
        <p>Team Docketeer</p> `;
    } else {
      const { percent, type, threshold } = req.body;
      emailBody = `
        <h2>Alert: ${containerName} has breached the ${type} threshold!</h2>
        <h3>Container <b>${containerName}</b> used <b>${percent}%<b> ${type} at <b>${time}</b> on <b>${date}</b>.</h3>
        <p>This exceeds the ${type} threshold of ${threshold}%.</p>
        <p>Please login to Docketeer for more details.</p>
        <br />
        <p>Warmest regards,</p>
        <p>Team Docketeer</p> `;
    }

    const mailDetails = {
      from: "team.docketeer@gmail.com",
      to: email,
      subject: "Docketeer: Container Issue",
      html: `${emailBody}`,
    };

    transporter
      .sendMail(mailDetails)
      .then((info: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in apiController sendEmailAlert: ${err}`,
          message: {
            err: "An error occured creating new user in database. See apiController.sendEmailAlert.",
          },
        });
      });
  },

  // sends email with username/password when user signs up
  signupEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;

    const mailDetails = {
      from: "team.docketeer@gmail.com",
      to: email,
      subject: "Docketeer: Account Details",
      html: `
        <h1>Welcome to Docketeer</h1>
        <p>We are so excited to have you onboard!</p>
        <h3>Username: ${username}</h3>
        <h3>Password: ${password}</h3>
        <p>For any questions or concerns, please reach out to us at team.docketeer@gmail.com.</p>
        <br/>
        <p>Warmest regards,</p>
        <p>Team Docketeer</p>`,
    };

    transporter
      .sendMail(mailDetails)
      .then((info: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in apiController signupEmail: ${err}`,
          message: {
            err: "An error occured creating new user in database. See apiController.signupEmail.",
          },
        });
      });
  }
};

export default apiController;
