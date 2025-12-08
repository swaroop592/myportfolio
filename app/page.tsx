"use client";

import { useState, FormEvent } from "react";
import AssistantChat from "./components/AssistantChat";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

const projects = [
  {
    title: "Portfolio Contact & Analytics Pipeline",
    stack: "Next.js · Supabase · Vercel · Microsoft Fabric",
    description:
      "End-to-end contact pipeline that stores portfolio leads in Postgres, exposes them to Microsoft Fabric, and powers self-service analytics in Power BI.",
    highlights: [
      "Event-driven contact capture and enrichment",
      "Fabric-ready schema for reporting",
      "Deployed and monitored on Vercel",
    ],
  },
  {
    title: "WisComm – WorkAdventure Collaboration Layer",
    stack: "Docker · TypeScript · Node.js · Nginx · Express",
    description:
      "Extended the WorkAdventure platform with a collaborative whiteboard experience to improve remote teamwork and HCI in a 3D game environment.",
    highlights: [
      "Real-time collaboration primitives",
      "Optimized asset delivery via Nginx",
      "Improved UX for distributed teams",
    ],
  },
  {
    title: "Credit Card Fraud Detection",
    stack: "Python · ML · ETL · Visualization",
    description:
      "Built and compared multiple machine learning models to detect fraudulent credit card transactions from highly imbalanced datasets.",
    highlights: [
      "Feature engineering and class imbalance handling",
      "Model comparison with ROC / AUC & F1",
      "Explainability-focused evaluation",
    ],
  },
  {
    title: "US Sales Forecasting with Neural Networks",
    stack: "Python · Neural Nets · Random Forest · SVM",
    description:
      "Forecasted monthly product-level sales across US stores using traditional ML and neural networks, benchmarked using RMSE.",
    highlights: [
      "Data pipelines for multi-store, multi-product time series",
      "Baseline vs advanced model comparison",
      "Error-analysis-driven iteration",
    ],
  },
];

