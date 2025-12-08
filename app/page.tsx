"use client";

import { useState, useEffect, FormEvent } from "react";
import AssistantChat from "./components/AssistantChat";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";
type Theme = "light" | "dark";

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
    image: "/books/atomic-habits.jpg",
    description:
      "A playbook for systems over goals. Helped me design sustainable study, coding, and training routines.",
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
  // add more books later, the scroll will handle it
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
  const [theme, setTheme] = useState<Theme>("dark");

  // Load theme from localStorage (if any)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      // default to dark
      document.documentElement.dataset.theme = "dark";
    }
  }, []);

  // Toggle theme and persist
  function toggleTheme() {
    setTheme(prev => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next);
        document.documentElement.dataset.theme = next;
      }
      return next;
    });
  }

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
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const isDark = theme === "dark";

  return (
    <div
      className={
        "min-h-screen transition-colors duration-300 " +
        (isDark
          ? "bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50"
          : "bg-slate-50 text-slate-900")
      }
    >
      {/* Top nav */}
      <header
        className={
          "sticky top-0 z-20 border-b backdrop-blur " +
          (isDark
            ? "border-white/10 bg-slate-950/80"
            : "border-slate-200 bg-white/80")
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className={
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold " +
                (isDark ? "bg-blue-600 text-white" : "bg-blue-600 text-white")
              }
            >
              JK
            </div>
            <div className="text-sm font-medium tracking-tight">
              <span className={isDark ? "text-slate-200" : "text-slate-900"}>
                Jyothiswaroop
              </span>{" "}
              <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                Koyya
              </span>
            </div>
          </div>

          <nav className="hidden gap-6 text-xs font-medium sm:flex">
            <a
              href="#home"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Home
            </a>
            <a
              href="#about"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              About
            </a>
            <a
              href="#skills"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Projects
            </a>
            <a
              href="#certifications"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Certifications
            </a>
            <a
              href="#books"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Books
            </a>
            <a
              href="#contact"
              className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={
                "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                (isDark
                  ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-blue-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-500")
              }
            >
              <span>{isDark ? "🌞 Light" : "🌙 Dark"}</span>
            </button>
            <a
              href="#contact"
              className={
                "rounded-full px-3 py-1 text-xs font-semibold shadow-sm " +
                (isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-600 text-white hover:bg-blue-500")
              }
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section
          id="home"
          className="flex min-h-[70vh] flex-col justify-center gap-10 py-10 md:flex-row md:items-center"
        >
          <div className="flex-1 space-y-5">
            <p
              className={
                "text-xs font-semibold uppercase tracking-[0.2em] " +
                (isDark ? "text-blue-400" : "text-blue-600")
              }
            >
              Software Engineer · Full-Stack · Cloud & Infra
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              I build reliable{" "}
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>
                systems
              </span>{" "}
              and{" "}
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>
                tools
              </span>{" "}
              for people.
            </h1>
            <p
              className={
                "max-w-xl text-sm leading-relaxed sm:text-base " +
                (isDark ? "text-slate-300" : "text-slate-700")
              }
            >
              I&apos;m Jyothiswaroop, a developer who enjoys working where{" "}
              <span
                className={
                  "font-medium " +
                  (isDark ? "text-slate-100" : "text-slate-900")
                }
              >
                backend engineering, AI, and infrastructure
              </span>{" "}
              meet. I like turning messy requirements into clean architectures,
              scalable services, and observable systems.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span
                className={
                  "rounded-full border px-3 py-1 " +
                  (isDark
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
                    : "border-blue-200 bg-blue-50 text-blue-700")
                }
              >
                AI / ML & LLM-powered services
              </span>
              <span
                className={
                  "rounded-full border px-3 py-1 " +
                  (isDark
                    ? "border-slate-500/40 bg-slate-800/60 text-slate-200"
                    : "border-slate-300 bg-white text-slate-700")
                }
              >
                Full-stack web apps
              </span>
              <span
                className={
                  "rounded-full border px-3 py-1 " +
                  (isDark
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700")
                }
              >
                Cloud & enterprise IT
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className={
                  "rounded-lg px-4 py-2 text-sm font-semibold shadow " +
                  (isDark
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-500")
                }
              >
                View projects
              </a>
              <a
                href="#contact"
                className={
                  "rounded-lg border px-4 py-2 text-sm font-semibold " +
                  (isDark
                    ? "border-slate-600 text-slate-100 hover:border-blue-400 hover:text-blue-300"
                    : "border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-700")
                }
              >
                Contact me
              </a>
            </div>
          </div>

          {/* Hero side card */}
          <div className="mt-6 flex flex-1 justify-center md:mt-0">
            <div
              className={
                "relative w-full max-w-sm overflow-hidden rounded-2xl border p-4 shadow-xl " +
                (isDark
                  ? "border-slate-800 bg-slate-900/70"
                  : "border-slate-200 bg-white/80")
              }
            >
              <div
                className={
                  "mb-4 text-xs font-semibold uppercase tracking-[0.2em] " +
                  (isDark ? "text-slate-400" : "text-slate-500")
                }
              >
                Currently focusing on
              </div>
              <ul
                className={
                  "space-y-3 text-xs " +
                  (isDark ? "text-slate-200" : "text-slate-700")
                }
              >
                <li className="flex items-start gap-2">
                  <span
                    className={
                      "mt-1 h-1.5 w-1.5 rounded-full " +
                      (isDark ? "bg-blue-400" : "bg-blue-500")
                    }
                  />
                  Designing small, composable backend services that are easy to
                  monitor, test, and change.
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className={
                      "mt-1 h-1.5 w-1.5 rounded-full " +
                      (isDark ? "bg-emerald-400" : "bg-emerald-500")
                    }
                  />
                  Building analytics-ready data flows into tools like{" "}
                  <span
                    className={
                      "font-medium " +
                      (isDark ? "text-slate-100" : "text-slate-900")
                    }
                  >
                    Microsoft Fabric & Power BI
                  </span>
                  .
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className={
                      "mt-1 h-1.5 w-1.5 rounded-full " +
                      (isDark ? "bg-amber-400" : "bg-amber-500")
                    }
                  />
                  Integrating{" "}
                  <span
                    className={
                      "font-medium " +
                      (isDark ? "text-slate-100" : "text-slate-900")
                    }
                  >
                    LLMs and retrieval
                  </span>{" "}
                  into real applications, not just demos.
                </li>
              </ul>
              <div
                className={
                  "mt-5 rounded-lg border p-3 text-xs " +
                  (isDark
                    ? "border-slate-700 bg-slate-900/80 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700")
                }
              >
                Based in{" "}
                <span className="font-semibold">Las Cruces, NM</span>, open to
                hybrid and remote roles.
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr]">
            <div>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                About
              </h2>
              <p
                className={
                  "mb-3 text-sm leading-relaxed sm:text-base " +
                  (isDark ? "text-slate-300" : "text-slate-700")
                }
              >
                I have experience across{" "}
                <span
                  className={
                    "font-medium " +
                    (isDark ? "text-slate-100" : "text-slate-900")
                  }
                >
                  AI/ML, full-stack development, and enterprise IT
                </span>
                . I like taking ideas from a rough concept to something that&apos;s
                deployed, observable, and used by real people.
              </p>
              <p
                className={
                  "mb-3 text-sm leading-relaxed sm:text-base " +
                  (isDark ? "text-slate-300" : "text-slate-700")
                }
              >
                I care about clean interfaces between systems, automating repeat
                work, and leaving things better than I found them. Whether it&apos;s
                an internal tool, a data pipeline, or an end-user app, I try to
                design with both developers and users in mind.
              </p>
              <p
                className={
                  "text-sm leading-relaxed sm:text-base " +
                  (isDark ? "text-slate-300" : "text-slate-700")
                }
              >
                Outside of code, you&apos;ll often find me learning from books,
                experimenting with ML projects, or tracking training on platforms
                like Strava.
              </p>
            </div>
            <div
              className={
                "space-y-4 rounded-2xl border p-4 text-xs " +
                (isDark
                  ? "border-slate-800 bg-slate-900/60 text-slate-200"
                  : "border-slate-200 bg-white text-slate-700")
              }
            >
              <h3
                className={
                  "text-sm font-semibold " +
                  (isDark ? "text-slate-100" : "text-slate-900")
                }
              >
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
        <section
          id="skills"
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Skills</h2>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            {[
              {
                title: "AI / Data",
                items: [
                  "Python · PyTorch · basic TensorFlow",
                  "LLMs, RAG, embeddings, prompt workflows",
                  "ETL, feature engineering, data pipelines",
                  "Experiment tracking & evaluation",
                ],
              },
              {
                title: "Backend / Web",
                items: [
                  "Node.js, TypeScript, Next.js",
                  "REST APIs, authentication, RBAC",
                  "Postgres, Supabase, SQL",
                  "Testing, logging, error tracking",
                ],
              },
              {
                title: "Cloud / Infra & Enterprise IT",
                items: [
                  "Docker, CI/CD, deployment pipelines",
                  "Microsoft Fabric, Power BI, OneLake",
                  "Networking, virtualization, monitoring",
                  "Security-aware configuration & ops",
                ],
              },
            ].map(box => (
              <div
                key={box.title}
                className={
                  "rounded-2xl border p-4 " +
                  (isDark
                    ? "border-slate-800 bg-slate-900/60"
                    : "border-slate-200 bg-white")
                }
              >
                <h3
                  className={
                    "mb-2 text-sm font-semibold " +
                    (isDark ? "text-slate-100" : "text-slate-900")
                  }
                >
                  {box.title}
                </h3>
                <ul
                  className={
                    "space-y-1 " +
                    (isDark ? "text-slate-300" : "text-slate-700")
                  }
                >
                  {box.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS with horizontal scroll */}
        <section
          id="projects"
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Selected Projects
          </h2>
          <p
            className={
              "mb-4 text-sm " +
              (isDark ? "text-slate-300" : "text-slate-700")
            }
          >
            Scroll horizontally to explore more projects on smaller screens.
          </p>
          <div
            className={
              "no-scrollbar flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible"
            }
          >
            {projects.map(project => (
              <article
                key={project.title}
                className={
                  "flex min-w-[260px] flex-col rounded-2xl border p-4 shadow-sm snap-start md:min-w-0 " +
                  (isDark
                    ? "border-slate-800 bg-slate-900/70"
                    : "border-slate-200 bg-white")
                }
              >
                <div
                  className={
                    "mb-1 text-sm font-semibold " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {project.title}
                </div>
                <div
                  className={
                    "mb-2 text-[11px] uppercase tracking-wide " +
                    (isDark ? "text-blue-300" : "text-blue-700")
                  }
                >
                  {project.stack}
                </div>
                <p
                  className={
                    "mb-3 text-xs leading-relaxed " +
                    (isDark ? "text-slate-300" : "text-slate-700")
                  }
                >
                  {project.description}
                </p>
                <ul
                  className={
                    "mb-3 space-y-1 text-[11px] " +
                    (isDark ? "text-slate-400" : "text-slate-600")
                  }
                >
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
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Certifications & Learning
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map(cert => (
              <div
                key={cert.name}
                className={
                  "flex flex-col rounded-2xl border p-4 text-xs " +
                  (isDark
                    ? "border-slate-800 bg-slate-900/60"
                    : "border-slate-200 bg-white")
                }
              >
                <div
                  className={
                    "mb-1 text-sm font-semibold " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {cert.name}
                </div>
                <div
                  className={
                    "mb-1 text-[11px] font-medium " +
                    (isDark ? "text-blue-300" : "text-blue-700")
                  }
                >
                  {cert.issuer}
                </div>
                <div
                  className={
                    "mb-2 text-[11px] " +
                    (isDark ? "text-slate-400" : "text-slate-500")
                  }
                >
                  {cert.year}
                </div>
                <p
                  className={
                    isDark ? "text-slate-300" : "text-slate-700"
                  }
                >
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKS with horizontal scroll */}
        <section
          id="books"
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Books that influenced me
          </h2>
          <p
            className={
              "mb-4 text-sm sm:max-w-2xl " +
              (isDark ? "text-slate-300" : "text-slate-700")
            }
          >
            I learn a lot from books. These are a few that shaped how I think
            about systems, focus, and long-term growth. Scroll horizontally to
            see more.
          </p>
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {books.map(book => (
              <article
                key={book.title}
                className={
                  "flex min-w-[240px] snap-start flex-col overflow-hidden rounded-2xl border md:min-w-0 " +
                  (isDark
                    ? "border-slate-800 bg-slate-900/70"
                    : "border-slate-200 bg-white")
                }
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
                  <div
                    className={
                      "text-sm font-semibold " +
                      (isDark ? "text-slate-50" : "text-slate-900")
                    }
                  >
                    {book.title}
                  </div>
                  <div
                    className={
                      "mb-2 text-[11px] " +
                      (isDark ? "text-slate-400" : "text-slate-500")
                    }
                  >
                    {book.author}
                  </div>
                  <p
                    className={
                      "mb-3 " +
                      (isDark ? "text-slate-300" : "text-slate-700")
                    }
                  >
                    {book.description}
                  </p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      "mt-auto text-[11px] font-semibold " +
                      (isDark ? "text-blue-300 hover:text-blue-200" : "text-blue-700 hover:text-blue-600")
                    }
                  >
                    Open book &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p
            className={
              "mt-3 text-[11px] " +
              (isDark ? "text-slate-500" : "text-slate-500")
            }
          >
            Store covers as images under <code>/public/books</code> and adjust
            paths if needed.
          </p>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className={
            "border-t py-14 " +
            (isDark ? "border-slate-800" : "border-slate-200")
          }
        >
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            Contact
          </h2>
          <p
            className={
              "mb-6 text-sm sm:max-w-xl " +
              (isDark ? "text-slate-300" : "text-slate-700")
            }
          >
            Interested in working together, mentoring, or talking about a
            project? Send me a message and I&apos;ll get back to you.
          </p>

          <form
            onSubmit={handleSubmit}
            className={
              "grid max-w-xl gap-4 rounded-2xl border p-5 text-sm shadow " +
              (isDark
                ? "border-slate-800 bg-slate-950/60"
                : "border-slate-200 bg-white")
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className={
                  "w-full rounded-lg border px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 " +
                  (isDark
                    ? "border-slate-700 bg-slate-900/60 text-slate-100"
                    : "border-slate-300 bg-slate-50 text-slate-900")
                }
                placeholder="Your name *"
                value={form.name}
                onChange={e => updateField("name", e.target.value)}
                required
              />
              <input
                type="email"
                className={
                  "w-full rounded-lg border px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 " +
                  (isDark
                    ? "border-slate-700 bg-slate-900/60 text-slate-100"
                    : "border-slate-300 bg-slate-50 text-slate-900")
                }
                placeholder="Email"
                value={form.email}
                onChange={e => updateField("email", e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className={
                  "w-full rounded-lg border px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 " +
                  (isDark
                    ? "border-slate-700 bg-slate-900/60 text-slate-100"
                    : "border-slate-300 bg-slate-50 text-slate-900")
                }
                placeholder="Phone"
                value={form.phone}
                onChange={e => updateField("phone", e.target.value)}
              />
              <input
                className={
                  "w-full rounded-lg border px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 " +
                  (isDark
                    ? "border-slate-700 bg-slate-900/60 text-slate-100"
                    : "border-slate-300 bg-slate-50 text-slate-900")
                }
                placeholder="Subject"
                value={form.subject}
                onChange={e => updateField("subject", e.target.value)}
              />
            </div>

            <textarea
              className={
                "min-h-[130px] w-full rounded-lg border px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 " +
                (isDark
                  ? "border-slate-700 bg-slate-900/60 text-slate-100"
                  : "border-slate-300 bg-slate-50 text-slate-900")
              }
              placeholder="Your message *"
              value={form.message}
              onChange={e => updateField("message", e.target.value)}
              required
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className={
                  "rounded-lg px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-70 " +
                  (isDark
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-500")
                }
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
              {status === "success" && (
                <p
                  className={
                    "text-[11px] " +
                    (isDark ? "text-emerald-300" : "text-emerald-600")
                  }
                >
                  Thanks! I&apos;ll contact you soon.
                </p>
              )}
              {status === "error" && (
                <p
                  className={
                    "text-[11px] " +
                    (isDark ? "text-rose-300" : "text-rose-600")
                  }
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={
          "border-t " +
          (isDark ? "border-slate-800 bg-slate-950/90" : "border-slate-200 bg-white")
        }
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div
              className={
                "font-medium " +
                (isDark ? "text-slate-200" : "text-slate-900")
              }
            >
              Built by Jyothiswaroop Koyya
            </div>
            <div
              className={
                "text-[11px] " +
                (isDark ? "text-slate-500" : "text-slate-500")
              }
            >
              © {new Date().getFullYear()} Jyothiswaroop Koyya. All rights
              reserved.
            </div>
          </div>
          <div
            className={
              "flex flex-wrap gap-4 " +
              (isDark ? "text-slate-400" : "text-slate-600")
            }
          >
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400"
            >
              LeetCode
            </a>
            <a
              href="https://www.strava.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400"
            >
              Strava
            </a>
            <a
              href="mailto:your@email.com"
              className="hover:text-emerald-400"
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
