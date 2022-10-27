/**
 * @module settingsRouter Router
 * @description Performs all of the settings functionality for adding/removing containers and notifications.
 */
const express = require('express');
const settingsController = require('../controllers/settingsController');
  
const router = express.Router();

router.get('/', 
  settingsController.notificationSettings,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

//insert container and settings
router.post('/insert',
  settingsController.addContainer, settingsController.addContainerSettings,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post('/delete',
  settingsController.deleteContainerSettings,
  (req, res) => {
    return res.status(200).json({});
  }
);

router.post('/phone',
  settingsController.addPhoneNumber,
  (req, res) => {
    return res.status(200).json({});
  }
);

router.post('/notification',
  settingsController.notificationFrequency,
  (req, res) => {
    return res.status(200).json({});
  }
);

router.post('/monitoring',
  settingsController.monitoringFrequency,
  (req, res) => {
    return res.status(200).json({});
  }
);

router.post('/gitLinks',
  settingsController.addGitLinks,
  (req, res) => {
    return res.status(200).json({});
  }
)

module.exports = router;