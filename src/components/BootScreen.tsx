import { useEffect, useState } from "react";

export function BootScreen() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("boot-locked");

    let hideTimer = 0;
    const frame = window.requestAnimationFrame(() => {
      hideTimer = window.setTimeout(() => setPhase("hide"), 40);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      root.classList.remove("boot-locked");
    };
  }, []);

  useEffect(() => {
    if (phase !== "hide") return;

    const root = document.documentElement;
    const done = window.setTimeout(() => {
      root.classList.remove("boot-locked");
      setPhase("gone");
    }, 280);

    return () => window.clearTimeout(done);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      id="boot-screen"
      data-exit={phase === "hide" ? "true" : "false"}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading site"
    >
      <div className="boot-mark">SL</div>
      <div className="boot-spin" aria-hidden="true" />
    </div>
  );
}

export function RoutePending() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-(--border)"
      role="progressbar"
      aria-label="Loading page"
    >
      <div className="route-pending-bar h-full w-1/3 bg-(--text-primary)" />
    </div>
  );
}
