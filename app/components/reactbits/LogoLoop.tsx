"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  ReactNode,
  CSSProperties,
} from "react";
import "./LogoLoop.css";

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

type LogoItem =
  | { node: ReactNode; href?: string; ariaLabel?: string; title?: string }
  | { src: string; alt?: string; href?: string; title?: string };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number | string;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Logo loop",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover) return 0;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);
  const effectiveHoverSpeedRef = useRef(effectiveHoverSpeed);
  effectiveHoverSpeedRef.current = effectiveHoverSpeed;

  const targetVelocity = direction === "left" ? Math.abs(speed) : -Math.abs(speed);
  const targetVelocityRef = useRef(targetVelocity);
  targetVelocityRef.current = targetVelocity;

  // Measure sequence width and calculate copy count
  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect();
    const sw = rect?.width ?? 0;
    if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      const needed = Math.ceil(containerWidth / sw) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, needed));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    if (seqRef.current) ro.observe(seqRef.current);
    return () => ro.disconnect();
  }, [updateDimensions, logos, gap, logoHeight]);

  // Animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const rafRef = { id: 0 };
    let lastTs: number | null = null;
    let offset = 0;
    let velocity = 0;

    const animate = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.max(0, ts - lastTs) / 1000;
      lastTs = ts;

      const hovered = isHoveredRef.current;
      const hoverSpd = effectiveHoverSpeedRef.current;
      const tgt = hovered && hoverSpd !== undefined ? hoverSpd : targetVelocityRef.current;
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocity += (tgt - velocity) * ease;

      if (seqWidth > 0) {
        offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      rafRef.id = requestAnimationFrame(animate);
    };

    rafRef.id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.id);
  }, [seqWidth]);

  const cssVars = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": typeof logoHeight === "number" ? `${logoHeight}px` : logoHeight,
    ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
  };

  const rootClass = [
    "logoloop",
    "logoloop--horizontal",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...(cssVars as CSSProperties),
    ...style,
  };

  const renderItem = (item: LogoItem, key: string) => {
    const isNode = "node" in item;
    const content = isNode ? (
      <span className="logoloop__node">{(item as { node: ReactNode }).node}</span>
    ) : (
      <img
        src={(item as { src: string }).src}
        alt={(item as { src: string; alt?: string }).alt ?? ""}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    const anyItem = item as Record<string, unknown>;
    const inner = item.href ? (
      <a
        className="logoloop__link"
        href={item.href}
        aria-label={(anyItem.ariaLabel as string | undefined) ?? item.title ?? "logo link"}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : (
      content
    );

    return (
      <li className="logoloop__item" key={key} role="listitem">
        {inner}
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => { if (effectiveHoverSpeed !== undefined) { isHoveredRef.current = true; setIsHovered(true); } }}
        onMouseLeave={() => { if (effectiveHoverSpeed !== undefined) { isHoveredRef.current = false; setIsHovered(false); } }}
      >
        {Array.from({ length: copyCount }, (_, ci) => (
          <ul
            className="logoloop__list"
            key={`copy-${ci}`}
            role="list"
            aria-hidden={ci > 0}
            ref={ci === 0 ? seqRef : undefined}
          >
            {logos.map((item, ii) => renderItem(item, `${ci}-${ii}`))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoop;
