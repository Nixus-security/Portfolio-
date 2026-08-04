import { profile } from "../data";
import AnimatedContent from "./reactbits/AnimatedContent";
import ShinyText from "./reactbits/ShinyText";
import TypewriterText from "./reactbits/TypewriterText";
import GlitchTag from "./reactbits/GlitchTag";

const facts = [
  { k: "Domaine", v: "Cybersécurité & Web" },
  { k: "Mobilité", v: "Permis B" },
  { k: "Langues", v: "FR · RU · EN" },
];

export function About() {
  return (
    <section id="apropos" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.4fr_0.6fr]">
        <AnimatedContent distance={40}>
          <div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              <ShinyText
                text="Polyvalent, de la sécurité au service."
                speed={3}
                color="#9b5de5"
                shineColor="#ffffff"
                className="font-display text-4xl font-semibold sm:text-5xl"
              />
            </h2>
          </div>
        </AnimatedContent>

        <AnimatedContent distance={40} delay={0.05}>
          <div className="animate-terminal-glow relative overflow-hidden rounded-2xl border border-line bg-ink">
            <div className="terminal-scanlines pointer-events-none absolute inset-0" />

            <div className="relative flex items-center gap-2 border-b border-line bg-card/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[0.65rem] text-faint">whoami.sh</span>
            </div>

            <div className="relative p-6 sm:p-7">
              <div className="font-mono text-xs text-gold">$ whoami</div>
              <p className="mt-3 font-mono text-sm leading-relaxed text-cream/80">
                <TypewriterText text={profile.bio} speed={14} startDelay={300} />
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {facts.map((f) => (
                  <GlitchTag
                    key={f.k}
                    className="cursor-default rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[0.7rem] text-cream/90 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    {`${f.k.toLowerCase()}: ${f.v}`}
                  </GlitchTag>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
