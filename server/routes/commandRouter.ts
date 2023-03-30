/**
 * @module COMMAND Router
 * @description Routes all requests to APIs
 */

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
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.containers);
  },
);

// Route for adding a new running container to runningList state
router.post(
  '/runImage',
  commandController.checkAdmin,
  commandController.runImage,
  commandController.getContainers,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.containers);
  },
);

// Route for refreshing stopped containers
router.get(
  '/refreshStopped',
  commandController.refreshStopped,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.stoppedContainers);
  },
);

// Route to refresh list of images
router.get(
  '/refreshImages',
  commandController.refreshImages,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.imagesList);
  },
);

// Route to remove a stopped container
router.get(
  '/removeContainer',
  commandController.checkAdmin,
  commandController.remove,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.idRemoved);
  },
);

// Route to stop a running container
router.get(
  '/stopContainer',
  commandController.checkAdmin,
  commandController.stopContainer,
  commandController.refreshStopped,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.containerStopped);
  },
);

// Route to run a stopped container
router.get(
  '/runStopped',
  commandController.checkAdmin,
  commandController.runStopped,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.containerRan);
  },
);

// Route to remove an image
router.get(
  '/removeImage',
  commandController.checkAdmin,
  commandController.removeImage,
  (req: Request, res: Response) => {
    return res.status(200);
  },
);

// Route for running the docker prune command
router.get(
  '/dockerPrune',
  commandController.checkAdmin,
  commandController.dockerPrune,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.pruneMessage);
  },
);

// Route to pull new images
router.get(
  '/pullImage',
  commandController.checkAdmin,
  commandController.pullImage,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.imgMessage);
  },
);

// Route to get network container list
router.get(
  '/networkContainers',
  commandController.networkContainers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.networkContainers);
  },
);

// Route to inspect docker container
router.get(
  '/inspect',
  commandController.inspectDockerContainer,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.inspectOut);
  },
);

// Route to compose a docker file
router.post(
  '/composeUp',
  commandController.checkAdmin,
  commandController.composeUp,
  commandController.composeStacks,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.output);
  },
);

// Route to compose DOWN a docker file
router.post(
  '/composeDown',
  commandController.checkAdmin,
  commandController.composeDown,
  commandController.composeStacks,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.output);
  },
);

// Route to get list of container networks
router.get(
  '/composeStacks',
  commandController.checkAdmin,
  commandController.composeStacks,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.output);
  },
);

// Route to get all Docker Volumes
router.get(
  '/allDockerVolumes',
  commandController.getAllDockerVolumes,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dockerVolumes);
  },
);

// Route to get all containers running in specified volume
router.get(
  '/volumeContainers',
  commandController.getVolumeContainers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.volumeContainers);
  },
);

// Route to get all container logs
router.post(
  '/allLogs',
  commandController.getLogs,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.logs);
  },
);

export default router;
