import { Request, Response, NextFunction } from 'express';
import { execAsync } from '../helper';
import { ServerError } from 'backend/backend-types';

interface SystemController {
  /**
   * @method
   * @todo Needs to be implemented
   * @abstract Prunes the docker network forcefully
   * @returns
   */
  prune: (req: Request, res: Response, next: NextFunction) => Promise<void>;

}

const systemController: SystemController = {} as SystemController;

systemController.prune = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker system prune --force');
    if (stderr.length) throw new Error(stderr);

    // Print stdout for now
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'systemController.prune Error: ': error }),
      status: 500,
      message: { err: 'systemController.prune error' }
    }
    return next(errObj);
  }
}
export default systemController;