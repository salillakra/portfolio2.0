import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
} from "../lib/seo";

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: SITE_KEYWORDS },
      { name: "author", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl(OG_IMAGE) },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: absoluteUrl(OG_IMAGE) },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/logo192.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
        404
      </p>
      <h1 className="font-display mt-4 text-5xl text-(--text-primary) italic">
        Page not found
      </h1>
      <p className="mt-4 text-(--text-secondary)">
        That URL is not on Salil Lakra’s site.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit rounded-full bg-(--accent) px-4 py-2 text-sm text-(--accent-text) no-underline"
      >
        Back home
      </Link>
    </main>
  ),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
