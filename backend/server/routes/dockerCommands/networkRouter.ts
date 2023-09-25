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
router.delete('/');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/container');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id/container/:containerId');

export default router;