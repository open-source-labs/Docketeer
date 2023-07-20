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
router.delete(
  '/removeContainer',
  commandController.remove,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.idRemoved);
  },
);

// Route to stop a running container
router.delete(
  '/stopContainer',
  commandController.stopContainer,
  commandController.refreshStopped,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.containerStopped);
  },
);

// Route to run a stopped container
router.get(
  '/runStopped',
  commandController.runStopped,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.containerRan);
  },
);

// Route to remove an image
router.delete(
  '/removeImage',
  commandController.removeImage,
  (req: Request, res: Response) => {
    return res.status(200);
  },
);

// Route for running the docker prune command
router.delete(
  '/dockerPrune',
  commandController.dockerPrune,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.pruneMessage);
  },
);

// Route for running the docker network prune command
router.delete(
  '/dockerNetworkPrune',
  commandController.dockerNetworkPrune,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.pruneNetworkMessage);
  },
);

// Route to pull new images
router.get(
  '/pullImage',
  commandController.pullImage,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.imgMessage);
  },
);

// Route to get a list of networks
router.get(
  '/networkContainers',
  commandController.networkContainers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.networkContainers);
  },
);

// Route to get a list of networks with the containers they are attached to 
router.get(
  '/networkListContainers',
  commandController.networkContainers,
  commandController.networkListContainers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.networkListContainers);
  },
);

// Route to create a new network
router.post(
  '/networkCreate',
  commandController.networkCreate,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.result);
  }
);

// Route to remove a network 
router.post(
  '/networkRemove',
  commandController.networkRemove,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.result);
  }
);

// Route to connect a container with a network
router.post(
  '/networkConnect',
  commandController.networkConnect,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.result);
  }
);

// Route to disconnect a container from a network 
router.post(
  '/networkDisconnect',
  commandController.networkDisconnect,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.result);
  }
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
  commandController.composeUp,
  commandController.composeStacks,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.output);
  },
);

// Route to compose DOWN a docker file
router.post(
  '/composeDown',
  commandController.composeDown,
  commandController.composeStacks,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.output);
  },
);

// Route to get list of container networks
router.get(
  '/composeStacks',
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

router.post(
  '/volumeRemove',
  commandController.volumeRemove,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.volumeRemoved);
  }
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
