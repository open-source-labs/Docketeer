/**
 * @module Database Router
 * @description Routes all endpoints for initializing the database for new users
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();

// ==========================================================
// Route: /
// Purpose: instantiates user and roles tables of database. First we CREATE a table for user roles, then we INSERT three roles into table (system admin, admin, and user). Then we CREATE the table.
// ==========================================================
router.get(
  '/',
  dbController.createRolesTable,
  dbController.insertRoles,
  dbController.createUsersTable,
  (req: Request, res: Response): Response => {
    return res.status(200).json('Database initialized successfully');
  }
);

export default router;
