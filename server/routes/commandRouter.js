/**
 * @module COMMAND Router
 * @description Routes all requests to APIs 
 */


const express = require('express');
const commandController = require('../controllers/commandController');
const { route } = require('./signupRouter');


const router = express.Router();

// ==========================================================
// Route Handling for Commands
// Purpose: contains routing for various commands located in /helper/commands
// ==========================================================

// Route for refreshing the running container list
router.get('/refreshRunning', 
  commandController.getContainers,
  commandController.getApiData,
  (req, res) => {
    return res.status(200).json(res.locals.apiData);
  }
);

// Route for fetching user host stats
router.get('/getHost', 
  commandController.getHost, 
  (req, res, next) => {
    return res.status(200).json(res.locals.hostData);
  });

// Route for adding a new running container to runningList state
router.post('/runImage',
  commandController.runImage,
  commandController.getContainers,
  commandController.getApiData,
  (req, res, next) => {
    return res.status(201).json(res.locals.apiData);
  });

// Route for refreshing stopped containers
router.get('/refreshStopped',
  commandController.refreshStopped,
  (req, res, next) => {
    return res.status(200).json(res.locals.stoppedContainers);
  }
);

// Route to refresh list of images
router.get('/refreshImages',
  commandController.refreshImages,
  (req, res, next) => {
    return res.status(200).json(res.locals.imagesList);
  }
);
  
// Route to remove a stopped container
router.get('/removeContainer', 
  commandController.remove, 
  (req, res, next) => {
    return res.status(200).json(res.locals.idRemoved);
  }
);

// Route to stop a running container
router.get('/stopContainer', 
  commandController.stopContainer,
  commandController.refreshStopped, 
  (req, res, next) => {
    return res.status(200).json(res.locals.containerStopped);
  }
);

// Route to run a stopped container
router.get('/runStopped', 
  commandController.runStopped,
  (req, res, next) => {
    return res.status(200).json(res.locals.containerRan);
  }
);

// Route to remove an image
router.get('/removeImage', 
  commandController.removeImage,
  (req, res, next) => {
    return res.status(200);
  });

// Route for running the docker prune command
router.get('/dockerPrune', 
  commandController.dockerPrune,
  (req, res, next) => {
    return res.status(200).json(res.locals.pruneMessage);
  });

// Route to pull new images
router.get('/pullImage', 
  commandController.pullImage,
  (req, res, next) => {
    return res.status(200).json(res.locals.imgMessage);
  });
module.exports = router;