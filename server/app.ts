import express, {NextFunction, Request, Response} from'express';
// import path from'path';
import cors from'cors';
// import colors from'colors';

import signupRouter from'./routes/signupRouter';
import loginRouter from'./routes/loginRouter';
import adminRouter from'./routes/adminRouter';
import accountRouter from'./routes/accountRouter';
import apiRouter from'./routes/apiRouter';
import dbRouter from'./routes/dbRouter';
import initRouter from'./routes/initRouter';
import logoutRouter from'./routes/logoutRouter';
import settingsRouter from'./routes/settingsRouter';
import commandRouter from'./routes/commandRouter';
import { ServerError } from '../types';

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 

app.use('/test', (req: Request, res: Response) => {
  res.status(200).json({
    success: true
  });
});

app.use('/settings', settingsRouter);
app.use('/init', initRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/logout', logoutRouter);
app.use('/command', commandRouter);

app.use('/', (req: Request, res: Response) => {
  /*
    Reads the current URL (explains why electron crashes)
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log('current url',url);
  */
  // for development purposes, so we don't have to reopen electron everytime
  return res.status(404).redirect('/');
});

app.get('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' }
  };
  const errorObj: ServerError = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

export default app;

/*
    Reads the current URL (explains why electron crashes)
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log('current url',url);
*/
