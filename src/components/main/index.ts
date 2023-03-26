// import { MenuItemConstructorOptions } from 'electron';

// const { app, BrowserWindow, shell, Menu } = require('electron');
// const path = require('path');

// const isMac = process.platform === 'darwin';
// const isDev = process.env.NODE_ENV !== 'production';

// let win;
// let aboutWin;
// let mainMenu;
// // TODO: maybe delete this page?
// // create "main" window
// function createMainWindow() {
//   win = new BrowserWindow({
//     title: 'Docketeer',
//     width: 1500,
//     height: 1000,
//     webPreferences: {
//       sandbox: false,
//     },
//   });

//   // makes <a href=''> links clickeable within the electron window
//   win.webContents.on('will-navigate', handleRedirect);
//   win.webContents.on('new-window', handleRedirect);

//   // dev vs prod config
//   if (isDev) {
//     win.webContents.openDevTools();
//     win.loadURL('http://localhost:4000');
//   } else {
//     win.loadFile(path.join(__dirname, './DocketeerElectron.js'));
//   }
// }

// // define redirects to open link in default web browser
// const handleRedirect = (e, url) => {
//   if (url != win.webContents.getURL()) {
//     e.preventDefault();
//     require('electron').shell.openExternal(url);
//   }
// };

// // create "about" window
// function createAboutWindow() {
//   aboutWin = new BrowserWindow({
//     title: 'About Docketeer',
//     width: 300,
//     height: 300,
//   });

//   // dev vs prod config
//   if (isDev) {
//     aboutWin.loadFile(path.join(__dirname, '../src/renderer/about.html'));
//   } else {
//     aboutWin.loadFile(path.join(__dirname, './DocketeerElectron.js'));
//   }
// }

// // defining app menu bar items/layout
// const menu = Menu.buildFromTemplate([
//   ...((isMac
//     ? [
//         {
//           label: app.name,
//           submenu: [
//             {
//               label: 'About',
//               click: createAboutWindow,
//             },
//           ],
//         },
//       ]
//     : []) as MenuItemConstructorOptions[]),
//   {
//     role: 'fileMenu',
//   },
//   ...((!isMac
//     ? [
//         {
//           label: 'Help',
//           submenu: [
//             {
//               label: 'About',
//               click: createAboutWindow,
//             },
//           ],
//         },
//       ]
//     : []) as MenuItemConstructorOptions[]),
//   ...((isDev
//     ? [
//         {
//           label: 'Developer',
//           submenu: [
//             { role: 'reload' },
//             { role: 'forceReload' },
//             { type: 'separator' },
//             { role: 'toggleDevTools' },
//           ],
//         },
//       ]
//     : []) as MenuItemConstructorOptions[]),
// ]);

// // create window when app is ready
// app.on('ready', () => {
//   createMainWindow();

//   // implement menu
//   Menu.setApplicationMenu(menu);

//   // remove win from memory on close
//   win.on('closed', () => (win = null));
// });

// // ensure that app is quit for mac users as the 'x' != quit
// app.on('window-all-closed', () => {
//   if (!isMac) {
//     app.quit();
//   }
// });

// // open a window if none are open
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createMainWindow();
//   }
// });
