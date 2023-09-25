// Types
import { Request, Response, NextFunction } from 'express';
import { ContainerList } from 'backend-types';
import util from 'util';
import { exec } from 'child_process';
import { CommandController } from 'backend-types';
const execAsync = util.promisify(exec);

const commandController: CommandController = {} as CommandController;

/**
 * @method
 * @abstract Gets the list of containers running on your local machine
 * @returns @param {ContainerList[]} res.locals.containers An array of the containers
 */
commandController.getContainers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker ps --format "{{json .}},"');
    if (stderr.length) console.log(stderr);

    // Get list of containers in proper format
    const containers: ContainerList[] = JSON.parse(
      `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
    ).forEach((element: any, index: number, array: any): void => {
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