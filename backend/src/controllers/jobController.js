import prisma from "../config/db.js";

export async function createJob(req, res) {
  try {
    const { title, content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Job description content required" });
    }
    const job = await prisma.jobDescription.create({
      data: { userId: req.userId, title, content },
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getJob(req, res) {
  try {
    const job = await prisma.jobDescription.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!job) return res.status(404).json({ error: "Job description not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listJobs(req, res) {
  try {
    const jobs = await prisma.jobDescription.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await prisma.jobDescription.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!job) return res.status(404).json({ error: "Job description not found" });
    await prisma.jobDescription.delete({ where: { id: req.params.id } });
    res.json({ status: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
