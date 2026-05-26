import prisma from "../config/db.js";
import { analyzeMatch } from "../ai/matcher.js";

export async function createMatch(req, res) {
  try {
    const { resumeId, jobId } = req.body;
    if (!resumeId || !jobId) {
      return res.status(400).json({ error: "resumeId and jobId required" });
    }

    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId: req.userId },
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const job = await prisma.jobDescription.findFirst({
      where: { id: jobId, userId: req.userId },
    });
    if (!job) return res.status(404).json({ error: "Job description not found" });

    const result = await analyzeMatch(
      resume.extractedText || "",
      job.content
    );

    const match = await prisma.matchResult.create({
      data: {
        resumeId,
        jdId: jobId,
        matchScore: result.matchScore,
        matchedSkills: result.matchedSkills || [],
        missingSkills: result.missingSkills || [],
        suggestions: result.suggestions || [],
      },
    });

    res.status(201).json({
      matchId: match.id,
      matchScore: match.matchScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
      suggestions: match.suggestions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMatch(req, res) {
  try {
    const match = await prisma.matchResult.findFirst({
      where: { id: req.params.id },
      include: {
        resume: { select: { id: true, fileName: true } },
        jobDescription: { select: { id: true, title: true } },
      },
    });
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listMatches(req, res) {
  try {
    const matches = await prisma.matchResult.findMany({
      where: {
        resume: { userId: req.userId },
      },
      orderBy: { createdAt: "desc" },
      include: {
        resume: { select: { id: true, fileName: true } },
        jobDescription: { select: { id: true, title: true } },
      },
    });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
