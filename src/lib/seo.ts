export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://salillakra.com"
).replace(/\/$/, "");

export const SITE_NAME = "Salil Lakra";
export const SITE_TITLE = "Salil Lakra — Software Engineer";
export const SITE_DESCRIPTION =
  "Salil Lakra is a software engineer focused on distributed backend systems, AI-powered applications, and scalable full-stack platforms — Go, TypeScript, Node.js, PostgreSQL, Redis, React, and Docker.";

export const PERSON = {
  name: "Salil Lakra",
  jobTitle: "Software Engineer",
  email: "salillakra.dev@gmail.com",
  url: SITE_URL,
  image: "/logo.png",
  sameAs: [
    "https://github.com/salillakra",
    "https://linkedin.com/in/salillakra",
    "https://x.com/salillakra223",
    "https://instagram.com/officialsalillakra",
    "https://www.buymeacoffee.com/salillakra",
  ],
} as const;

export const OG_IMAGE = "/og.png";
export const OG_IMAGE_ALT = "Salil Lakra — Software Engineer";

export const SITE_KEYWORDS =
  "Salil Lakra, Software Engineer, Full Stack Developer, Go, TypeScript, Node.js, React, Next.js, PostgreSQL, Redis, RAG, Quill, Forge, Agile Turn, E-Summit, BIT Mesra";

export const absoluteUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const pageTitle = (title?: string) =>
  title ? `${title} — ${SITE_NAME}` : SITE_TITLE;

type JsonLd = Record<string, unknown>;

export const personJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  email: PERSON.email,
  url: PERSON.url,
  image: absoluteUrl(PERSON.image),
  sameAs: [...PERSON.sameAs],
});

export const websiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
});

export const softwareSourceCodeJsonLd = (project: {
  title: string;
  description: string;
  slug: string;
  github?: string;
  live?: string;
  tech: string[];
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: project.title,
  description: project.description,
  url: absoluteUrl(`/projects/${project.slug}`),
  ...(project.github ? { codeRepository: project.github } : {}),
  ...(project.live ? { sameAs: [project.live] } : {}),
  author: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
  programmingLanguage: project.tech,
});

export const breadcrumbJsonLd = (
  crumbs: Array<{ name: string; path: string }>,
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});
