import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    if (!userMessage) {
      return NextResponse.json(
        { error: "userMessage is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const secret = process.env.STREAM_API_SECRET;

    if (!apiKey || !secret) {
      console.error("Missing Stream API env vars");
      return NextResponse.json(
        { error: "Server is missing Stream API keys" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://chat.stream-io-api.com/v1/assistants/default",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Stream-Chat-API-Key": apiKey,
          "X-Stream-Chat-API-Secret": secret,
        },
        body: JSON.stringify({
          input: userMessage,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Stream API error:", text);
      return NextResponse.json(
        { error: "AI request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Stream response:", data);

    // 👇 We DON'T know the exact shape yet, so we try some common fields,
    // and fall back to dumping the JSON as a string so you see *something*.
    const replyText =
      // try likely fields first:
      (data as any).output_text ||
      (data as any).output ||
      (data as any).message ||
      // fallback: entire JSON as string
      JSON.stringify(data);

    // 👇 This is the shape your AssistantChat expects
    return NextResponse.json({
      message: {
        role: "assistant",
        content: replyText,
      },
    });
  } catch (err) {
    console.error("Assistant API error:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
