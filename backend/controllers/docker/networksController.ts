import { Request, Response, NextFunction } from 'express';
import { ContainerPS, NetworkAndContainer, NetworkContainerType, NetworkType } from '../../../types';
import { execAsync, getContainersOnNetwork } from '../helper';
import { ServerError } from '../../backend-types';

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
   * @param {string} req.params.id
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
   * @param {string} res.locals.networks
   * @returns @param {NetworkAndContainer[]} res.locals.networkContainers
   */
  getContainersOnNetwork: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @todo Needs to be implemented
   * @abstract Prunes the docker network forcefully
   * @returns
   */
  prune: (req: Request, res: Response, next: NextFunction) => Promise<void>;

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
    if (stderr) throw new Error(stderr);
    //Remove once verified working
    // console.log('this is stdout:', stdout);
    res.locals.result = { hash: stdout };
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
    // console.log('remove container test is coming here')
    const { id } = req.params;
    const { stdout, stderr } = await execAsync(`docker network rm ${id}`);
    if (stderr.length) throw new Error(stderr);
    //Delete once verified
    // console.log('this is:', stdout);
    res.locals.result = { hash: stdout };
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
    // console.log('this is stdout in connectContainerNetworl', stdout);

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
    const { networkName, containerName } = req.query;
    const { stdout, stderr } = await execAsync(`docker network disconnect ${networkName} ${containerName}`);
    if (stderr.length) throw new Error(stderr);

    // Delete console log when confirmed working
    // console.log('this is disconnect container network middleware stdout:', stdout);
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
 * @todo: Map NetworkType to res.locals.networks
 */
networkController.getContainersOnNetwork = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allContainers: NetworkAndContainer[] = [];
    for (const network of res.locals.networks) {
      allContainers.push({
        networkName: network.Name,
        containers: await getContainersOnNetwork(network.ID)
      });
    }
    res.locals.networksAndContainers = allContainers;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.getContainersOnNetwork Error: ': error }),
      status: 500,
      message: { err: 'networkController.getContainersOnNetwork error' }
    }
    return next(errObj);
  }
}

/**
 * @todo make sure implementation works
 */
networkController.prune = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker network prune --force');
    if (stderr.length) throw new Error(stderr);

    // Print stdout for now
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'networkController.prune Error: ': error }),
      status: 500,
      message: { err: 'networkController.prune error' }
    }
    return next(errObj);
  }
 }
export default networkController;