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

router.post('/timezone',
  initController.timeZone,
  (req, res) => {
    return res.sendStatus(200);
  }
);

router.post('/github',
  initController.gitURL,
  (req, res) => {
    return res.status(200).json(res.locals.url);
  }
);

router.post('/addMetrics',
  initController.addMetrics,
  (req, res) => {
    return res.status(200).json({});
  }
);

router.post('/getMetrics',
  initController.getMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.metrics);
  }
);

module.exports = router;