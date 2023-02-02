/**
 * @module Cookie Controller
 * @description Contains middleware that stores the user id in a HTTP-only cookie and sets HTTP-only cookie specifically for admins
 */

import { type Request, type Response, type NextFunction } from 'express';
import { type CookieController, ServerError } from '../../types';

const cookieController: CookieController = {
  // store the user id in a cookie
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) { return next(); }

    res.cookie('ssid', res.locals.user._id, { httpOnly: true });
    return next();
  },
  // set admin cookie for users with admin privileges
  setAdminCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) { return next(); }

    const { role_id } = res.locals.user;

    if (role_id === 1) {
      res.cookie('adminType', 'system admin', { httpOnly: true });
      res.locals.cookie = 'system admin';
    }
    if (role_id === 2) {
      res.cookie('adminType', 'admin', { httpOnly: true });
      res.locals.cookie = 'admin';
    }
    return next();
  }
};

export default cookieController;
