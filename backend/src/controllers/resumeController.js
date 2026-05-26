import fs from "fs";
import prisma from "../config/db.js";
import { extractText } from "../services/textExtractor.js";
import { parseResumeAI } from "../ai/parser.js";

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const fileName = req.file.originalname;

    const extractedText = await extractText(filePath, mimeType);
    let parsedJson = null;
    try {
      parsedJson = await parseResumeAI(extractedText);
    } catch {
      parsedJson = { raw: extractedText };
    }

    const resume = await prisma.resume.create({
      data: {
        userId: req.userId,
        fileName,
        extractedText,
        parsedJson,
      },
    });

    res.status(201).json({ resumeId: resume.id, status: "uploaded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getResume(req, res) {
  try {
    const resume = await prisma.resume.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { matchResults: true },
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listResumes(req, res) {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, fileName: true, createdAt: true },
    });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteResume(req, res) {
  try {
    const resume = await prisma.resume.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    if (resume.fileName) {
      try {
        fs.unlinkSync(resume.fileName);
      } catch {}
    }
    await prisma.resume.delete({ where: { id: req.params.id } });
    res.json({ status: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
