# Portfolio — Anthony Nagul

> Portfolio professionnel basé sur [magic-portfolio](https://github.com/once-ui-system/magic-portfolio) par Once UI.

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer en local

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

### 3. Déployer sur Vercel (recommandé)

1. Va sur [vercel.com](https://vercel.com) et connecte ton GitHub
2. Importe le repo `Portfolio-`
3. Laisse les paramètres par défaut (détection automatique Next.js)
4. Clique **Deploy** — c'est tout ✅

---

## ✏️ Personnaliser le contenu

Tout le contenu est dans **`src/resources/content.tsx`** :
- Nom, rôle, email, réseaux sociaux
- Texte de la page d'accueil et de la page About
- Skills et formations

### Ajouter un projet

Crée un fichier `.mdx` dans `src/app/work/projects/` :

```mdx
---
title: "Nom du projet"
publishedAt: "2026-01-01"
summary: "Description courte."
images:
  - "/images/projects/mon-projet/cover.jpg"
team:
  - name: "Anthony Nagul"
    role: "Développeur Front-end"
    avatar: "/images/avatar.jpg"
    linkedIn: "https://linkedin.com/in/anthony-nagul"
link: "https://lien-demo.fr"
---

## Contenu en Markdown...
```

### Remplacer la photo de profil

Remplace le fichier `public/images/avatar.jpg` par ta photo (même nom, format JPG).

### Ajouter des captures projets

Dépose tes images dans `public/images/projects/` et mets à jour le frontmatter `images:` dans les fichiers `.mdx`.

---

## 🎨 Changer le thème

Dans `src/resources/once-ui.config.ts`, modifie le bloc `style` :

```ts
const style = {
  theme: "system",   // "dark" | "light" | "system"
  brand: "cyan",     // couleur principale
  accent: "red",     // couleur d'accent
  border: "playful", // "rounded" | "playful" | "conservative" | "sharp"
};
```

---

## 📁 Structure

```
src/
├── resources/
│   ├── content.tsx          ← Tout le contenu (nom, bio, projets, skills)
│   └── once-ui.config.ts    ← Thème, routes, SEO
├── app/
│   └── work/projects/       ← Fichiers .mdx de chaque projet
└── public/images/           ← Photos, covers projets, avatar
```

---

© 2026 Anthony Nagul — Lyon, France
