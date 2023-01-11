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

module.exports = router;