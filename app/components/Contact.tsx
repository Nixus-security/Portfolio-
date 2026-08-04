import { profile } from "../data";
import AnimatedContent from "./reactbits/AnimatedContent";
import ShinyText from "./reactbits/ShinyText";
import TerminalContact, { type ContactChannel } from "./reactbits/TerminalContact";

const channels: ContactChannel[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, online: true },
  { label: "Téléphone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "GitHub", value: "Nixus-security", href: profile.github },
  { label: "LinkedIn", value: "Anthony Nagul", href: profile.linkedin },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-36">
        <AnimatedContent distance={40} delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            <ShinyText
              text="Travaillons ensemble."
              speed={3}
              color="#9b5de5"
              shineColor="#ffffff"
              className="font-display text-5xl font-semibold sm:text-7xl"
            />
          </h2>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Un poste, un projet web ou une question ? Je réponds rapidement.
          </p>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.15}>
          <div className="mt-12">
            <TerminalContact channels={channels} />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
