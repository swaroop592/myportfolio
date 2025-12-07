"use client";

import { useState } from "react";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function AssistantChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "You are an AI assistant embedded on Ram's portfolio site. Help visitors understand his skills, projects, and how to contact him. Be concise and friendly.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const visibleMessages = messages.filter(m => m.role !== "system");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      if (data?.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn’t get a response right now.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong talking to the AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full px-4 py-2 text-sm shadow-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          💬 Ask AI
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-xl border flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
            <div className="text-sm font-semibold">AI Assistant</div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 text-sm space-y-2 bg-gray-50">
            {visibleMessages.length === 0 && (
              <p className="text-xs text-gray-500">
                Ask about my skills, projects, or how to get in touch.
              </p>
            )}

            {visibleMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-gray-500">Thinking…</div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="border-t px-2 py-2 bg-white flex gap-2"
          >
            <input
              className="flex-1 border rounded px-2 py-1 text-xs"
              placeholder="Ask something..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
