import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { deleteJob, getAllJobs, getASingleJob, getMyJobs, postJob } from "../controllers/jobControllers.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
jobRouter.get("/getall", getAllJobs);
jobRouter.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
jobRouter.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
jobRouter.get("/get/:id", getASingleJob)


export default jobRouter;