const { contextBridge, ipcRenderer } = require('electron');
const child_process = require('child_process');

let runExec = (command, callback) => {
  return child_process.exec(command, callback);
};

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld('nodeMethod', {
  runExec: runExec,
  bool: true,
  rendInvoke: (input1, input2) => ipcRenderer.invoke(input1, input2)
});
