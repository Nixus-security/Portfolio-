import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

const baseURL: string = "https://portfolio-anthony-nagul.netlify.app";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": false,
  "/gallery": false,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

const style: StyleConfig = {
  theme: "system",
  neutral: "gray",
  brand: "cyan",
  accent: "red",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: true,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 80,
    x: 50,
    y: -50,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
  },
  dots: {
    display: true,
    opacity: 20,
    size: "2",
    color: "brand-on-background-weak",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    width: "1",
    height: "1",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "8",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "",
  effects: {
    mask: {
      cursor: false,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: false,
      opacity: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: false,
      opacity: 0,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 0,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 0,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: "Anthony Nagul",
  description: home.description,
  email: "anthonynag08@gmail.com",
};

const sameAs: SameAsConfig = {
  threads: "",
  linkedin: "https://linkedin.com/in/anthony-nagul",
  discord: "",
};

const socialSharing: SocialSharingConfig = {
  display: false,
  platforms: {
    x: false,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  baseURL,
  dataStyle,
  display,
  effects,
  fonts,
  mailchimp,
  protectedRoutes,
  routes,
  sameAs,
  schema,
  socialSharing,
  style,
};
