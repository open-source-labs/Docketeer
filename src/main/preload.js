const { contextBridge } = require('electron');
const child_process = require('child_process');

let runExec = (command, callback) => {
  return child_process.exec(command, callback);
};

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld('childProcess', {
  runExec: runExec,
  bool: true
});
