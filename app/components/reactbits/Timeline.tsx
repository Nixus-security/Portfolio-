"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchTag from "./GlitchTag";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineItem {
  type: "exp" | "edu";
  title: string;
  place: string;
  period: string;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stubRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<HTMLDivElement[][]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    if (progressRef.current) {
      gsap.set(progressRef.current, { height: "0%" });
      const progressTween = gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
      if (progressTween.scrollTrigger) triggers.push(progressTween.scrollTrigger);
    }

    if (cometRef.current) {
      gsap.set(cometRef.current, { top: "0%" });
      const cometTween = gsap.to(cometRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
      if (cometTween.scrollTrigger) triggers.push(cometTween.scrollTrigger);
    }

    items.forEach((it, i) => {
      const card = cardRefs.current[i];
      const node = nodeRefs.current[i];
      const stub = stubRefs.current[i];
      const tags = tagRefs.current[i] ?? [];
      if (!card) return;

      const fromX = i % 2 === 0 ? -32 : 32;
      const fromRotate = i % 2 === 0 ? -3 : 3;
      gsap.set(card, { opacity: 0, x: fromX, rotate: fromRotate });
      if (stub) gsap.set(stub, { scaleX: 0 });
      if (tags.length) gsap.set(tags, { opacity: 0, y: 6 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      });
      revealTl
        .to(card, { opacity: 1, x: 0, rotate: 0, duration: 0.7, ease: "power3.out" })
        .to(stub ? stub : {}, { scaleX: 1, duration: 0.35, ease: "power2.out" }, "-=0.45")
        .to(tags.length ? tags : [], { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }, "-=0.25");
      if (revealTl.scrollTrigger) triggers.push(revealTl.scrollTrigger);

      if (node) {
        const st = ScrollTrigger.create({
          trigger: node,
          start: "top 62%",
          end: "bottom 45%",
          onEnter: () => gsap.to(node, { scale: 1.35, duration: 0.35, ease: "back.out(3)" }),
          onLeaveBack: () => gsap.to(node, { scale: 1, duration: 0.3 }),
        });
        triggers.push(st);
      }

      const onEnterHover = () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          borderColor: "rgba(155, 93, 229, 0.6)",
          boxShadow: "0 12px 30px rgba(155, 93, 229, 0.18)",
          duration: 0.3,
          ease: "power2.out",
        });
        if (node) {
          gsap.to(node, { scale: 1.6, boxShadow: "0 0 18px rgba(155, 93, 229, 0.9)", duration: 0.3 });
        }
        if (stub) gsap.to(stub, { backgroundColor: "#9b5de5", height: 2, duration: 0.25 });
      };
      const onLeaveHover = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          borderColor: "#2d1050",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power2.out",
        });
        if (node) {
          gsap.to(node, { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3 });
        }
        if (stub) gsap.to(stub, { backgroundColor: "#2d1050", height: 1, duration: 0.25 });
      };

      card.addEventListener("mouseenter", onEnterHover);
      card.addEventListener("mouseleave", onLeaveHover);

      triggers.push({
        kill: () => {
          card.removeEventListener("mouseenter", onEnterHover);
          card.removeEventListener("mouseleave", onLeaveHover);
        },
      } as unknown as ScrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-line lg:left-1/2" />
      <div
        ref={progressRef}
        className="absolute left-4 top-0 w-px -translate-x-1/2 bg-gold shadow-[0_0_8px_rgba(155,93,229,0.8)] lg:left-1/2"
      />
      <div
        ref={cometRef}
        className="absolute left-4 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_14px_4px_rgba(155,93,229,0.7)] lg:left-1/2"
      />

      <div className="flex flex-col gap-12">
        {items.map((it, i) => {
          const isLeft = i % 2 === 0;
          tagRefs.current[i] = [];
          return (
            <div
              key={`${it.type}-${it.title}`}
              className="grid grid-cols-[2rem_1fr] items-start gap-5 lg:grid-cols-[1fr_2rem_1fr] lg:gap-8"
            >
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className={`col-start-1 z-10 mt-1.5 flex h-3.5 w-3.5 items-center justify-center justify-self-center rounded-full border lg:col-start-2 ${
                  it.type === "exp" ? "border-gold bg-gold" : "border-gold-soft/70 bg-ink"
                }`}
              />

              <div
                className={`relative col-start-2 ${isLeft ? "lg:col-start-1" : "lg:col-start-3"}`}
              >
                <div
                  ref={(el) => {
                    stubRefs.current[i] = el;
                  }}
                  className={`hidden h-px w-8 bg-line lg:block ${
                    isLeft
                      ? "absolute right-[-2rem] top-6 origin-right"
                      : "absolute left-[-2rem] top-6 origin-left"
                  }`}
                />

                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`w-full cursor-default rounded-xl border border-line bg-card/70 p-4 lg:max-w-sm ${
                    isLeft ? "lg:ml-auto" : "lg:mr-auto"
                  }`}
                >
                  <div className="font-mono text-[0.68rem] uppercase tracking-widest text-gold">
                    {it.period}
                  </div>
                  <h4 className="mt-1.5 font-display text-base font-medium text-cream">{it.title}</h4>
                  <div className="text-sm text-muted">{it.place}</div>
                  {it.tags && it.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.tags.map((p, ti) => (
                        <div
                          key={p}
                          ref={(el) => {
                            if (el) tagRefs.current[i][ti] = el;
                          }}
                        >
                          <GlitchTag className="cursor-default rounded-md border border-line bg-ink px-2.5 py-1 text-[0.72rem] text-cream/70 transition-colors hover:border-gold/50 hover:text-gold">
                            {p}
                          </GlitchTag>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
