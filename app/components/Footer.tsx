import { profile } from "../data";
import GlitchTag from "./reactbits/GlitchTag";

const nav = [
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "github", href: profile.github },
  { label: "linkedin", href: profile.linkedin },
  { label: "email", href: `mailto:${profile.email}` },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="hairline absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-card font-display text-xs font-bold text-gold">
                AN
              </span>
              <span className="font-display text-sm font-medium text-cream">{profile.name}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2.5 sm:items-center">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-gold"
              >
                <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 sm:items-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-gold"
              >
                <span className="text-faint">$</span>
                <GlitchTag>{`open ${s.label}`}</GlitchTag>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none mt-12 select-none overflow-hidden">
          <div className="text-gradient-gold whitespace-nowrap text-center font-display text-[13vw] font-bold leading-none tracking-tight opacity-[0.13] sm:text-[9rem]">
            {profile.firstName} {profile.lastName}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <span className="font-mono text-[0.65rem] text-faint">
            © {new Date().getFullYear()} {profile.name} · Next.js · TypeScript · Tailwind
          </span>
          <span className="font-mono text-[0.65rem] text-faint">
            <span className="text-gold">$</span> exit 0
          </span>
          <a
            href="#"
            aria-label="Retour en haut"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-card text-gold transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_16px_rgba(155,93,229,0.3)]"
          >
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
