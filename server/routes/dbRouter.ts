/**
 * @module Database Router
 * @description Routes all endpoints for initializing the database for new users
 */
import { Router, type Request, type Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();

// Route handler: instantiates user and roles tables of database, adds role types
router.get('/',
  dbController.createRoles,
  dbController.insertRoles,
  dbController.createTable,
  // dbController.createAdminPassword,
  // dbController.insertAdmin,
  (req: Request, res: Response) => {
    return res.status(200).json('Database initialized successfully');
  }
);

export default router;
