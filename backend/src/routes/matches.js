import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createMatch,
  getMatch,
  listMatches,
} from "../controllers/matchController.js";

const router = Router();

router.use(authenticate);
router.post("/", createMatch);
router.get("/", listMatches);
router.get("/:id", getMatch);

export default router;
