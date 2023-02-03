/**
 * @module Login Router
 * @description Routes all requests to login endpoint 
 */

import {Request, Response,Router} from 'express';
import userController from '../controllers/userController';
// the below are unnecessary until Docketeer can run in the browser
// const bcryptController = require('../controllers/bcryptController');
// const cookieController = require('../controllers/cookieController');

const router = Router();

router.post('/',
  userController.verifyUser,
  // the below are inapplicable at the moment as Docketeer will not run in the browser, therefore cookies are not possible at this time
  // cookieController.setSSIDCookie,
  // cookieController.setAdminCookie,
  // bcryptController.hashCookie,
  (req: Request, res: Response) => {
    console.log('Active User Session -> User:',res.locals.user);
    if (res.locals.error) return res.status(201).json(res.locals);
    return res.status(201).json(res.locals.user);
  }
);

export default router;