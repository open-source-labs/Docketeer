const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            // webSecurity: false
        }
    });


    mainWindow.loadURL(`file://${__dirname}/index.html`)
});