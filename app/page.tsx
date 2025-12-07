"use client";

import { useState, FormEvent } from "react";
import AssistantChat from "./components/AssistantChat";

export default function HomePage() {
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

  async function handleSubmit(e: FormEvent) {
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top nav */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-semibold text-lg">
            <span className="text-blue-600">PORT</span>FOLIO
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#skills" className="hover:text-blue-600">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-600">
              Projects
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {/* HERO */}
        <section id="home" className="min-h-[70vh] flex flex-col justify-center">
          <p className="text-sm text-blue-600 mb-2">Hi, my name is</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Your Name Here
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 mb-4">
            AI / ML Engineer · Full-Stack Developer · Cloud & Infra
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mb-6">
            I design and build intelligent systems, data pipelines, and cloud-native
            applications. I like working at the intersection of{" "}
            <strong>AI, backend engineering, and infrastructure.</strong>
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded border text-sm hover:bg-gray-100"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-16 border-t">
          <h3 className="text-2xl font-semibold mb-4">About</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            I&apos;m a developer with experience in{" "}
            <strong>AI/ML, full-stack development, and IT infrastructure</strong>.
            I enjoy taking ideas from concept to production, whether that&apos;s
            building LLM-powered services, analytics dashboards, or robust backend
            systems. I care about clean architecture, automation, and making things
            observable and reliable.
          </p>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16 border-t">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">AI / Data</h4>
              <ul className="space-y-1 text-gray-700">
                <li>Python, PyTorch / TensorFlow</li>
                <li>LLMs, RAG, embeddings</li>
                <li>ETL, data pipelines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Backend / Web</h4>
              <ul className="space-y-1 text-gray-700">
                <li>Node.js, Next.js, REST APIs</li>
                <li>Postgres, Supabase, SQL</li>
                <li>Auth, API design, testing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cloud / Infra</h4>
              <ul className="space-y-1 text-gray-700">
                <li>Docker, CI/CD</li>
                <li>Microsoft Fabric / Power BI</li>
                <li>Monitoring & automation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-16 border-t">
          <h3 className="text-2xl font-semibold mb-6">Projects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="border rounded-lg p-4 bg-white shadow-sm">
              <h4 className="font-semibold mb-1">Portfolio Contact Pipeline</h4>
              <p className="text-xs text-gray-500 mb-2">
                Next.js · Supabase · Vercel · Fabric
              </p>
              <p className="text-sm text-gray-700">
                A personal portfolio with a custom contact pipeline that stores
                leads in Postgres (Supabase) and exposes the data for analytics
                in Microsoft Fabric / Power BI.
              </p>
            </article>

            <article className="border rounded-lg p-4 bg-white shadow-sm">
              <h4 className="font-semibold mb-1">Your Other Project</h4>
              <p className="text-xs text-gray-500 mb-2">
                Tech stack here
              </p>
              <p className="text-sm text-gray-700">
                Brief description of another project you&apos;re proud of. You
                can replace this text with something real later.
              </p>
            </article>
          </div>
        </section>

        {/* CONTACT (uses your existing /api/contact) */}
        <section id="contact" className="py-16 border-t mb-16">
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <p className="text-sm md:text-base text-gray-700 mb-6">
            Want to work together or talk about a project? Send me a message and
            I&apos;ll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Your name"
                value={form.name}
                onChange={e => updateField("name", e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Email (optional)"
                value={form.email}
                onChange={e => updateField("email", e.target.value)}
              />
            </div>

            <input
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="Phone number"
              value={form.phone}
              onChange={e => updateField("phone", e.target.value)}
            />

            <input
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="Subject"
              value={form.subject}
              onChange={e => updateField("subject", e.target.value)}
            />

            <textarea
              className="w-full border px-3 py-2 rounded text-sm min-h-[120px]"
              placeholder="Your message"
              value={form.message}
              onChange={e => updateField("message", e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
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
        </section>
      </main>
      <AssistantChat />

    </div>
  );
}
