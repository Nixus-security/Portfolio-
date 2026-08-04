"use client";

import { useRef, useState, type ReactNode } from "react";
import GlitchTag from "./GlitchTag";

interface TerminalButtonProps {
  href: string;
  command: string;
  icon?: ReactNode;
  emphasis?: "primary" | "secondary";
  target?: string;
  rel?: string;
}

export default function TerminalButton({
  href,
  command,
  icon,
  emphasis = "secondary",
  target,
  rel,
}: TerminalButtonProps) {
  const isPrimary = emphasis === "primary";
  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    setFlash(false);
    requestAnimationFrame(() => setFlash(true));
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => setFlash(false), 550);
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg border px-5 py-3.5 font-mono text-[15px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 active:translate-y-0 active:duration-75 ${
        flash ? "animate-btn-flash" : ""
      } ${
        isPrimary
          ? "border-gold/40 bg-gradient-to-b from-card to-ink text-cream hover:border-gold hover:shadow-[0_0_28px_-4px_rgba(155,93,229,0.7)]"
          : "border-line bg-ink text-muted hover:border-gold/50 hover:text-cream hover:shadow-[0_0_20px_-6px_rgba(155,93,229,0.45)]"
      }`}
    >
      <span className="terminal-scanlines pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span
        className={`relative transition-colors duration-300 ${
          isPrimary ? "text-gold" : "text-faint group-hover:text-gold"
        }`}
      >
        $
      </span>

      {icon && (
        <span className="relative flex items-center transition-transform duration-300 group-hover:scale-110 group-hover:text-gold">
          {icon}
        </span>
      )}

      <GlitchTag className="relative">{command}</GlitchTag>

      <span className="animate-caret relative ml-0.5 inline-block h-[1.1em] w-[0.5ch] translate-y-[0.05em] bg-gold" />
    </a>
  );
}
