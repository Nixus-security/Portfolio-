"use client";

import { useRef, useState } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#01";

interface GlitchTagProps {
  children: string;
  className?: string;
}

export default function GlitchTag({ children, className = "" }: GlitchTagProps) {
  const [display, setDisplay] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(
        children
          .split("")
          .map((char, idx) => {
            if (char === " " || char === ":") return char;
            if (idx < iteration) return children[idx];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(children);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={className}>
      {display}
    </span>
  );
}
