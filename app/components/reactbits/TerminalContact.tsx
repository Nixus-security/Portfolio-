"use client";

import { useEffect, useRef, useState } from "react";
import GlitchTag from "./GlitchTag";

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  online?: boolean;
}

interface TerminalContactProps {
  channels: ContactChannel[];
}

const CMD_LIST = "./contact --list";
const CMD_SEND = "send message";

export default function TerminalContact({ channels }: TerminalContactProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [typedList, setTypedList] = useState("");
  const [rowsShown, setRowsShown] = useState(0);
  const [typedSend, setTypedSend] = useState("");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        let i = 0;
        const t1 = setInterval(() => {
          i += 1;
          setTypedList(CMD_LIST.slice(0, i));
          if (i >= CMD_LIST.length) {
            clearInterval(t1);

            channels.forEach((_, r) => {
              timers.push(setTimeout(() => setRowsShown(r + 1), 250 + r * 160));
            });

            timers.push(
              setTimeout(() => {
                let j = 0;
                const t2 = setInterval(() => {
                  j += 1;
                  setTypedSend(CMD_SEND.slice(0, j));
                  if (j >= CMD_SEND.length) {
                    clearInterval(t2);
                  }
                }, 45);
                intervals.push(t2);
              }, 350 + channels.length * 160)
            );
          }
        }, 40);
        intervals.push(t1);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [channels]);

  return (
    <div
      ref={rootRef}
      className="animate-terminal-glow relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line bg-ink text-left"
    >
      <div className="terminal-scanlines pointer-events-none absolute inset-0" />

      <div className="relative flex items-center gap-2 border-b border-line bg-card/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[0.65rem] text-faint">contact.sh</span>
      </div>

      <div className="relative p-6 font-mono text-sm sm:p-7">
        <div className="text-gold">
          <span className="text-faint">$ </span>
          {typedList}
          {typedList.length < CMD_LIST.length && (
            <span className="animate-caret ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-gold align-middle" />
          )}
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          {channels.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`group -mx-2 flex flex-wrap items-baseline gap-x-3 rounded-md px-2 py-1.5 transition-all duration-500 hover:bg-card ${
                i < rowsShown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="text-faint">[{i + 1}]</span>
              <span className="w-20 text-cream transition-colors group-hover:text-gold">
                {c.label.toLowerCase()}
              </span>
              <GlitchTag className="text-muted transition-colors group-hover:text-cream">
                {c.value}
              </GlitchTag>
              {c.online && (
                <span className="flex items-center gap-1.5 text-[0.7rem] text-[#28c840]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
                  online
                </span>
              )}
              <span className="ml-auto text-gold opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>

        <div className={`mt-5 transition-opacity duration-300 ${typedSend ? "opacity-100" : "opacity-0"}`}>
          <span className="text-faint">$ </span>
          <a href={channels[0]?.href} className="text-gold underline-offset-4 hover:underline">
            {typedSend}
          </a>
          <span className="animate-caret ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-gold align-middle" />
        </div>
      </div>
    </div>
  );
}
