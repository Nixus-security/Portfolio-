export const profile = {
  name: "Anthony Nagul",
  firstName: "Anthony",
  lastName: "Nagul",
  role: "Étudiant en Cybersécurité",
  tagline: "Cybersécurité · Développement Web · Relation client",
  location: "Sainte-Foy-lès-Lyon, 69110",
  email: "anthonynag08@gmail.com",
  phone: "06 67 69 09 72",
  permis: "Permis B",
  github: "https://github.com/Nixus-security",
  linkedin: "https://www.linkedin.com/in/anthony-nagul-167767285/",
  cv: "/CV.pdf",
  bio: "Étudiant en Bachelor Cybersécurité à Ynov Campus Lyon, je recherche un stage en cybersécurité. À l'aise aussi bien en développement web que dans la relation client, j'ai acquis une expérience variée dans la vente, l'accueil et le service — ce qui me permet de m'adapter rapidement à tout type de poste.",
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  image: string;
  accent: string;
  github?: string;
  live?: string;
  featured: boolean;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "brasserie-le-ste-foy",
    title: "Brasserie Le Ste Foy",
    subtitle: "Site vitrine — restaurant",
    description:
      "Site vitrine complet pour une brasserie de cuisine française à Sainte-Foy-lès-Lyon. Réservation en ligne, carte interactive, avis Google & TripAdvisor mis en avant, design sombre et élégant. Conçu et développé de bout en bout.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Réservation"],
    image: "/projects/brasserie.png",
    accent: "#d12631",
    github: "https://github.com/Nixus-security/Brasserie-Le-Ste-Foy",
    featured: true,
    year: "2025",
  },
  {
    slug: "klt",
    title: "KLT — Keep Leveling Today",
    subtitle: "Plateforme sport & nutrition",
    description:
      "Plateforme de programmes sportifs, nutritionnels et professionnels prêts à l'emploi, conçus pour faire progresser l'utilisateur séance après séance. Catalogue de programmes, espace compte, panier et paiement intégré.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "E-commerce"],
    image: "/projects/klt.png",
    accent: "#e11d2a",
    featured: true,
    year: "2025",
  },
];

export const otherProjects = [
  {
    title: "reco-facial-detection",
    description: "Détection et reconnaissance faciale en Python (vision par ordinateur).",
    stack: ["Python", "OpenCV"],
    github: "https://github.com/Nixus-security/reco-facial-detection",
  },
  {
    title: "Fiscali",
    description: "Outil web autour de la fiscalité / calculs financiers.",
    stack: ["HTML", "CSS", "JS"],
    github: "https://github.com/Nixus-security",
  },
  {
    title: "Local-Chat",
    description: "Application de chat en local développée en Python.",
    stack: ["Python"],
    github: "https://github.com/Nixus-security",
  },
  {
    title: "forum-fitnation",
    description: "Forum communautaire fitness développé en Go (projet Ynov).",
    stack: ["Go", "SQLite"],
    github: "https://github.com/Nixus-security",
  },
];

export const skills = {
  tech: [
    { name: "HTML / CSS / JS", level: "Avancé" },
    { name: "Next.js & TypeScript", level: "Avancé" },
    { name: "Python", level: "Intermédiaire" },
    { name: "Go", level: "Intermédiaire" },
    { name: "Burp Suite", level: "Sécurité offensive" },
    { name: "Git & Linux", level: "Quotidien" },
    { name: "IA / Prompt", level: "Outillage" },
  ],
  soft: ["Communication", "Adaptabilité", "Relation client", "Innovation", "Autonomie"],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Russe", level: "Courant" },
    { name: "Anglais", level: "Intermédiaire" },
  ],
};

export const experiences = [
  {
    role: "Serveur & Barman",
    place: "Pasino Grand — Partouche",
    period: "2025 · 1 mois",
    points: ["Service en salle", "Gestion du bar", "Encaissement"],
  },
  {
    role: "Agent d'accueil",
    place: "Basic-Fit",
    period: "2024 · 2 mois",
    points: ["Accueil des membres", "Gestion du club", "Sécurité"],
  },
  {
    role: "Vendeur",
    place: "Armand Thiéry / Micromania",
    period: "2022 – 2023 · 5 mois",
    points: ["Conseil client", "Ventes additionnelles", "Mise en rayon"],
  },
];

export const education = [
  {
    title: "Bachelor 1 — Cybersécurité",
    place: "Ynov Campus Lyon",
    period: "2025 – 2026",
  },
  {
    title: "Bac Pro Commerce & Vente",
    place: "Lycée Carrel",
    period: "2020 – 2023",
  },
];