const certifications = [
  {
    name: "Microsoft Fabric (Analytics & Governance)",
    issuer: "Self-directed specialization (in progress)",
    year: "2025",
    description:
      "Hands-on work with OneLake, Lakehouse, pipelines, and governance concepts while building analytics workloads.",
  },
  {
    name: "Cloud & Infrastructure Fundamentals",
    issuer: "University & Industry Projects",
    year: "2024",
    description:
      "Practical experience in virtualization, networking, monitoring, and secure deployments across academic and enterprise environments.",
  },
  {
    name: "AI & Machine Learning Foundations",
    issuer: "Academic Projects & Online Specializations",
    year: "2023",
    description:
      "Built ML systems end-to-end: data prep, model training, evaluation, and deployment workflows.",
  },
];

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "/books/atomic-habits.jpg", // place this in /public/books
    description:
      "A playbook for building systems instead of goals. Helped me design sustainable study, coding, and training routines.",
    link: "https://jamesclear.com/atomic-habits",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "/books/deep-work.jpg",
    description:
      "Reinforced my focus on distraction-free blocks of work for complex engineering and research tasks.",
    link: "https://www.calnewport.com/books/deep-work/",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    image: "/books/clean-architecture.jpg",
    description:
      "Influenced how I think about modularity, boundaries, and long-term maintainability in backend and AI services.",
    link: "https://www.oreilly.com/library/view/clean-architecture/9780134494272/",
  },
];

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  function updateField(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
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
    } catch (err) {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold">
              JK
            </div>
            <div className="text-sm font-medium tracking-tight">
              <span className="text-slate-200">Jyothiswaroop</span>{" "}
              <span className="text-slate-400">Koyya</span>
            </div>
          </div>
          <nav className="hidden gap-6 text-xs font-medium text-slate-300 sm:flex">
            <a href="#home" className="hover:text-blue-400">
              Home
            </a>
            <a href="#about" className="hover:text-blue-400">
              About
            </a>
            <a href="#skills" className="hover:text-blue-400">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-400">
              Projects
            </a>
            <a href="#certifications" className="hover:text-blue-400">
              Certifications
            </a>
            <a href="#books" className="hover:text-blue-400">
              Books
            </a>
            <a href="#contact" className="hover:text-blue-400">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Let&apos;s Connect
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section
          id="home"
          className="flex min-h-[70vh] flex-col justify-center gap-10 py-10 md:flex-row md:items-center"
        >
          <div className="flex-1 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Software Engineer · Full-Stack · Cloud & Infra
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              I build reliable{" "}
              <span className="text-blue-400">systems</span> and{" "}
              <span className="text-blue-400">tools</span> for people.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I&apos;m Jyothiswaroop, a developer who enjoys working where{" "}
              <span className="font-medium text-slate-100">
                backend engineering, AI, and infrastructure
              </span>{" "}
              meet. I like turning messy requirements into clean architectures,
              scalable services, and observable systems.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-200">
                AI / ML & LLM-powered services
              </span>
              <span className="rounded-full border border-slate-500/40 bg-slate-800/60 px-3 py-1 text-slate-200">
                Full-stack web apps
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                Cloud & enterprise IT
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-blue-400 hover:text-blue-300"
              >
                Contact me
              </a>
            </div>
          </div>

          {/* Hero side card */}
          <div className="mt-6 flex flex-1 justify-center md:mt-0">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Currently focusing on
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Designing small, composable backend services that are easy to
                  monitor, test, and change.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Building analytics-ready data flows into tools like{" "}
                  <span className="font-medium text-slate-100">
                    Microsoft Fabric & Power BI
                  </span>
                  .
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Integrating{" "}
                  <span className="font-medium text-slate-100">
                    LLMs and retrieval
                  </span>{" "}
                  into real applications, not just demos.
                </li>
              </ul>
              <div className="mt-5 rounded-lg border border-slate-700 bg-slate-900/80 p-3 text-xs text-slate-300">
                Based in <span className="font-semibold">Las Cruces, NM</span>,
                open to hybrid and remote roles.
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-t border-slate-800 py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr]">
            <div>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                About
              </h2>
              <p className="mb-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                I have experience across{" "}
                <span className="font-medium text-slate-100">
                  AI/ML, full-stack development, and enterprise IT
                </span>
                . I like taking ideas from a rough concept to something that&apos;s
                deployed, observable, and used by real people.
              </p>
              <p className="mb-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                I care about clean interfaces between systems, automating repeat
                work, and leaving things better than I found them. Whether it&apos;s
                an internal tool, a data pipeline, or an end-user app, I try to
                design with both developers and users in mind.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Outside of code, you&apos;ll often find me learning from books,
                experimenting with ML projects, or tracking training on platforms
                like Strava.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-200">
              <h3 className="text-sm font-semibold text-slate-100">
                What I&apos;m good at
              </h3>
              <ul className="space-y-2">
                <li>• Turning requirements into small, shippable milestones.</li>
                <li>• Making data usable for reporting and analytics.</li>
                <li>• Debugging weird infrastructure and deployment issues.</li>
                <li>• Communicating trade-offs clearly with non-technical folks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="border-t border-slate-800 py-14">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Skills</h2>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-100">
                AI / Data
              </h3>
              <ul className="space-y-1 text-slate-300">
                <li>Python · PyTorch · basic TensorFlow</li>
                <li>LLMs, RAG, embeddings, prompt workflows</li>
                <li>ETL, feature engineering, data pipelines</li>
                <li>Experiment tracking & evaluation</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-100">
                Backend / Web
              </h3>
              <ul className="space-y-1 text-slate-300">
                <li>Node.js, TypeScript, Next.js</li>
                <li>REST APIs, authentication, RBAC</li>
                <li>Postgres, Supabase, SQL</li>
                <li>Testing, logging, error tracking</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-100">
                Cloud / Infra & Enterprise IT
              </h3>
              <ul className="space-y-1 text-slate-300">
                <li>Docker, CI/CD, deployment pipelines</li>
                <li>Microsoft Fabric, Power BI, OneLake</li>
                <li>Networking, virtualization, monitoring</li>
                <li>Security-aware configuration & ops</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="border-t border-slate-800 py-14">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Selected Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map(project => (
              <article
                key={project.title}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm"
              >
                <div className="mb-1 text-sm font-semibold text-slate-50">
                  {project.title}
                </div>
                <div className="mb-2 text-[11px] uppercase tracking-wide text-blue-300">
                  {project.stack}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-slate-300">
                  {project.description}
                </p>
                <ul className="mb-3 space-y-1 text-[11px] text-slate-400">
                  {project.highlights.map(h => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section
          id="certifications"
          className="border-t border-slate-800 py-14"
        >
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Certifications & Learning
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map(cert => (
              <div
                key={cert.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs"
              >
                <div className="mb-1 text-sm font-semibold text-slate-50">
                  {cert.name}
                </div>
                <div className="mb-1 text-[11px] font-medium text-blue-300">
                  {cert.issuer}
                </div>
                <div className="mb-2 text-[11px] text-slate-400">
                  {cert.year}
                </div>
                <p className="text-slate-300">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKS */}
        <section id="books" className="border-t border-slate-800 py-14">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Books that influenced me
          </h2>
          <p className="mb-4 text-sm text-slate-300 sm:max-w-2xl">
            I learn a lot from books. These are a few that shaped how I think
            about systems, focus, and long-term growth.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {books.map(book => (
              <article
                key={book.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 text-xs">
                  <div className="text-sm font-semibold text-slate-50">
                    {book.title}
                  </div>
                  <div className="mb-2 text-[11px] text-slate-400">
                    {book.author}
                  </div>
                  <p className="mb-3 text-slate-300">{book.description}</p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto text-[11px] font-semibold text-blue-300 hover:text-blue-200"
                  >
                    Open book &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Tip: store covers as images under <code>/public/books</code> and
            adjust the paths above.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-slate-800 py-14">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            Contact
          </h2>
          <p className="mb-6 text-sm text-slate-300 sm:max-w-xl">
            Interested in working together, mentoring, or talking about a
            project? Send me a message and I&apos;ll get back to you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid max-w-xl gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm shadow"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                placeholder="Your name *"
                value={form.name}
                onChange={e => updateField("name", e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                placeholder="Email"
                value={form.email}
                onChange={e => updateField("email", e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                placeholder="Phone"
                value={form.phone}
                onChange={e => updateField("phone", e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                placeholder="Subject"
                value={form.subject}
                onChange={e => updateField("subject", e.target.value)}
              />
            </div>

            <textarea
              className="min-h-[130px] w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              placeholder="Your message *"
              value={form.message}
              onChange={e => updateField("message", e.target.value)}
              required
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
              {status === "success" && (
                <p className="text-[11px] text-emerald-300">
                  Thanks! I&apos;ll contact you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-[11px] text-rose-300">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="font-medium text-slate-200">
              Built by Jyothiswaroop Koyya
            </div>
            <div className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Jyothiswaroop Koyya. All rights
              reserved.
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300"
            >
              LeetCode
            </a>
            <a
              href="https://www.strava.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-300"
            >
              Strava
            </a>
            <a
              href="mailto:your@email.com"
              className="hover:text-emerald-300"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      <AssistantChat />
    </div>
  );
}
