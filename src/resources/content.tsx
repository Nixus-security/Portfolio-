import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Anthony",
  lastName: "Nagul",
  name: `Anthony Nagul`,
  role: "Développeur Front-end & Cybersécurité",
  avatar: "/images/avatar.jpg",
  email: "anthonynag08@gmail.com",
  location: "Europe/Paris",
  languages: ["Français", "Anglais"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Abonnez-vous à la newsletter d'Anthony</>,
  description: <>Des articles sur le développement web et la cybersécurité</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Nixus-security",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/anthony-nagul",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:anthonynag08@gmail.com`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `Portfolio – Anthony Nagul`,
  description: `Portfolio d'Anthony Nagul — Développeur front-end et étudiant en cybersécurité basé à Lyon.`,
  headline: <>Interfaces web,<br />conçues avec soin.</>,
  featured: {
    display: true,
    title: <>Projet récent — TechFlow</>,
    href: "/work/techflow-agence-digitale",
  },
  subline: (
    <>
      Je suis Anthony, développeur front-end et étudiant en cybersécurité à{" "}
      <strong>Ynov Lyon</strong>. Je conçois des sites et applications modernes
      avec ambition, curiosité et une attention particulière portée au détail.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – Anthony Nagul`,
  description: `Découvrez Anthony Nagul, développeur front-end et étudiant en cybersécurité à Lyon.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Actuellement en Bachelor Cybersécurité à Ynov Lyon, je partage mon temps entre l'étude
        des systèmes d'information et la conception d'interfaces web modernes. Ce double parcours
        m'apprend à penser un produit dans son entièreté — le visible comme l'invisible. Je crois
        aux interfaces qui respectent l'utilisateur : rapides, claires, sûres.
      </>
    ),
  },
  work: {
    display: true,
    title: "Projets & Expériences",
    experiences: [
      {
        company: "Freelance",
        timeframe: "2024 – Présent",
        role: "Développeur Front-end",
        achievements: [
          <>
            Conception et développement de sites vitrines, landing pages SaaS et dashboards pour
            des clients variés, avec une attention particulière portée à la performance et au design.
          </>,
          <>
            Intégration de formulaires de contact (EmailJS), animations CSS avancées et interfaces
            responsives mobile-first.
          </>,
          <>
            Automatisation de workflows clients via scripts Python pour gagner en efficacité et
            en fiabilité.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Formation",
    institutions: [
      {
        name: "Ynov Lyon",
        description: <>Bachelor Cybersécurité — Sécurité des systèmes d'information, pentest, développement web sécurisé.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences techniques",
    skills: [
      {
        title: "Front-end",
        description: (
          <>
            HTML, CSS, JavaScript, React, TypeScript — interfaces modernes, accessibles et
            performantes. Animations CSS et Three.js pour des expériences interactives.
          </>
        ),
        tags: [
          { name: "HTML/CSS", icon: "html" },
          { name: "JavaScript", icon: "javascript" },
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
        ],
        images: [],
      },
      {
        title: "Cybersécurité",
        description: (
          <>
            Analyse applicative, tests d'intrusion, recommandations de sécurité. Formation active
            sur les systèmes Linux/Windows, réseaux et cryptographie.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Linux", icon: "linux" },
        ],
        images: [],
      },
      {
        title: "Outils & Workflow",
        description: (
          <>
            Git & GitHub pour le versionnement, VS Code, WSL, Python pour les automatisations et
            scripts. Next.js pour les projets full-stack.
          </>
        ),
        tags: [
          { name: "Git", icon: "git" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Python", icon: "python" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Écrits sur le web et la sécurité",
  description: `Articles et réflexions d'Anthony Nagul sur le développement front-end et la cybersécurité`,
};

const work: Work = {
  path: "/work",
  label: "Travaux",
  title: `Projets – Anthony Nagul`,
  description: `Projets de développement web et design par Anthony Nagul`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Galerie – Anthony Nagul`,
  description: `Une collection de visuels et inspirations`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/vertical-2.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-3.jpg", alt: "image", orientation: "vertical" },
  ],
};

export { about, blog, gallery, home, newsletter, person, social, work };
