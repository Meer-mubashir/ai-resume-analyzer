import { aiClient, getModel } from "./client.js";

export async function parseResumeAI(text) {
  const response = await aiClient.chat.completions.create({
    model: getModel(),
    messages: [
      {
        role: "system",
        content:
          "You are a resume parser. Extract structured information from the resume text. Return valid JSON with fields: name, email, skills (array), education (array of {degree, institution, year}), experience (array of {company, role, duration, highlights}).",
      },
      { role: "user", content: text },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}
