import fs from "fs";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function extractText(filePath, mimeType) {
  if (mimeType === "application/pdf") {
    return extractPDF(filePath);
  }
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    filePath.endsWith(".docx")
  ) {
    return extractDOCX(filePath);
  }
  return extractTXT(filePath);
}

async function extractPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
}

async function extractDOCX(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

function extractTXT(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}
