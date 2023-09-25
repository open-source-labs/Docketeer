import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/:id');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/run');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id');

export default router;