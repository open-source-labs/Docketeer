const { contextBridge } = require('electron');
const child_process = require('child_process');

// Postgresql experiment
// const { Pool } = require('pg');

let runExec = (command, callback) => {
  return child_process.exec(command, callback);
};

// let newPool = (object) => {
//   return new Pool(object);
// };
// let queryPool = (text, params, callback) => {
//   return Pool.query(text, params, callback);
// };

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld('childProcess', {
  runExec: runExec,
  bool: true
  // pool: newPool,
  // poolQuery: queryPool
});

// contextBridge.exposeInMainWorld('postGres', {
//   pg: Pool(object)
// });
