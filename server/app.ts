// import/prep for our server and type declarations
import express, { NextFunction, Request, Response } from "express";
import { ServerError } from "../types";
import cors from "cors";
// TODO do we change exec's importation syntax?
const { exec } = require("child_process");
const app = express();

// allow requests from other domains
app.use(cors());

// run commands in an exec (terminal instance); restarts containers running from the docketeerx/docketeer image using their ID
// TODO consider adjusting this to be accurate; commented out seems to change nothing
exec(
  'docker container ls -a --format "table {{.ID}}\t{{.Names}}" | grep docketeerx/docketeer | cut -d" " -f1 | cut -f1 | xargs -I{} docker container restart -t 0 {}',
  (error, stdout, stderr) => {
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
import accountRouter from "./routes/accountRouter";
import adminRouter from "./routes/adminRouter";
import apiRouter from "./routes/apiRouter";
import commandRouter from "./routes/commandRouter";
import dbRouter from "./routes/dbRouter";
import initRouter from "./routes/initRouter";
import loginRouter from "./routes/loginRouter";
import logoutRouter from "./routes/logoutRouter";
import signupRouter from "./routes/signupRouter";

// Enabling middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defining routers...
// TODO: understand what the hell these routes are doing; think of getAllDockerVolumes fetch('/api/command/allDockerVolumes')
app.use("/account", accountRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);
app.use("/command", commandRouter);
app.use("/db", dbRouter);
app.use("/init", initRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

// Handling requests to unknown endpoints...
app.use("/", (req: Request, res: Response) => {
  return res
    .status(404)
    .send({ error: "Unknown endpoint — please try again." });
});

// Handling global errors...
app.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: { err: "An error occured" },
    };
    const errorObj: ServerError = Object.assign(defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

// Exporting app...
export default app;
