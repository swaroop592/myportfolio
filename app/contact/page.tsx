"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="mb-6 text-sm text-gray-600">
        Leave your details and I&apos;ll reach out to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Your name"
          value={form.name}
          onChange={e => updateField("name", e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Email (optional)"
          value={form.email}
          onChange={e => updateField("email", e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Phone number"
          value={form.phone}
          onChange={e => updateField("phone", e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Subject"
          value={form.subject}
          onChange={e => updateField("subject", e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded min-h-[120px]"
          placeholder="Your message"
          value={form.message}
          onChange={e => updateField("message", e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm mt-2">
            Thanks! I&apos;ll contact you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
