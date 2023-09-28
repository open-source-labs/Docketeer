import { Request, Response, NextFunction } from 'express';
import { ContainerPS, NetworkType } from 'types';
import { execAsync } from '../helper';
import { ServerError } from 'backend/backend-types';

interface NetworkController {
  /**
   * @method
   * @abstract Gets a list of networks running on docker. Filters out host and none names
   * @returns @param {NetworkType[]} res.locals.networks
   * @returns {void}
   */
  getNetworks: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Creates a new network given a network name
   * @param {string} req.body.networkName
   * @returns {void}
   */
  createNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Removes a network
   * @param {string} req.body.networkName
   * @returns {void}
   */
  removeNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Connects a container to a network based on container name and network name
   * @param {string} req.body.networkName
   * @param {string} req.body.containerName
   * @returns {void}
   */
  connectContainerToNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Disconnects a network given the network name and container name
   * @param {string} req.body.networkName
   * @param {string} req.body.containerName
   * @returns {void}
   */
  disconnectContainerFromNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @todo Needs to be implemented
   * @abstract Gets all the containers running on a given network based on network name
   * @param {string} req.params.networkName
   * @returns @param {ContainerPS[]} res.locals.containers
   */
  getContainersOnNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const networkController: NetworkController = {} as NetworkController;

networkController.getNetworks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker network ls --format "{{json .}},"');
    if (stderr.length) throw new Error(stderr);
    const networks: NetworkType[] = JSON.parse(`[${stdout.trim().slice(0, -1)}]`)
      .filter((network: NetworkType) => network["Name"] !== 'host' && network['Name'] !== 'none');
    res.locals.networks = networks;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.getNetworks Error: ': error }),
      status: 500,
      message: { err: 'networkController.getNetworks error' }
    }
    return next(errObj);
  }
}

networkController.createNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { networkName } = req.body;
    const { stdout, stderr } = await execAsync(`docker network create ${networkName}`);
    if (stderr.length) throw new Error(stderr);
    //Remove once verified working
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.createNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.createNetwork error' }
    }
    return next(errObj);
  }
}

networkController.removeNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { networkName } = req.body;
    const { stdout, stderr } = await execAsync(`docker network rm ${networkName}`);
    if (stderr.length) throw new Error(stderr);

    //Delete once verified
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.removeNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.removeNetwork error' }
    }
    return next(errObj);
  }
}

networkController.connectContainerToNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { networkName, containerName } = req.body;
    const { stdout, stderr } = await execAsync(`docker network connect ${networkName} ${containerName}`);
    if (stderr.length) throw new Error(stderr);
    
    // Delete below once verified working
    console.log(stdout);

    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.connectContainerToNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.connectContainerToNetwork error' }
    }
    return next(errObj);
  }
}

networkController.disconnectContainerFromNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { networkName, containerName } = req.body;
    const { stdout, stderr } = await execAsync(`docker network disconnect ${networkName} ${containerName}`);
    if (stderr.length) throw new Error(stderr);

    // Delete console log when confirmed working
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.disconnectContainerFromNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.disconnectContainerFromNetwork error' }
    }
    return next(errObj);
  }
}

/**
 * @todo: implement
 */
networkController.getContainersOnNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.getContainersOnNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.getContainersOnNetwork error' }
    }
    return next(errObj);
  }
}

export default networkController;