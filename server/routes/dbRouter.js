/**
 * ************************************
 *
 * @module Database Router
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/23/2021
 * @description Routes all endpoints for initializing the database for new users
 *
 * ************************************
 */

const express = require('express');
const dbController = require('../controllers/dbController');
  
const router = express.Router();

// Route handler: instantiates user and roles tables of database, adds role types 
router.get('/',
  dbController.createRoles,
  dbController.insertRoles,
  dbController.createTable,
  dbController.createAdminPassword,
  dbController.insertAdmin,
  (req, res) => {
    // if (res.locals.error) return res.status(200).json(res.locals);
    console.log('in dbrouter!');
    return res.status(200).json('Database initialized successfully');
  }
);

module.exports = router;