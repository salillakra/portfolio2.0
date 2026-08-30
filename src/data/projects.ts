export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year?: string;
  featured: boolean;
  tech: string[];
  metric?: string;
  github?: string;
  live?: string;
  cover: string;
  gallery: string[];
  highlights: string[];
  problem: string;
  built: string;
  architecture: string;
  roleDetail: string;
  seo: {
    title: string;
    description: string;
  };
};

export const projects: Project[] = [
  {
    slug: "forge",
    title: "Forge",
    tagline: "Distributed workflow orchestration platform.",
    description:
      "A distributed workflow engine supporting DAG execution, cron scheduling, retries, asynchronous tasks, and durable workflow state.",
    role: "Full-stack",
    featured: true,
    tech: ["Go", "Next.js", "PostgreSQL", "NATS JetStream", "Docker"],
    github: "https://github.com/salillakra/forge-workflow",
    cover: "/projects/forge/cover.png",
    gallery: ["/projects/forge/01.png", "/projects/forge/02.png"],
    highlights: [
      "DAG execution, cron scheduling, retries, asynchronous tasks, and durable workflow state",
      "Event-driven execution with Go, NATS JetStream, and PostgreSQL",
      "React Flow workflow building and SSE-based execution monitoring",
    ],
    problem:
      "Long-running work needs DAG execution, scheduling, retries, and durable state — not a fire-and-forget job queue.",
    built:
      "A distributed workflow engine with cron scheduling, retries, asynchronous tasks, durable state, React Flow editing, and SSE execution monitoring.",
    architecture:
      "Go and NATS JetStream for event-driven execution, PostgreSQL for durable workflow state, Next.js and React Flow on the builder, Docker to run it.",
    roleDetail:
      "Built the workflow engine, event-driven execution path, and the React Flow + SSE monitoring UI.",
    seo: {
      title: "Forge",
      description:
        "Forge by Salil Lakra — a distributed workflow orchestration platform in Go, Next.js, PostgreSQL, and NATS JetStream.",
    },
  },
  {
    slug: "quill",
    title: "Quill",
    tagline: "Campus operations and assessment on a shared document engine.",
    description:
      "A solo-built AI campus platform: upload a syllabus or timetable PDF, then ask it with citations, pull a timetable into campus, turn it into a question paper, and mark student scripts.",
    role: "Solo full-stack",
    year: "2026",
    featured: true,
    tech: [
      "Next.js",
      "Bun",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "BullMQ",
      "Redis",
      "Pinecone",
      "Gemini",
      "Socket.IO",
    ],
    github: "https://github.com/salillakra/quill",
    cover: "/projects/quill/cover.png",
    gallery: [
      "/projects/quill/01.png",
      "/projects/quill/02.png",
      "/projects/quill/03.png",
    ],
    highlights: [
      "Multi-stage BullMQ ingest: convert → OCR → chunk → embed",
      "Hybrid RAG with page citations (Pinecone ANN + PostgreSQL lexical + RRF)",
      "AI timetable extraction into campus faculty, rooms, and courses",
      "Question-paper generation rendered to PDF via Playwright and KaTeX",
      "Rubric-based AI grading with teacher override and score release",
      "Five roles: ADMIN, EDUCATOR, ANALYST, STUDENT, PARENT",
    ],
    problem:
      "Campus work is split across spreadsheets, PDFs, and ad-hoc tools. A timetable, a syllabus, and a marking stack rarely share one document engine.",
    built:
      "Quill is a workspace where a PDF becomes the source of truth. After ingest, you can ask the document with citations, extract a timetable into campus ops, generate a question paper, and grade scripts with a rubric.",
    architecture:
      "Next.js 16 on the client. Bun + Hono API, Prisma on PostgreSQL, Redis/BullMQ workers for ingest, extract, generate, and grade. Pinecone for vector search, optional Gemini, Socket.IO for live pipeline progress. Demo mode runs without an API key.",
    roleDetail:
      "Solo author. License © 2026 Salil Lakra. Backend API, four BullMQ workers, Prisma schema, role-based Next.js app, Docker Compose, and GitHub Actions CI.",
    seo: {
      title: "Quill",
      description:
        "Quill by Salil Lakra — a solo-built AI campus platform for cited document Q&A, timetable extraction, paper generation, and AI grading.",
    },
  },
  {
    slug: "agile-turn",
    title: "Agile Turn Recruitment Suite",
    tagline: "Applicant tracking for a real staffing firm — parse, match, hire.",
    description:
      "Internal ATS for Agile Turn Technology LLP covering jobs, applicants, pipeline, AI matching, resume parsing, interviews, and transactional email.",
    role: "Core contributor — 25 of 33 commits",
    year: "2026",
    featured: true,
    tech: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "BullMQ",
      "Gemini",
      "FastAPI",
      "NextAuth",
      "Brevo",
    ],
    metric: "28 jobs · 17 candidates",
    github: "https://github.com/salillakra/Agile_Turn_Technology_LLP",
    cover: "/projects/agile-turn/cover.png",
    gallery: [
      "/projects/agile-turn/01.png",
      "/projects/agile-turn/02.png",
      "/projects/agile-turn/03.png",
      "/projects/agile-turn/04.png",
      "/projects/agile-turn/05.png",
    ],
    highlights: [
      "Gemini hybrid resume and job-description parsing",
      "Recruiter AI search: natural language → semantic + full-text + RRF",
      "Google OAuth and invite-only registration",
      "Role-scoped RBAC, bulk resume ingest, Brevo transactional email",
      "Real-time SSE parse-progress updates",
      "GCP Terraform provisioning for Coolify-based deploy",
    ],
    problem:
      "A staffing firm needs one system for jobs, candidates, pipeline, interviews, and email — plus AI that can read resumes and rank fit, not a pile of sheets.",
    built:
      "An internal recruitment suite: dashboard KPIs, jobs, applicants, Kanban, reports, AI search, interview scheduling, and an admin CRM. 107 API routes and a companion FastAPI ai-service for embeddings and NLP.",
    architecture:
      "Next.js App Router and API routes, PostgreSQL with Prisma and pgvector, Redis and BullMQ workers, NextAuth, Brevo, and a Python FastAPI service for embeddings and resume NLP.",
    roleDetail:
      "25 of 33 commits, merged via PR into the upstream repo. I shipped Gemini parsing, Google OAuth, invite-only registration, RBAC scoping, bulk resume upload, Brevo email, SSE parse progress, and GCP Terraform. The initial platform and the CRM module were built by other contributors — this is not a solo claim.",
    seo: {
      title: "Agile Turn Recruitment Suite",
      description:
        "Agile Turn Recruitment Suite by Salil Lakra — a production ATS with Gemini resume parsing, pgvector search, BullMQ, and 107 API routes.",
    },
  },
  {
    slug: "e-summit-2026",
    title: "E-Summit 2026",
    tagline: "BIT Mesra’s flagship entrepreneurship festival, live on the web.",
    description:
      "Official platform for E-Summit 2026 (13–15 February) — dynamic event pages, OAuth, sponsor systems, and real-time features under live traffic.",
    role: "Core web contributor",
    year: "2025–2026",
    featured: true,
    tech: [
      "Next.js",
      "Supabase",
      "TypeScript",
      "Framer Motion",
      "Three.js",
      "PostgreSQL",
    ],
    metric: "11K+ page views",
    github: "https://github.com/EDC-BITM/e-summit26",
    live: "https://esummit.edcbitmesra.in",
    cover: "/projects/e-summit-2026/cover.png",
    gallery: [
      "/projects/e-summit-2026/01.png",
      "/projects/e-summit-2026/02.png",
      "/projects/e-summit-2026/03.png",
      "/projects/e-summit-2026/04.png",
    ],
    highlights: [
      "Live event site for 13–15 February 2026",
      "Dynamic event pages, speakers, schedule, and sponsorship",
      "Web app manifest and metadata for E-Summit 2026",
      "Animated sponsor logo loop with generated sponsor assets",
      "User data table with multiple teams per user",
    ],
    problem:
      "A three-day campus entrepreneurship festival needs one public site for schedule, speakers, sponsors, and registration — and it has to hold up when traffic spikes.",
    built:
      "The official E-Summit 2026 website: hero and brochure CTAs, speaker archive, three-day schedule, sponsorship, FAQ, and authenticated user/team views on Supabase.",
    architecture:
      "Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Supabase, Framer Motion, Lenis, Three.js / React Three Fiber, TanStack Query, and PostHog.",
    roleDetail:
      "I shipped the web app manifest and metadata, the dynamic sponsor logo loop, additional image assets, and the user table that shows multiple teams per user with a team-details dialog. The repo is a team project under EDC-BITM.",
    seo: {
      title: "E-Summit 2026",
      description:
        "E-Summit 2026 by Salil Lakra and EDC BIT Mesra — the live festival platform with event pages, OAuth, and 11K+ page views.",
    },
  },
  {
    slug: "robosaga",
    title: "RoboSaga",
    tagline: "Competition platform for robotics events.",
    description:
      "Competition platform with structured event data and scalable APIs built for robotics competitions.",
    role: "Backend & platform",
    year: "2026",
    featured: true,
    tech: ["Next.js", "PostgreSQL", "Drizzle ORM"],
    metric: "311 users",
    github: "https://github.com/Pratyunmis/robosaga26",
    live: "https://robosaga.robolutionbitm.in",
    cover: "/projects/robosaga/cover.png",
    gallery: [
      "/projects/robosaga/01.png",
      "/projects/robosaga/02.png",
      "/projects/robosaga/03.png",
      "/projects/robosaga/04.png",
    ],
    highlights: [
      "Official RoboSaga ’26 site — events, leaderboard, HackAway, teams",
      "Admin panel: 311 users, 82 teams, registrations and messages",
      "HackAway problem-statement capacity and team qualification",
      "Structured event data and scalable APIs on PostgreSQL and Drizzle",
    ],
    problem:
      "Robotics competitions need structured event data and APIs that stay consistent as events and registrations grow.",
    built:
      "A competition platform with structured event data and scalable APIs for robotics competitions at BIT Mesra.",
    architecture:
      "Next.js with PostgreSQL and Drizzle ORM, live at robosaga.robolutionbitm.in.",
    roleDetail:
      "Platform and API work on the RoboSaga 2026 competition site (team repository).",
    seo: {
      title: "RoboSaga",
      description:
        "RoboSaga by Salil Lakra — a robotics competition platform with structured event data and scalable APIs.",
    },
  },
];

export const getAllProjects = () => projects;

export const getFeaturedProjects = () => projects.filter((project) => project.featured);

export const getSecondaryProjects = () =>
  projects.filter((project) => !project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const HOME_METRICS = [
  { value: "11,000+", label: "E-Summit page views" },
  { value: "311", label: "RoboSaga users" },
  { value: "5", label: "Production systems" },
] as const;
