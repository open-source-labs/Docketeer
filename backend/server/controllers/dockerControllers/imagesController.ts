import { Request, Response, NextFunction } from 'express';
import { ContainerPS, NetworkType } from 'types';
import { execAsync } from '../helper';
import { ServerError } from 'backend/backend-types';

interface ImageController {
  /**
   * @method
   * @abstract Gets a list of networks running on docker. Filters out host and none names
   * @returns @param {NetworkType[]} res.locals.networks
   * @returns {void}
   */
  getNetworks: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const imageController: ImageController = {} as ImageController;

export default imageController;