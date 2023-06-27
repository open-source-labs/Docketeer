// import/prep for our server and type declarations
import express, { Request, Response } from 'express';
import { ServerError, GlobalErrorObject } from '../types';
import cors from 'cors';
import { exec } from 'child_process';
import cookieParser from 'cookie-parser';
import * as path from 'path';

const app = express();

// allow requests from other domains
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// run commands in an exec (terminal instance); restarts containers running from the docketeerx/docketeer image using their ID
exec(
  'docker container ls -a --format "table {{.ID}}\t{{.Names}}" | grep docketeerx/docketeer | cut -d" " -f1 | cut -f1 | xargs -I{} docker container restart -t 0 {}',
  (error: Error | null, stdout: string, stderr: string): void => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);

// Importing routers...
import apiRouter from './routes/apiRouter';
import commandRouter from './routes/commandRouter';
import initRouter from './routes/initRouter';
import loginRouter from './routes/loginRouter';
import logoutRouter from './routes/logoutRouter';
import setupRouter from './routes/setupRouter';
import signupRouter from './routes/signupRouter';

// Enabling middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('SetupApp'));


// Defining routers...
app.use('/k8', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../SetupApp/index.html'));
});


app.use('/gapi', apiRouter);
app.use('/command', commandRouter);
app.use('/init', initRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/setup', setupRouter);
app.use('/signup', signupRouter);

// Handling requests to unknown endpoints...
app.use('/', (req: Request, res: Response): Response => {
  return res
    .status(404)
    .send({ error: 'Unknown endpoint YES HIT ROUTE please try again.' });
});

// Handling global errors...
app.get(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ServerError, req: Request, res: Response): Response => {
    const defaultErr: GlobalErrorObject = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj: ServerError = Object.assign(defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

export default app;
