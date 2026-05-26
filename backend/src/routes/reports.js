import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { generateReport } from "../controllers/reportController.js";

const router = Router();

router.use(authenticate);
router.get("/:matchId", generateReport);

export default router;
