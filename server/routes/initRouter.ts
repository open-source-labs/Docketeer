/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */
import { Router, Request, Response } from "express";
import initController from "../controllers/initController";

const router = Router();
// TODO make sure to check what we are sending in the body, is it the name? or githuburl?

// ==========================================================
// Route: /github
// Purpose: Grabs url of specified container
// ==========================================================

router.post("/github", initController.gitUrl, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.url);
});

// ==========================================================
// Route: /addMetrics
// Purpose: adds metrics to our metrics table of each individual container
// ==========================================================

router.post(
  "/addMetrics",
  initController.addMetrics,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  }
);
// TODO should this be a get request?

// ==========================================================
// Route: /getMetrics
// Purpose: retrieves metrics from our metrics table of each individual container
// ==========================================================

router.post(
  "/getMetrics",
  initController.getMetrics,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.metrics);
  }
);

export default router;
