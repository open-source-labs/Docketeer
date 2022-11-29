// unable to currently use this ts file, possible conflict with electron
import { contextBridge, ipcRenderer } from "electron";
import child_process, { ExecException } from "child_process";

interface callback {
  (
    err: ExecException,
    //stdout: standard output
    stdout: string | Buffer,
    //stderr: standard error
    stderr: string | Buffer
  ): object;
}

function runExec(command: string, callback: callback): object {
  return child_process.exec(command, callback as any);
}

// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld("nodeMethod", {
  runExec: runExec,
  bool: true,
  rendInvoke: (input1: string, input2: (...args: any[]) => Promise<any>) =>
    ipcRenderer.invoke(input1, input2),
});
