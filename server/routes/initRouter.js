/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */
const express = require('express');
const initController = require('../controllers/initController');
  
const router = express.Router();

// Route handler: initializes the metrics database
router.get('/',
  initController.initDatabase,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

module.exports = router;