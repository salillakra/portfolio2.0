import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteChrome } from "../../components/SiteChrome";
import { PageFade } from "../../components/PageFade";
import { JsonLd } from "../../components/JsonLd";
import { ProjectMedia } from "../../components/ProjectMedia";
import { getProjectBySlug } from "../../data/projects";
import {
  OG_IMAGE,
  PERSON,
  absoluteUrl,
  breadcrumbJsonLd,
  pageTitle,
  personJsonLd,
  softwareSourceCodeJsonLd,
} from "../../lib/seo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);

    if (!project) {
      throw notFound();
    }

    return { project };
  },
  notFoundComponent: () => (
    <SiteChrome>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
          404
        </p>
        <h1 className="font-display mt-4 text-5xl text-(--text-primary) italic">
          Project not found
        </h1>
        <p className="mt-4 text-(--text-secondary)">
          That case study is not in Salil Lakra’s archive.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-flex w-fit rounded-full bg-(--accent) px-4 py-2 text-sm text-(--accent-text) no-underline"
        >
          Back to projects
        </Link>
      </main>
    </SiteChrome>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: pageTitle("Projects") }] };
    }

    const { project } = loaderData;
    const canonical = absoluteUrl(`/projects/${project.slug}`);
    const title = pageTitle(project.seo.title);
    const image = OG_IMAGE;

    return {
      meta: [
        { title },
        { name: "description", content: project.seo.description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: project.seo.description },
        { property: "og:url", content: canonical },
        { property: "og:image", content: absoluteUrl(image) },
        {
          property: "og:image:alt",
          content: `${project.title} — Salil Lakra`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: project.seo.description },
        { name: "twitter:image", content: absoluteUrl(image) },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ProjectCasePage,
});

function ProjectCasePage() {
  const { project } = Route.useLoaderData();
  const openerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const media = openerRef.current?.querySelector("[data-case-media]");
        if (!media || !openerRef.current) return;

        gsap.fromTo(
          media,
          { scale: 1.12, y: 24 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: openerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: openerRef, dependencies: [project.slug] },
  );

  return (
    <SiteChrome>
      <PageFade>
        <JsonLd
          data={[
            personJsonLd(),
            softwareSourceCodeJsonLd(project),
            breadcrumbJsonLd([
              { name: PERSON.name, path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ]}
        />
        <main className="min-h-screen bg-(--bg)">
          <section
            ref={openerRef}
            className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
          >
            <div className="mx-auto max-w-6xl px-6">
              <Link
                to="/projects"
                className="inline-flex items-center rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-xs font-semibold tracking-[0.12em] text-(--text-secondary) uppercase no-underline"
              >
                All projects
              </Link>
              <p className="mt-8 text-[11px] font-semibold tracking-[0.18em] text-(--text-tertiary) uppercase">
                Case study · Salil Lakra
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] text-(--text-primary) italic sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-(--text-secondary)">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm text-(--text-tertiary)">
                {project.role}
                {project.metric ? ` · ${project.metric}` : ""}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm text-(--text-primary) no-underline"
                  >
                    <GithubLogo className="h-4 w-4" />
                    GitHub
                  </a>
                ) : null}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm text-(--accent-text) no-underline"
                  >
                    <ArrowSquareOut className="h-4 w-4" />
                    Live site
                  </a>
                ) : null}
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-6xl overflow-hidden px-6">
              <div data-case-media className="origin-center">
                <ProjectMedia
                  src={project.cover}
                  alt={`${project.title} — Salil Lakra`}
                  title={project.title}
                  className="aspect-video rounded-3xl border border-(--border)"
                  loading="eager"
                />
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-12 sm:grid-cols-12 sm:pb-16">
            <div className="space-y-10 sm:col-span-7">
              <CaseBlock title="Problem" body={project.problem} />
              <CaseBlock title="What I built" body={project.built} />
              <CaseBlock title="Architecture" body={project.architecture} />
              <CaseBlock title="My role" body={project.roleDetail} />
            </div>
            <aside className="sm:col-span-5">
              <div className="rounded-2xl border border-(--border) bg-(--surface) p-6 sm:sticky sm:top-28">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-(--badge-border) bg-(--badge-bg) px-2.5 py-1 text-xs text-(--text-secondary)"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 space-y-2.5 text-sm text-(--text-secondary)">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--metric-accent)" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>

          {project.gallery.length > 0 ? (
            <section className="mx-auto max-w-6xl px-6 pb-24">
              <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
                Frames
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((src, index) => (
                  <ProjectMedia
                    key={src}
                    src={src}
                    alt={`${project.title} frame ${index + 1} — Salil Lakra`}
                    title={`${project.title} ${String(index + 1).padStart(2, "0")}`}
                    className="aspect-16/10 rounded-2xl border border-(--border)"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </PageFade>
    </SiteChrome>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-(--text-primary) italic">{title}</h2>
      <p className="mt-3 text-[15px] leading-8 text-(--text-secondary)">{body}</p>
    </div>
  );
}
