import OpenAI from "openai";
import { config } from "../config/index.js";

function createClient() {
  const provider = config.aiProvider;

  if (provider === "groq") {
    return new OpenAI({
      apiKey: config.groqApiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  if (provider === "together") {
    return new OpenAI({
      apiKey: config.openaiApiKey,
      baseURL: "https://api.together.xyz/v1",
    });
  }

  if (provider === "ollama") {
    return new OpenAI({
      apiKey: "ollama",
      baseURL: config.ollamaBaseUrl + "/v1",
    });
  }

  return new OpenAI({ apiKey: config.openaiApiKey });
}

export const aiClient = createClient();

export function getModel() {
  switch (config.aiProvider) {
    case "groq":
      return "llama-3.3-70b-versatile";
    case "together":
      return "mistralai/Mixtral-8x7B-Instruct-v0.1";
    case "ollama":
      return "llama3.2";
    default:
      return "gpt-4.1-mini";
  }
}
