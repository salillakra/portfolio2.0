import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";

const RESUME_EMBED_URL =
  "https://bitmesra-my.sharepoint.com/personal/btech10268_24_bitmesra_ac_in/_layouts/15/embed.aspx?UniqueId=143ad8b1-18ef-4851-90ef-ea41598a37dc";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  return (
    <main className="min-h-screen bg-(--bg) p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-384 flex-col overflow-hidden rounded-4xl border border-(--border) bg-(--bg-secondary) shadow-[0_30px_100px_rgba(0,0,0,0.14)] sm:min-h-[calc(100vh-2.5rem)]">
        <header className="flex items-center justify-between gap-3 border-b border-(--border) bg-(--surface) px-4 py-3 backdrop-blur-xl sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-4 py-2 text-sm font-medium text-(--text-primary) no-underline transition-colors hover:bg-(--surface-hover)"
          >
            <ArrowUpRight className="h-4 w-4 rotate-[-135deg]" />
            Back
          </Link>

          <a
            href={RESUME_EMBED_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-(--accent-text) no-underline transition-opacity hover:opacity-90"
          >
            <ArrowUpRight className="h-4 w-4" />
            Open
          </a>
        </header>

        <section className="relative flex-1 bg-(--bg) p-2 sm:p-3 lg:p-4">
          <div className="h-full overflow-hidden rounded-3xl border border-(--border) bg-(--bg-secondary) shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
            <iframe
              src={RESUME_EMBED_URL}
              title="Resume"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              className="h-[86vh] w-full sm:h-[88vh] lg:h-[calc(100vh-6rem)]"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
