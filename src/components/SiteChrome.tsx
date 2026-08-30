import { CursorGlow } from "./CursorGlow";
import { Navbar } from "./Navbar";
import { SmoothScroll } from "./SmoothScroll";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorGlow />
      <SmoothScroll />
      <Navbar />
      {children}
    </>
  );
}
