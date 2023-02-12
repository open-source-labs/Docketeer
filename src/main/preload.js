const { contextBridge, ipcRenderer } = require("electron");
const child_process = require("child_process");
const { exec } = require("node:child_process");
const { cpuUsage, freemem, totalmem, freememPercentage } = require("os-utils");

const runCpuUsage = (callback) => {
  return cpuUsage(callback);
};

const runFreeMem = () => {
  return freemem();
};

const runTotalMem = () => {
  return totalmem();
};

const runFreeMemPercentage = () => {
  return freememPercentage();
};

const runExec = (command, callback) => {
  return child_process.exec(command, callback);
};

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld("nodeMethod", {
  runCpuUsage: cpuUsage,
  runFreeMem: freemem,
  runTotalMem: totalmem,
  runFreeMemPercentage: freememPercentage,
  runExec: exec,
  cpuUsage: cpuUsage,
  freemem: freemem,
  totalmem: totalmem,
  freememPercentage: freememPercentage,
  exec: exec,
  bool: true,
  rendInvoke: (input1, input2) => ipcRenderer.invoke(input1, input2),
});
