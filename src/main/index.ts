const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let win;
// let aboutWin;

// create "main" window
function createMainWindow() {
  win = new BrowserWindow({
    title: 'Docketeer',
    width: 1300,
    height: 800,
    webPreferences: {
      // contextIsolation: true,
      // nodeIntegration: true,
      preload: path.join(__dirname, '../src/main/preload.js'),
      sandbox: false,
    },
  });

  // dev vs prod config
  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:4000');
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// create "about" window
// function createAboutWindow() {
//   aboutWin = new BrowserWindow({
//     title: 'About Docketeer',
//     width: 300,
//     height: 300,
//   });
//
//   aboutWin.loadFile(path.join(__dirname, '../renderer/about.html'));
// }

// defining app menu bar items/layout
// const menu = [
//   ...(isMac
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
//     : []),
//   {
//     role: 'fileMenu',
//   },
//   ...(!isMac
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
//     : []),
//   ...(isDev
//     ? [
//         {
//           label: 'Developer',
//           submenu: [
//             { role: 'reload' },
//             { role: 'forcereload' },
//             { type: 'separator' },
//             { role: 'toggledevtools' },
//           ],
//         },
//       ]
//     : []),
// ];

// create window when app is ready
app.on('ready', () => {
  createMainWindow();

  // implement menu
  // const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu);

  // remove win from memory on close
  win.on('closed', () => (win = null));
});

// ensure that app is quit for mac users as the 'x' != quit
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

// open a window if none are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
