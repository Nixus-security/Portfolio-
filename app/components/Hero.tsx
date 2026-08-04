"use client";

import dynamic from "next/dynamic";
import { profile } from "../data";
import {
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiGo,
  SiLinux,
  SiGit,
  SiBurpsuite,
  SiKalilinux,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiJavascript,
} from "react-icons/si";
import { FiArrowRight, FiMail } from "react-icons/fi";
import AnimatedContent from "./reactbits/AnimatedContent";
import BlurText from "./reactbits/BlurText";
import GradientText from "./reactbits/GradientText";
import LogoLoop from "./reactbits/LogoLoop";
import TerminalButton from "./reactbits/TerminalButton";

const Lanyard = dynamic(() => import("./reactbits/Lanyard"), { ssr: false });

const goldColors = ["#b07ef0", "#9b5de5", "#7c3acd", "#b07ef0"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden pt-32 pb-20 sm:min-h-[860px] sm:pt-40 sm:pb-28">
      {/* Lanyard overlay — déplaçable partout */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 bottom-72 z-30">
        <Lanyard
          position={[0, 0, 13]}
          gravity={[0, -40, 0]}
          fov={20}
          transparent
          frontImage="/portrait.jpg"
          imageFit="cover"
        />
      </div>

      <div className="relative z-40 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <div className="mt-7 font-display text-5xl font-bold leading-[0.95] tracking-tight text-cream sm:text-7xl">
            <BlurText text={profile.firstName} animateBy="letters" delay={60} className="block" />
            <GradientText colors={goldColors} animationSpeed={7} className="!max-w-none">
              <span className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
                {profile.lastName}
              </span>
            </GradientText>
          </div>

          <AnimatedContent distance={30} delay={0.1}>
            <p className="mt-6 max-w-md font-mono text-sm uppercase tracking-[0.18em] text-muted">
              {profile.tagline}
            </p>
          </AnimatedContent>

          <AnimatedContent distance={30} delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Étudiant en <span className="text-cream">Bachelor Cybersécurité</span> à Ynov
              Campus Lyon. Je conçois et développe des{" "}
              <span className="text-cream">sites web modernes</span> et j'explore la{" "}
              <span className="text-cream">sécurité offensive</span>.
            </p>
          </AnimatedContent>

          <AnimatedContent distance={30} delay={0.2} className="relative z-40">
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <TerminalButton
                href="#projets"
                command="voir-mes-projets"
                emphasis="primary"
                icon={<FiArrowRight />}
              />
              <TerminalButton href="#contact" command="me-contacter" icon={<FiMail />} />
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-3 font-mono text-xs uppercase tracking-widest text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                ↓ CV (PDF)
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* logo loop */}
      <div className="relative z-40 mt-64 overflow-hidden py-4">
        <LogoLoop
          speed={190}
          logoHeight={40}
          gap={56}
          fadeOut
          fadeOutColor="#000000"
          pauseOnHover
          logos={[
            { node: <SiNextdotjs className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Next.js" /> },
            { node: <SiTypescript className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="TypeScript" /> },
            { node: <SiPython className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Python" /> },
            { node: <SiGo className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Go" /> },
            { node: <SiReact className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="React" /> },
            { node: <SiTailwindcss className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Tailwind CSS" /> },
            { node: <SiHtml5 className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="HTML5" /> },
            { node: <SiJavascript className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="JavaScript" /> },
            { node: <SiBurpsuite className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Burp Suite" /> },
            { node: <SiKalilinux className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Kali Linux" /> },
            { node: <SiLinux className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Linux" /> },
            { node: <SiGit className="text-[40px] text-gold/70 hover:text-gold transition-colors" aria-label="Git" /> },
          ]}
        />
      </div>
    </section>
  );
}
