import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.js";
import {
  uploadResume,
  getResume,
  listResumes,
  deleteResume,
} from "../controllers/resumeController.js";

const router = Router();

router.use(authenticate);
router.post("/upload", upload.single("file"), uploadResume);
router.get("/", listResumes);
router.get("/:id", getResume);
router.delete("/:id", deleteResume);

export default router;
