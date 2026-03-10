import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { TechStack } from '../components/TechStack'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { Services } from '../components/Approach'
import { Contact } from '../components/Contact'
import { CursorGlow } from '../components/CursorGlow'
import { SmoothScroll } from '../components/SmoothScroll'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <CursorGlow />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
    </>
  )
}
