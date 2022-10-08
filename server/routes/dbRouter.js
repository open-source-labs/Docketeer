/**
 * @module Database Router
 * @description Routes all endpoints for initializing the database for new users
 */
const express = require('express');
const dbController = require('../controllers/dbController');

const router = express.Router();

// Route handler: instantiates user and roles tables of database, adds role types
router.get(
  '/',
  dbController.createRoles,
  dbController.insertRoles,
  dbController.createTable,
  dbController.createAdminPassword,
  dbController.insertAdmin,
  (req, res) => {
    return res.status(200).json('Database initialized successfully');
  }
);

module.exports = router;
