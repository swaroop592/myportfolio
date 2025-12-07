import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const secret = process.env.STREAM_API_SECRET!;

    const response = await fetch("https://chat.stream-io-api.com/v1/assistants/default", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Stream-Chat-API-Key": apiKey,
        "X-Stream-Chat-API-Secret": secret,
      },
      body: JSON.stringify({
        input: userMessage,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
