import { NextResponse } from "next/server";
import { generateReply } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, mood } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const reply = await generateReply(message, mood);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
