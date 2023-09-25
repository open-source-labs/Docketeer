import { Router, Request, Response, NextFunction } from 'express';
import commandController from 'server/controllers/commandController';
const router = Router();

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/running');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/stopped');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/:id/inspect');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/start');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/stop');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id');

export default router;