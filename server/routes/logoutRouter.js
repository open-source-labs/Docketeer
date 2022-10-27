/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
const express = require('express');
const dbController = require('../controllers/dbController');

const router = express.Router();

router.post('/', dbController.removeToken, (req, res) => {
  return res.status(200).json(res.locals.logout);
});

module.exports = router;
