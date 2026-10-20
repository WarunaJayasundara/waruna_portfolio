import { useEffect } from 'react';
import { startMotion } from './lib/motion';
import { useRouter, Link } from './lib/router';
import { useReveal } from './lib/useReveal';
import { getProject } from './data/projects';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Liftoff } from './sections/Liftoff';
import { Services } from './sections/Services';
import { FloatingWhatsapp } from './components/FloatingActions';
import { Work } from './sections/Work';
import { Approach } from './sections/Approach';
import { Expertise } from './sections/Expertise';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
// Case studies are small (about 2 kB) and pre-rendered, so they ship in the main
// bundle; this keeps hydration in a single pass on every page.
import CaseStudy from './pages/CaseStudy';

export default function App() {
  const { path } = useRouter();
  useReveal(path);
  // Smooth scrolling and scroll-linked effects start only after React has
  // attached to the pre-rendered HTML, so the first render matches exactly.
  useEffect(() => startMotion(), []);

  const match = path.match(/^\/work\/([\w-]+)\/?$/);
  const project = match ? getProject(match[1]) : undefined;
  const isHome = path === '/' || path === '/index.html';

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {isHome ? (
          <>
            <Hero />
            <Liftoff />
            <Work />
            <Services />
            <Approach />
            <Expertise />
            <About />
            <Experience />
            <Contact />
          </>
        ) : project?.caseStudy ? (
          <CaseStudy project={project} />
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center pt-28">
      <p className="label">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em]">This page doesn’t exist.</h1>
      <Link to="/" className="mt-8 text-signal underline underline-offset-4">Back to the portfolio</Link>
    </section>
  );
}
