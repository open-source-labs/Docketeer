import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

import {
  verifyCode,
  verifyMobileNumber,
  postEvent,
} from '../module/utils/api/twilio';
import { emailEvent } from '../module/utils/api/email';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

const isDevelopment = process.env.NODE_ENV !== 'production';

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // comment out lines 30-38 if dev tools is slowing app
  app.whenReady().then(() => {
    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    const extensionsPlural = extensions.length > 0 ? 's' : '';
    Promise.all(extensions.map((extension) => installExtension(extension)))
      .then((names) =>
        console.log(
          `[electron-extensions] Added DevTools Extension${extensionsPlural}: ${names.join(
            ', '
          )}`
        )
      )
      .catch((err) => console.log('[electron-extensions]', err));
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  window.webContents.on('did-frame-finish-load', () => {
    if (isDevelopment) {
      window.webContents.openDevTools();
      window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
          window.focus();
        });
      });
    }
  });

  window.on('closed', () => {
    mainWindow = null;
  });

  return window;
}

app.whenReady().then(() => {
  // creates main browser window when electron is ready
  mainWindow = createMainWindow();

  app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
      mainWindow = createMainWindow();
    }
  });
});

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('verify-number', async (_, args) => {
  return await verifyMobileNumber(args);
});

ipcMain.handle('verify-code', async (_, args) => {
  return await verifyCode(args);
});

ipcMain.handle('post-event', async (_, args) => {
  const { mobileNumber, triggeringEvent } = args;
  return await postEvent(mobileNumber, triggeringEvent);
});

ipcMain.handle('email-event', async (_, args) => {
  return await emailEvent(args);
});
