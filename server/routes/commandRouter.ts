/**
 * @module COMMAND Router
 * @description Routes all requests to APIs
 */
// TODO clarify proper requests for consistent REST architecture; ex. get deletes(not good)
import { Router, Request, Response } from 'express';
import commandController from '../controllers/commandController';

const router = Router();

// ==========================================================
// Route Handling for Commands
// Purpose: contains routing for various commands located in /helper/commands
// ==========================================================

// Route for refreshing the running container list
router.get(
  '/refreshRunning',
  commandController.getContainers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.containers);
  }
);

// Route for adding a new running container to runningList state
router.post(
  '/runImage',
  commandController.runImage,
  commandController.getContainers,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.containers);
  }
);

// Route for refreshing stopped containers
router.get(
  '/refreshStopped',
  commandController.refreshStopped,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.stoppedContainers);
  }
);

// Route to refresh list of images
router.get(
  '/refreshImages',
  commandController.refreshImages,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.imagesList);
  }
);
// TODO should be a delete
// Route to remove a stopped container
router.get(
  '/removeContainer',
  commandController.remove,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.idRemoved);
  }
);

// TODO should be a delete
// Route to stop a running container
router.get(
  '/stopContainer',
  commandController.stopContainer,
  commandController.refreshStopped,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.containerStopped);
  }
);

// Route to run a stopped container
router.get(
  '/runStopped',
  commandController.runStopped,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.containerRan);
  }
);
// TODO should be a delete
// Route to remove an image
router.get(
  '/removeImage',
  commandController.removeImage,
  (req: Request, res: Response): Response => {
    return res.status(200);
  }
);
// TODO should this be a delete? execs a force prune
// Route for running the docker prune command
router.get(
  '/dockerPrune',
  commandController.dockerPrune,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.pruneMessage);
  }
);

// Route to pull new images
router.get(
  '/pullImage',
  commandController.pullImage,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.imgMessage);
  }
);

// Route to get network container list
router.get(
  '/networkContainers',
  commandController.networkContainers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.networkContainers);
  }
);
// TODO why would we want to inspect? currently not implemented
// Route to inspect docker container
router.get(
  '/inspect',
  commandController.inspectDockerContainer,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.inspectOut);
  }
);
// TODO should be a post request or get?
// Route to compose a docker file
router.post(
  '/composeUp',
  commandController.composeUp,
  commandController.composeStacks,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.output);
  }
);
// TODO should this be a delete?
// Route to compose DOWN a docker file
router.post(
  '/composeDown',
  commandController.composeDown,
  commandController.composeStacks,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.output);
  }
);

// Route to get list of container networks
router.get(
  '/composeStacks',
  commandController.composeStacks,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.output);
  }
);

// Route to get all Docker Volumes
router.get(
  '/allDockerVolumes',
  commandController.getAllDockerVolumes,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.dockerVolumes);
  }
);

// Route to get all containers running in specified volume
router.get(
  '/volumeContainers',
  commandController.getVolumeContainers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.volumeContainers);
  }
);
// TODO this should be a get request, is it best practice to include information in a get request in params/query(not body)
// Route to get all container logs
router.post(
  '/allLogs',
  commandController.getLogs,
  (req: Request, res: Response): Response => {
    console.log('res.locals.logs', res.locals.logs);
    return res.status(201).json(res.locals.logs);
  }
);

export default router;
