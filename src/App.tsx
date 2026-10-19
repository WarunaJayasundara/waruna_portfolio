import { lazy, Suspense } from 'react';
import { useRouter, Link } from './lib/router';
import { useReveal } from './lib/useReveal';
import { getProject } from './data/projects';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Liftoff } from './sections/Liftoff';
import { Services } from './sections/Services';
import { FloatingWhatsapp, CursorRing } from './components/FloatingActions';
import { Work } from './sections/Work';
import { Approach } from './sections/Approach';
import { Expertise } from './sections/Expertise';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

// Case studies are split into their own chunk; the home page never waits on them.
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

export default function App() {
  const { path } = useRouter();
  useReveal(path);

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
          <Suspense fallback={<div className="min-h-screen" />}>
            <CaseStudy project={project} />
          </Suspense>
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
      <FloatingWhatsapp />
      <CursorRing />
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
