import { aiClient, getModel } from "./client.js";

export async function analyzeMatch(resumeText, jdText) {
  const response = await aiClient.chat.completions.create({
    model: getModel(),
    messages: [
      {
        role: "system",
        content:
          "You are an expert ATS resume analyzer. Analyze the resume against the job description and return valid JSON with: matchScore (0-100), matchedSkills (array of strings), missingSkills (array of strings), suggestions (array of improvement suggestions). Be thorough and accurate.",
      },
      {
        role: "user",
        content: `Resume:\n${resumeText}\n\nJob Description:\n${jdText}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}
