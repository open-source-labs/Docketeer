import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import { exec } from 'child_process';
import * as path from 'path';
import { ServerError, GlobalErrorObject } from './backend-types';
const cookieParser = require('cookie-parser');

// const PORT = process.env.PORT || 3003;
const SOCKETFILE = '/run/guest-services/backend.sock';
const app = express();

try {
  fs.unlinkSync(SOCKETFILE);
  console.log('Deleted the UNIX file.');
}
catch (err) {
  console.log('Did not need to delete the UNIX socket file.');
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', (req, res) => {
  res.status(200).json({ message: 'does this go through /test route'});
})

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

// import apiRouter from './server/routes/apiRouter';
import commandRouter from './server/routes/commandRouter';
// import initRouter from './server/routes/initRouter';
// import loginRouter from './server/routes/loginRouter';
// import logoutRouter from './server/routes/logoutRouter';
// import setupRouter from './server/routes/setupRouter';
// import signupRouter from './server/routes/signupRouter';

app.use(express.static('SetupApp'));

// Defining routers...
app.use('/k8', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../SetupApp/index.html'));
});


// app.use('/gapi', apiRouter);
app.use('/command', commandRouter);
// app.use('/init', initRouter);
// app.use('/login', loginRouter);
// app.use('/logout', logoutRouter);
// app.use('/setup', setupRouter);
// app.use('/signup', signupRouter);

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

app.listen(SOCKETFILE, (): void => {
  console.log(`Listening on port ${SOCKETFILE}`);
});
