/**
 * @module COMMAND Router
 * @description Routes all requests to APIs 
 */


const express = require('express');
const commandController = require('../controllers/commandController');


const router = express.Router();

// Route Handler: 
router.get('/refreshRunning', 
  // may need depending on what info is sent over in request body
  // userController.getOneUser, 
  commandController.getContainers,
  commandController.getApiData,
  (req, res) => {
    return res.status(200).json(res.locals.apiData);
  }
);

module.exports = router;