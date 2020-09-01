// import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
// const {
//   default: installExtension,
//   REDUX_DEVTOOLS,
// } = require("electron-devtools-installer");

const electron = require("electron");

const { app, BrowserWindow } = electron;

let mainWindow;

// app.whenReady().then(() => {
//   installExtension(REDUX_DEVTOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log("An error occurred: ", err));
// });

app.on("ready", () => {
  
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false
    },
  });

  
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

