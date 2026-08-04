"use client";

import React from "react";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
  variant?: "solid" | "outline";
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "#9b5de5",
  speed = "6s",
  thickness = 1,
  variant = "outline",
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";
  const isSolid = variant === "solid";

  return (
    <Component
      className={`group relative inline-block overflow-hidden rounded-[20px] transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className={
          isSolid
            ? "relative z-1 rounded-[20px] bg-gradient-to-br from-[#b07ef0] via-[#9b5de5] to-[#7c3acd] px-[26px] py-[14px] text-center text-[15px] font-semibold text-ink shadow-[0_0_0_1px_rgba(155,93,229,0.5),0_8px_20px_-6px_rgba(123,58,205,0.55)] transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(176,126,240,0.8),0_10px_32px_-4px_rgba(155,93,229,0.75)]"
            : "relative z-1 rounded-[20px] border border-gold/25 bg-gradient-to-b from-ink to-card px-[24px] py-[14px] text-center text-[15px] font-medium text-cream shadow-[0_0_0_1px_rgba(155,93,229,0.05)] transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold group-hover:shadow-[0_0_20px_-6px_rgba(155,93,229,0.6)]"
        }
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
