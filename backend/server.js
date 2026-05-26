import express from "express";
import cors from "cors";
import { config } from "./src/config/index.js";
import authRoutes from "./src/routes/auth.js";
import resumeRoutes from "./src/routes/resumes.js";
import jobRoutes from "./src/routes/jobs.js";
import matchRoutes from "./src/routes/matches.js";
import reportRoutes from "./src/routes/reports.js";

const app = express();

app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ app: "ResumeAI API", version: "1.0.0", docs: "/api/health" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/report", reportRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large. Max 10MB." });
  }
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
