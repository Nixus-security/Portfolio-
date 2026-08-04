import Image from "next/image";
import { projects, otherProjects } from "../data";
import AnimatedContent from "./reactbits/AnimatedContent";
import ShinyText from "./reactbits/ShinyText";
import SpotlightCard from "./reactbits/SpotlightCard";
import StarBorder from "./reactbits/StarBorder";

function BrowserFrame({
  image,
  title,
  accent,
}: {
  image: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent}, transparent 70%)` }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-card-2 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line bg-ink/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="ml-3 truncate font-mono text-[0.7rem] text-faint">{title}</span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-card to-ink">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projets" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <AnimatedContent distance={40}>
        <h2 className="font-display text-4xl font-semibold sm:text-5xl">
          <ShinyText
            text="Des sites que j'ai conçus & livrés."
            speed={3}
            color="#9b5de5"
            shineColor="#ffffff"
            className="font-display text-4xl font-semibold sm:text-5xl"
          />
        </h2>
      </AnimatedContent>

      <div className="mt-16 space-y-24">
        {featured.map((p, i) => (
          <div
            key={p.slug}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <AnimatedContent distance={60} direction="horizontal" reverse={i % 2 === 1}>
              <BrowserFrame image={p.image} title={p.title} accent={p.accent} />
            </AnimatedContent>

            <AnimatedContent distance={40} delay={0.1}>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {p.subtitle} · {p.year}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-cream sm:text-3xl">
                  {p.title}
                </h3>

                <p className="mt-4 leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-card px-3 py-1.5 font-mono text-[0.7rem] text-cream/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {p.live && (
                    <StarBorder as="a" href={p.live} variant="solid" color="#b07ef0" speed="4s">
                      <span>Voir le site ↗</span>
                    </StarBorder>
                  )}
                  {p.github && (
                    <StarBorder as="a" href={p.github} color="#6b4f8a" speed="6s">
                      <span>Code source</span>
                    </StarBorder>
                  )}
                  {!p.live && !p.github && (
                    <span className="inline-flex items-center gap-2 rounded-[20px] border border-line px-6 py-3.5 text-sm font-medium text-muted">
                      Démo sur demande
                    </span>
                  )}
                </div>
              </div>
            </AnimatedContent>
          </div>
        ))}
      </div>

      {/* Other projects */}
      <AnimatedContent distance={30}>
        <h3 className="mt-28 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Autres réalisations
        </h3>
      </AnimatedContent>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {otherProjects.map((p, i) => (
          <AnimatedContent key={p.title} distance={30} delay={i * 0.05}>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <SpotlightCard className="flex h-full flex-col !p-6 transition-colors group-hover:border-gold/40">
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-lg font-medium text-cream">{p.title}</h4>
                  <span className="font-mono text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded font-mono text-[0.68rem] text-gold/70">
                      #{s}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </a>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
