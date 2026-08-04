"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiGo,
  SiBurpsuite,
  SiGit,
  SiLinux,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const techIcons: Record<string, IconType[]> = {
  "HTML / CSS / JS": [SiHtml5, SiCss, SiJavascript],
  "Next.js & TypeScript": [SiNextdotjs, SiTypescript],
  Python: [SiPython],
  Go: [SiGo],
  "Burp Suite": [SiBurpsuite],
  "Git & Linux": [SiGit, SiLinux],
  "IA / Prompt": [FaBrain],
};

export interface OrbitItem {
  name: string;
  level: string;
  tier: "inner" | "outer";
}

interface TechOrbitProps {
  items: OrbitItem[];
}

export default function TechOrbit({ items }: TechOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const flowTweens = useRef<Partial<Record<number, gsap.core.Tween>>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let size = container.clientWidth || 440;

    const inner = items.filter((it) => it.tier === "inner");
    const outer = items.filter((it) => it.tier === "outer");

    const meta = items.map((it) => {
      const list = it.tier === "inner" ? inner : outer;
      const idx = list.indexOf(it);
      const baseAngle = (idx / list.length) * Math.PI * 2 - Math.PI / 2;
      return { baseAngle, dir: it.tier === "inner" ? 1 : -1, ratio: it.tier === "inner" ? 0.25 : 0.42 };
    });

    const state = { t: 0 };
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(state, {
      t: 1,
      duration: 100,
      ease: "none",
      onUpdate: () => {
        const rot = state.t * Math.PI * 2;
        const cx = size / 2;
        const cy = size / 2;
        items.forEach((it, i) => {
          const node = nodeRefs.current[i];
          const line = lineRefs.current[i];
          const m = meta[i];
          const angle = m.baseAngle + rot * m.dir;
          const r = size * m.ratio;
          const bob = Math.sin(state.t * Math.PI * 2 * 3 + i * 1.7) * (size * 0.012);
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r + bob;

          if (node) gsap.set(node, { x, y });
          if (line) gsap.set(line, { attr: { x2: cx + x, y2: cy + y } });
        });
      },
    });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          nodeRefs.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.07, ease: "back.out(2.2)" }
        );
        gsap.fromTo(
          coreRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" }
        );
        gsap.fromTo(
          lineRefs.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.05 }
        );
      },
    });

    const onEnter = () => tl.timeScale(0.15);
    const onLeave = () => tl.timeScale(1);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      size = container.clientWidth || size;
    };
    window.addEventListener("resize", onResize);

    return () => {
      tl.kill();
      st.kill();
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [items]);

  useEffect(() => {
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      gsap.to(node, {
        scale: hovered === i ? 1.2 : 1,
        opacity: hovered === null || hovered === i ? 1 : 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      const isActive = hovered === i;
      gsap.to(line, {
        stroke: isActive ? "#ede0ff" : "#2d1050",
        strokeWidth: isActive ? 2 : 1,
        opacity: hovered === null || isActive ? 1 : 0.35,
        duration: 0.3,
      });

      if (isActive) {
        gsap.set(line, { strokeDasharray: "5 4", strokeDashoffset: 0 });
        flowTweens.current[i] = gsap.to(line, {
          strokeDashoffset: -18,
          duration: 0.7,
          ease: "none",
          repeat: -1,
        });
      } else if (flowTweens.current[i]) {
        flowTweens.current[i].kill();
        delete flowTweens.current[i];
        gsap.set(line, { strokeDasharray: "none" });
      }
    });

    if (coreRef.current) {
      gsap.to(coreRef.current, { scale: hovered !== null ? 1.1 : 1, duration: 0.3, ease: "power2.out" });
    }
  }, [hovered]);

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        {items.map((_, i) => (
          <line
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="#2d1050"
            strokeWidth={1}
          />
        ))}
      </svg>

      <div
        ref={coreRef}
        className="animate-core-pulse absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-card font-mono text-[0.6rem] uppercase tracking-widest text-gold"
      >
        stack
      </div>

      {items.map((it, i) => {
        const size = it.tier === "inner" ? 68 : 54;
        return (
          <div
            key={it.name}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 top-1/2 flex cursor-default flex-col items-center justify-center rounded-full border border-line bg-ink text-cream/80 shadow-[0_0_16px_rgba(155,93,229,0.08)] transition-colors hover:border-gold/60"
            style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
          >
            <span className="flex items-center gap-0.5 text-gold">
              {(techIcons[it.name] ?? []).slice(0, 2).map((Icon, idx) => (
                <Icon key={idx} className={it.tier === "inner" ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden />
              ))}
            </span>

            {hovered === i && (
              <div className="pointer-events-none absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-card px-2.5 py-1 font-mono text-[0.65rem] text-cream shadow-lg">
                {it.name} <span className="text-faint">· {it.level}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
