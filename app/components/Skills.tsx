import { skills } from "../data";
import AnimatedContent from "./reactbits/AnimatedContent";
import ShinyText from "./reactbits/ShinyText";
import TechOrbit, { type OrbitItem } from "./reactbits/TechOrbit";

const orbitItems: OrbitItem[] = skills.tech.map((s) => ({
  name: s.name,
  level: s.level,
  tier: s.level === "Avancé" ? "inner" : "outer",
}));

export function Skills() {
  return (
    <section id="competences" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <AnimatedContent distance={40}>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            <ShinyText
              text="Une stack tech au service de projets concrets."
              speed={3}
              color="#9b5de5"
              shineColor="#ffffff"
              className="font-display text-4xl font-semibold sm:text-5xl"
            />
          </h2>
        </AnimatedContent>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Techniques
            </h3>
            <div className="mt-5">
              <TechOrbit items={orbitItems} />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Savoir-être</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {skills.soft.map((s, i) => (
                  <AnimatedContent key={s} distance={20} delay={i * 0.04}>
                    <span className="rounded-full border border-line bg-card px-4 py-2 text-sm text-cream/90">
                      {s}
                    </span>
                  </AnimatedContent>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Langues</h3>
              <div className="mt-5 space-y-3">
                {skills.languages.map((l, i) => (
                  <AnimatedContent key={l.name} distance={20} delay={i * 0.05}>
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="font-display text-cream">{l.name}</span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted">
                        {l.level}
                      </span>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
