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
router.get('/:id/containers');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/remove');

export default router;