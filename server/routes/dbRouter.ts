/**
 * @module Database Router
 * @description Routes all endpoints for initializing the database for new users
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();
// TODO this needs to be weighed against schema2 in the database folder to see if this file is necessary

// ==========================================================
// Route: /
// Purpose: instantiates user and roles tables of database. First we CREATE a table for user roles, then we INSERT three roles into table (system admin, admin, and user). Then we CREATE the table.
// ==========================================================

router.get(
  '/',
  // TODO create roles is a misleading name, creates a table for roles
  dbController.createRoles,
  dbController.insertRoles,
  dbController.createTable,
  (req: Request, res: Response) => {
    return res.status(200).json('Database initialized successfully');
  }
);

export default router;
