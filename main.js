// import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
const electron = require("electron");
const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      allowRendererProcessReuse: false
      // webSecurity: false
    },
  });

  // mainWindow.loadURL(`http://localhost:3000/`);

  // mainWindow.webContents.openDevTools();
  
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // mainWindow.loadURL(`http://localhost:3500/`);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// // Quit when all windows are closed.
// app.on("window-all-closed", function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
