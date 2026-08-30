import { useState } from "react";

type ProjectMediaProps = {
  src?: string;
  alt: string;
  title: string;
  className?: string;
  imgClassName?: string;
  loading?: "eager" | "lazy";
};

export function ProjectMedia({
  src,
  alt,
  title,
  className = "",
  imgClassName = "",
  loading = "lazy",
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={`relative overflow-hidden bg-(--bg-tertiary) ${className}`}
    >
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex h-full min-h-full w-full items-end p-6 sm:p-8"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 20% 0%, color-mix(in srgb, var(--metric-accent) 22%, transparent), transparent 55%), linear-gradient(160deg, var(--bg-secondary), var(--bg-tertiary))",
          }}
          aria-hidden={false}
          role="img"
          aria-label={alt}
        >
          <p className="font-display max-w-[16ch] text-3xl leading-[0.95] text-(--text-primary) italic sm:text-4xl">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
