"use strict";

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

import twilio from "twilio";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      allowRendererProcessReuse: false,
    },
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});

// if (module.hot) {
//   module.hot.accept();
// }

// Twilio API

// Twilio environment variables
const accountSid = "AC698d096295ce013e8bcf2fed8ce6c077";
const authToken = "1dad5051b87866e51cd8fc7dd555c070";
const verifySid = "VA0022aa25fab981021f83d90c3420d8dc";

const sendVerificationCode = function (to, channel) {
  const client = twilio(accountSid, authToken);

  client.verify
    .services(verifySid)
    .verifications.create({ to, channel })
    .then((verification) => console.log(verification.sid))
    .then(() => console.log("Verification code sent to user"))
    .catch(function (err) {
      console.error("Could not send verification code to user");
      console.error(err);
    });
};

const handleVerification = async (mobileNumber) => {
  // if (typeof number !== "number") {
  //   throw new Error("Not a number");
  // }
  const notificationChannel = "sms";
  sendVerificationCode(mobileNumber, notificationChannel);

  return await `Sent verification to ${mobileNumber}`;
};

ipcMain.handle("verify-number", async (event, args) => {
  const result = await handleVerification(args);
  return result;
});

// const verifyCode = function (mobileNumber, verificationCode) {
//   const client = twilio(accountSid, authToken);
//   return client.verify
//     .services(verifySid)
//     .verificationChecks.create({ to, code })
//     .then((data) => data.status)
//     .catch(function (err) {
//       console.error("Could not check the code with Twilio API");
//       console.error(err);
//     });
// };

const handleVerificationCode = (body) => {
  const { mobileNumber, code } = body;
  console.log(body);
  const client = twilio(accountSid, authToken);

  return client.verify
    .services(verifySid)
    .verificationChecks.create({ to: mobileNumber, code })
    .then((data) => data.status)
    .catch(function (err) {
      console.error("Could not check the code with Twilio API");
      console.error(err);
    });
};

ipcMain.handle("verify-code", async (event, args) => {
  const result = await handleVerificationCode(args);
  return result;
});

// MY_PHONE_NUMBER='+19252559538'
// TWILIO_ACCOUNT_SID='AC698d096295ce013e8bcf2fed8ce6c077'
// TWILIO_AUTH_TOKEN='1dad5051b87866e51cd8fc7dd555c070'
// SERVICE_SID='IS4cb9a5c5500aba73e13d29c837cce2ad'
// VERIFICATION_SERVICE_SID='VA0022aa25fab981021f83d90c3420d8dc'
