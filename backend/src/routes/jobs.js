import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createJob,
  getJob,
  listJobs,
  deleteJob,
} from "../controllers/jobController.js";

const router = Router();

router.use(authenticate);
router.post("/", createJob);
router.get("/", listJobs);
router.get("/:id", getJob);
router.delete("/:id", deleteJob);

export default router;
