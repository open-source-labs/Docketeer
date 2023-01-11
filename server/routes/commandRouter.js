/**
 * @module COMMAND Router
 * @description Routes all requests to APIs 
 */


const express = require('express');
const commandController = require('../controllers/commandController');


const router = express.Router();

// Route Handler: 
router.get('/refreshRunning', 
  commandController.getContainers,
  commandController.getApiData,
  (req, res) => {
    return res.status(200).json(res.locals.apiData);
  }
);

// Route for getting host stats
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

// Route to refresh images
router.get('/refreshImages',
  commandController.refreshImages,
  (req, res, next) => {
    return res.status(200).json(res.locals.imagesList);
  }
);

// Route to remove container
router.post('/remove',
  commandController.remove,
  (req, res, next) => {
    return res.status(201).json(res.locals.idRemoved);
  }
);

module.exports = router;