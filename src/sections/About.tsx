import { profile } from '../data/profile';
import { SectionHeader } from '../components/ui';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-24 sm:py-32">
      <SectionHeader index="05" label="About" title={<span id="about-title">An early-career engineer <span className="text-mute">with real systems to show.</span></span>} />

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-pretty lg:col-span-7" data-reveal>
          <p>
            I’m Waruna, a software engineer from Sri Lanka finishing a Bachelor of ICT (Hons) in Software Systems at the
            University of Kelaniya. I like problems where getting the details right is the whole job: measurement, money,
            records people depend on.
          </p>
          <p className="text-mute">
            My final-year project, HelaIQ, is a complete learning platform with an adaptive test, brain games and an
            exam-readiness prediction. Alongside it I built two client systems that are now live: a point-of-sale system
            for a mobile accessories shop and a deed-registration tracker for a notarial office.
          </p>
          <p className="text-mute">
            During my internship at Beaver Creation I worked across requirements, implementation, testing and sprint
            coordination with designers, QA and stakeholders. At university I served as Vice President of the IT
            Students’ Association and as a batch representative, I am a member of the university Taekwondo team, and I
            received University Colours in 2024.
          </p>
          <p className="text-mute">
            I use AI tools like Claude, Copilot and Cursor for coding, debugging and documentation, and I treat their output the way I treat my own:
            something to read, test and verify before it ships.
          </p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
          <div className="rounded-md border border-line bg-ink-2/60 p-6">
            <p className="label">Education</p>
            <p className="mt-4 text-lg leading-snug font-medium">{profile.education.degree}</p>
            <p className="mt-2 text-mute">{profile.education.school}</p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Specialisation</dt>
                <dd>{profile.education.specialisation}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Graduation</dt>
                <dd>{profile.education.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Final-year project</dt>
                <dd>HelaIQ</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
