import { experiences, education } from "../data";
import AnimatedContent from "./reactbits/AnimatedContent";
import ShinyText from "./reactbits/ShinyText";
import SpotlightCard from "./reactbits/SpotlightCard";
import Timeline, { type TimelineItem } from "./reactbits/Timeline";

const timelineItems: TimelineItem[] = [
  ...experiences.map((e) => ({
    type: "exp" as const,
    title: e.role,
    place: e.place,
    period: e.period,
    tags: e.points,
    year: parseInt(e.period, 10),
  })),
  ...education.map((e) => ({
    type: "edu" as const,
    title: e.title,
    place: e.place,
    period: e.period,
    year: parseInt(e.period, 10),
  })),
]
  .sort((a, b) => b.year - a.year)
  .map(({ year, ...rest }) => rest);

export function Parcours() {
  return (
    <section id="parcours" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <AnimatedContent distance={40}>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            <ShinyText
              text="Expérience & formation."
              speed={3}
              color="#9b5de5"
              shineColor="#ffffff"
              className="font-display text-4xl font-semibold sm:text-5xl"
            />
          </h2>
        </AnimatedContent>

        <div className="mt-14">
          <Timeline items={timelineItems} />
        </div>

        <AnimatedContent distance={30} delay={0.1}>
          <SpotlightCard className="mx-auto mt-14 max-w-xl !border-gold/25" spotlightColor="rgba(155, 93, 229, 0.25)">
            <p className="text-center font-display text-cream">
              En recherche d'un{" "}
              <span className="text-gold">stage en cybersécurité</span> compatible avec mes
              études.
            </p>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
}
