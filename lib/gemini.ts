import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateReply(message: string, mood: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `
      Generate 4 different email replies in a ${mood} tone.

      Rules:
      - Proper email format
      - Clear subject understanding
      - Natural human tone
      - Greeting
      - Keep each reply concise
      - Separate each reply with "---"

      Original Email:
      ${message}
      `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text.split("---").map((r) => r.trim());
}
