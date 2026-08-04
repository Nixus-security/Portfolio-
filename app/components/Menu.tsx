"use client";

import BubbleMenu from "./reactbits/BubbleMenu";

const items = [
  {
    label: "accueil",
    href: "#top",
    ariaLabel: "Accueil",
    rotation: -8,
    hoverStyles: { bgColor: "#9b5de5", textColor: "#0b0016" },
  },
  {
    label: "projets",
    href: "#projets",
    ariaLabel: "Projets",
    rotation: 8,
    hoverStyles: { bgColor: "#9b5de5", textColor: "#0b0016" },
  },
  {
    label: "à propos",
    href: "#apropos",
    ariaLabel: "À propos",
    rotation: 8,
    hoverStyles: { bgColor: "#b07ef0", textColor: "#0b0016" },
  },
  {
    label: "skills",
    href: "#competences",
    ariaLabel: "Compétences",
    rotation: -8,
    hoverStyles: { bgColor: "#b07ef0", textColor: "#0b0016" },
  },
  {
    label: "parcours",
    href: "#parcours",
    ariaLabel: "Parcours",
    rotation: 8,
    hoverStyles: { bgColor: "#7c3acd", textColor: "#ede0ff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#9b5de5", textColor: "#0b0016" },
  },
];

export function Menu() {
  return (
    <BubbleMenu
      logo={null}
      useFixedPosition
      menuBg="#10001a"
      menuContentColor="#ede0ff"
      items={items}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.1}
    />
  );
}
