const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('child_process', {
  child_process: true
});
