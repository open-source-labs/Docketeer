const electron = require("electron");
const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 1300,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			allowRendererProcessReuse: false
		},
	});

	mainWindow.on("closed", function () {
		mainWindow = null;
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);
});
