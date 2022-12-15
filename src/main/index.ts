const electron = require ('electron');

const path = require ('path');
const url = require('url');

/*          Docketeer 7.0
** Next team can work on integrating Dev Tools
*/

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const verifyCode = require('./twilio/verifyCode');
const verifyMobileNumber = require ('./twilio/verifyMobile');
const postEvent = require ('./twilio/postEvent');
const emailEvent = require ('./email/emailEvent');

// global reference to mainWindow (necessary to prevent mainWindow from being garbage collected)
let mainWindow;

function createMainWindow() {
   mainWindow = new electron.BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../src/main/preload.js'),
      sandbox: false
    },
  });
  
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
    // mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '/index'),
        protocol: 'file:',
        slashes: true,
      })
      );
    }
    mainWindow.on('closed', () => {
      mainWindow = null;
    })
  }

    electron.app.on('ready', createMainWindow)
    
    electron.app.on('renderer-process-crashed', createMainWindow)
    // MacOS Specific function
    electron.app.on('window-all-closed', function () {
      // Common for application and their menu bar to stay active until use quits explicitly 
      if (process.platform !== 'darwin') {
        electron.app.quit()
      }
    })
    // MacOS Specific function
    electron.app.on('activate', function() {
      // Common to re-create a window in the app when the dock icon is clicked and there are no other windows open
      if (electron.BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
    

  /*               Docketeer 7.0    
  ** This was old code from previous teams, we did not attempt to refactor and are unsure of if it even works.
  */

// //? comment out lines 30-38 if dev tools is slowing app
//   app.whenReady().then(() => {
//     const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
//     const extensionsPlural = extensions.length > 0 ? 's' : '';
//     Promise.all(extensions.map(extension => installExtension(extension)))
//       .then(names =>
//         console.log(`[electron-extensions] Added DevTools Extension${extensionsPlural}: ${names.join(', ')}`))
//       .catch(err =>
//         console.log('[electron-extensions] An error occurred: ', err));
//   });
  
  // mainWindow.webContents.on('did-frame-finish-load', () => {
  //   if (isDevelopment) {
  //     mainWindow.webContents.openDevTools();
  //     mainWindow.webContents.on('devtools-opened', () => {
  //       mainWindow.focus();
  //       setImmediate(() => {
  //         mainWindow.focus();
  //       });
  //   });
  // }});

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });

//   return mainWindow;
// }

// app.whenReady().then(() => {
//   // creates main browser mainWindow when electron is ready
//   mainWindow = createMainWindow();

//   app.on('activate', () => {
//     // on macOS it is common to re-create a mainWindow even after all windows have been closed
//     if (mainWindow === null) {
//       mainWindow = createMainWindow();
//     }
//   });
// });

// quit application when all windows are closed
// app.on('mainWindow-all-closed', () => {
//   // on macOS it is common for applications to stay open until the user explicitly quits
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }

// Boilerplate for electron devtools
// electron.app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//       .then((name:string) => console.log(`Added Extension:  ${name}`))
//       .catch((err:string) => console.log('An error occurred: ', err));
// });


electron.ipcMain.handle('verify-number', async (_: any, args: any) => {
  return await verifyMobileNumber(args);
});

electron.ipcMain.handle('verify-code', async (_: any, args: any) => {
  return await verifyCode(args);
});

electron.ipcMain.handle('post-event', async (_: any, args: any) => {
  const { mobileNumber, triggeringEvent } = args;
  return await postEvent(mobileNumber, triggeringEvent);
});

electron.ipcMain.handle('email-event', async (_: any, args: any) => {
  return await emailEvent(args);
});
