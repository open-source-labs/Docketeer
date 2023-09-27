// Types
import { Request, Response, NextFunction } from 'express';
import { ContainerList, LogObject } from 'backend-types';
import { CommandController } from 'backend-types';
import { execAsync, toUTC, parseLogString } from '../helper';


interface ContainerController {
  /**
 * @method
 * @abstract Gets the list of containers running on your local machine
 * @returns @param {ContainerList[]} res.locals.containers An array of the containers
 */
  getContainers: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
 * @method
 * @abstract Gets the log for a list of containers between the start and stop time
 *           Converts this time to the users local time based on the offset provided
 * @param {string[]} req.body.containerNames An array of names of containers to check
 * @param {string} req.body.start Must check if empty. Start time in format YYYY-MM-DDTHH:MM:SSZ
 * @param {string} req.body.stop Must check if empty. Stop time in format YYYY-MM-DDTHH:MM:SSZ
 * @param {number} req.body.offset Integer for the offset of local time to UTC. Ex. EST4 = 240
 * @returns {object<string, LogObject[]>}
 */
  getAllLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  
  inspectContainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const containerController: ContainerController = {} as ContainerController;

containerController.getContainers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker ps --format "{{json .}},"');
    if (stderr.length) console.log(stderr);

    // Get list of containers in proper format
    const containers: ContainerList[] = JSON.parse(
      `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
    ).forEach((element: any, index: number, array: any[]): void => {
      element['Networks'] = element['Networks'].split(',');
      element['Labels'] = element['Labels'].split(',');
      element['Ports'] = element['Ports'].split(',');
      array[index] = element;
    });
    res.locals.containers = containers;
    return next();
  } catch (err) {
    const errObj = {
      log: { 'commandController.getContainers Error: ': err },
      status: 500,
      message: { err: 'commandController.getContainers error' }
    };
    return next(errObj);
  }
}


containerController.getAllLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const containerLogs: { [k: string]: LogObject[] } = {
      stdout: [],
      stderr: [],
    };
    const { containerNames, start, stop, offset } = req.body;
    // string string string number
    const optionsObj = { containerNames, start, stop, offset };

    // iterate through containerIds array in optionsObj
    for (let i = 0; i < optionsObj.containerNames.length; i++) {
      // build inputCommandString to get logs from command line
      let inputCommandString = `docker logs ${optionsObj.containerNames[i]} -t`;
      if (optionsObj.start) inputCommandString += ` --since ${toUTC(optionsObj.start, offset)}`;
      if (optionsObj.stop) inputCommandString += ` --until ${toUTC(optionsObj.stop, offset)}`;
      const { stdout, stderr } = await execAsync(inputCommandString);
      containerLogs.stdout = [...containerLogs.stdout, ...parseLogString(stdout, optionsObj.containerNames[i], offset)];
      containerLogs.stderr = [...containerLogs.stderr, ...parseLogString(stderr, optionsObj.containerNames[i], offset)];
    }
    res.locals.logs = containerLogs;
    return next();
  } catch (err) {
    const errObj = {
      log: { 'getLogs Error: ': err },
      status: 500,
      message: { error: 'getLogs Error retrieving logs' }
    }
    return next(errObj);
  }
}

export default containerController;