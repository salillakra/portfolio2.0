import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Salil Lakra | Full Stack Developer" },
      {
        name: "description",
        content:
          "Full Stack Developer building scalable web and mobile applications with Next.js, React Native, and Node.js.",
      },
      {
        name: "keywords",
        content:
          "Salil Lakra, Full Stack Developer, React, React Native, Node.js, Next.js, SvelteKit, TypeScript, JavaScript, Python, C, C++, SQL, PostgreSQL, MongoDB, MySQL, Firebase, GitHub, LinkedIn, Instagram, Twitter, X, Git, Linux, Supabase, Firebase, GitHub Actions, Docker, Kubernetes, Docker Compose, Nginx, Sentry, Datadog, PostHog, Google Analytics, TanStack Start",
      },
      { name: "author", content: "Salil Lakra" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
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
        <Analytics />
      </body>
    </html>
  );
}
