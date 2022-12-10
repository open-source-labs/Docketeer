const { contextBridge, ipcRenderer } = require('electron');
const child_process = require('child_process');
const { exec } = require('node:child_process');

const runExec = (command, callback) => {
  return child_process.exec(command, callback);
};

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld('nodeMethod', {
  runExec: exec,
  exec: exec,
  bool: true,
  rendInvoke: (input1, input2) => ipcRenderer.invoke(input1, input2)
});
