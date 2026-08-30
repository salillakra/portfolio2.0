import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "../../components/SiteChrome";
import { PageFade } from "../../components/PageFade";
import { JsonLd } from "../../components/JsonLd";
import { ProjectMedia } from "../../components/ProjectMedia";
import { getAllProjects } from "../../data/projects";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON,
  absoluteUrl,
  breadcrumbJsonLd,
  pageTitle,
  personJsonLd,
} from "../../lib/seo";

const DESCRIPTION =
  "Selected work by Salil Lakra — Quill, Agile Turn Recruitment Suite, E-Summit 2026, and other production systems.";

export const Route = createFileRoute("/projects/")({
  loader: () => ({ projects: getAllProjects() }),
  head: () => {
    const canonical = absoluteUrl("/projects");
    return {
      meta: [
        { title: pageTitle("Projects") },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: pageTitle("Projects") },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:url", content: canonical },
        { property: "og:image", content: absoluteUrl(OG_IMAGE) },
        { property: "og:image:alt", content: OG_IMAGE_ALT },
        { name: "twitter:title", content: pageTitle("Projects") },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: absoluteUrl(OG_IMAGE) },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  const { projects } = Route.useLoaderData();
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <SiteChrome>
      <PageFade>
        <JsonLd
          data={[
            personJsonLd(),
            breadcrumbJsonLd([
              { name: PERSON.name, path: "/" },
              { name: "Projects", path: "/projects" },
            ]),
          ]}
        />
        <main className="min-h-screen bg-(--bg) pt-28 pb-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
              Work by Salil Lakra
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] text-(--text-primary) italic sm:text-7xl">
              Projects
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-(--text-secondary)">
              Production systems with public repos. Featured work first — then
              the rest of the archive.
            </p>

            <section className="mt-14 space-y-8">
              {featured.map((project) => (
                <Link
                  key={project.slug}
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="card group grid overflow-hidden rounded-3xl no-underline md:grid-cols-[1.15fr_0.85fr]"
                >
                  <ProjectMedia
                    src={project.cover}
                    alt={`${project.title} — Salil Lakra`}
                    title={project.title}
                    className="min-h-64 md:min-h-full"
                    imgClassName="transition duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
                      {project.year ?? "Case"}
                      {project.metric ? ` · ${project.metric}` : ` · ${project.role}`}
                    </p>
                    <h2 className="font-display mt-3 text-3xl text-(--text-primary) italic md:text-4xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
                      {project.description}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-(--text-primary)">
                      Open case →
                    </p>
                  </div>
                </Link>
              ))}
            </section>

            <section className="mt-16">
              <h2 className="text-lg font-semibold text-(--text-primary)">
                Archive
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((project) => (
                  <Link
                    key={project.slug}
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="card group overflow-hidden rounded-2xl no-underline"
                  >
                    <ProjectMedia
                      src={project.cover}
                      alt={`${project.title} — Salil Lakra`}
                      title={project.title}
                      className="aspect-16/10"
                      imgClassName="transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-(--text-primary)">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                        {project.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </PageFade>
    </SiteChrome>
  );
}
