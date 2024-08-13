import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob } from "../controllers/jobControllers.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);





export default jobRouter;