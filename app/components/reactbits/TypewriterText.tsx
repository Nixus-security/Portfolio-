"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  cursorClassName?: string;
}

export default function TypewriterText({
  text,
  className = "",
  speed = 16,
  startDelay = 250,
  cursorClassName = "",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const delayTimer = setTimeout(() => {
          let i = 0;
          const interval = setInterval(() => {
            i += 1;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
          }, speed);
        }, startDelay);

        return () => clearTimeout(delayTimer);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, startDelay]);

  return (
    <span ref={spanRef} className={className}>
      {displayed}
      <span
        aria-hidden
        className={`animate-caret ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-gold align-middle ${cursorClassName}`}
      />
    </span>
  );
}
