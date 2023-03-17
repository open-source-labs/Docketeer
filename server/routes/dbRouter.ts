/**
 * @module Database Router
 * @description Routes all endpoints for initializing the database for new users
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();

export default router;
