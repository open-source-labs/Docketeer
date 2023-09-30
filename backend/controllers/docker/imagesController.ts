import { Request, Response, NextFunction } from 'express';
import { ContainerPS, ImageType } from 'types';
import { execAsync } from '../helper';
import { ServerError } from 'backend/backend-types';

interface ImageController {
  /**
   * @method
   * @todo Reimplement this on frontend as old implementation used a matrix
   *       instead of array of objects...
   * @returns @param {ImageType[]} res.locals.images
   */
  getImages: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @todo implement
   * @param {string} req.body.name
   * @param {string} req.body.tag
   * @returns {void}
   */
  buildContainerFromImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;


  /**
   * @method
   * @todo implement
   * @abstract Pulls image from docker hub
   * @returns {void}
   */
  pullImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Removes an image based on id
   * @param {string} req.params.id
   * @returns
   */
  removeImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const imageController: ImageController = {} as ImageController;

/**
 * @todo fix frontend implementation
 */
imageController.getImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync('docker images --format "{{json .}},"');
    if (stderr.length) throw new Error(stderr);
    const images: ImageType = JSON.parse(`[${stdout.trim().slice(0, -1)}]`);
    console.log('images', images);
    res.locals.images = images;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'imageController.getImages Error: ': error }),
      status: 500,
      message: { err: 'imageController.getImages error' }
    }
    return next(errObj);
  }
}

/**
 * @todo verify it's working 
 * @todo change body parameters. It must accept a name for the container and a name for
 *       the image
 */
imageController.buildContainerFromImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { imageName, tag, containerName } = req.body;
    // Need to fix
    const { stdout, stderr } = await execAsync(`docker run --name ${containerName} ${imageName}:${tag}`);
    if (stderr.length) throw new Error(stderr);

    //Remove once verified working
    console.log(stdout);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'imageController.buildContainerFromImage Error: ': error }),
      status: 500,
      message: { err: 'imageController.buildContainerFromImage error' }
    }
    return next(errObj);
  }
}

imageController.removeImage =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { stdout, stderr } = await execAsync(`docker rmi -f ${id}`);
    if (stderr.length) throw new Error(stderr);

    // Remove once verified
    console.log(stdout)
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'imageController.removeImage Error: ': error }),
      status: 500,
      message: { err: 'imageController.removeImage error' }
    }
    return next(errObj);
  }
}

export default imageController;