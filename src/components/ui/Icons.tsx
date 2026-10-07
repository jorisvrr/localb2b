/**
 * Inline SVG-iconen. Bewust geen icon-library: dit scheelt een dependency,
 * een netwerkverzoek en kilobytes JavaScript op mobiel.
 *
 * De dienst-iconen zijn rustig en lijnvoerig gehouden — passend bij een
 * gevestigd servicebedrijf, niet bij een app.
 */
type IconProps = { className?: string };

const base = "shrink-0";

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.8" aria-hidden="true">
      <path d="M6.6 3.5h-2a1.7 1.7 0 0 0-1.7 1.9A16.8 16.8 0 0 0 18.6 21a1.7 1.7 0 0 0 1.9-1.7v-2a1.7 1.7 0 0 0-1.5-1.7 10 10 0 0 1-2.2-.5 1.7 1.7 0 0 0-1.8.4l-.8.8a13.4 13.4 0 0 1-5-5l.8-.8a1.7 1.7 0 0 0 .4-1.8 10 10 0 0 1-.5-2.2 1.7 1.7 0 0 0-1.7-1.5Z" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.6 6.6 8.4 5.9 8.4-5.9" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.9" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="2.1" aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.7" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.9" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.9" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.9" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function QuoteMarkIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.2 5.5C6 7 4.2 9.7 4.2 13.1c0 3.2 1.8 5.4 4.4 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.8-3.3 3.7-4.3l-2.6-1.7Zm9.4 0c-3.2 1.5-5 4.2-5 7.6 0 3.2 1.8 5.4 4.4 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.8-3.3 3.7-4.3l-2.6-1.7Z" />
    </svg>
  );
}

/* ── Dienst-symbolen ────────────────────────────────────────────────────── */

/** Periodiek onderhoud — terugkerend ritme. */
export function CycleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <path d="M20.2 11.4a8.2 8.2 0 0 0-14-5.1L3.8 8.6" />
      <path d="M3.8 12.6a8.2 8.2 0 0 0 14 5.1l2.4-2.3" />
      <path d="M3.8 4.4v4.2h4.2M20.2 19.6v-4.2H16" />
    </svg>
  );
}

/** Storingen en reparaties. */
export function WrenchIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <path d="M14.4 6.3a3.9 3.9 0 0 1 5.3-3.6l-2.6 2.6 1.6 1.6 2.6-2.6a3.9 3.9 0 0 1-5 5.1L5.9 20.4a2 2 0 0 1-2.8-2.8l11-11a3.9 3.9 0 0 1 .3-.3Z" />
    </svg>
  );
}

/** Facilitaire ondersteuning — mensen op locatie. */
export function SupportIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <circle cx="9" cy="8" r="3.1" />
      <path d="M3.4 20.2v-1.4a4.4 4.4 0 0 1 4.4-4.4h2.4a4.4 4.4 0 0 1 4.4 4.4v1.4" />
      <path d="M16.6 5.4a3.1 3.1 0 0 1 0 5.6" />
      <path d="M17.8 14.6a4.4 4.4 0 0 1 2.8 4.1v1.5" />
    </svg>
  );
}

/** Inspecties — checklist. */
export function ClipboardIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <path d="M9 4.4H7.2a1.8 1.8 0 0 0-1.8 1.8v13a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8v-13a1.8 1.8 0 0 0-1.8-1.8H15" />
      <rect x="9" y="2.6" width="6" height="3.6" rx="1" />
      <path d="m8.8 12.4 1.7 1.7 3.4-3.6" />
      <path d="M8.8 17.4h6.4" />
    </svg>
  );
}

/** Werkplek- en pandondersteuning. */
export function WorkplaceIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <path d="M2.8 20.4h18.4" />
      <path d="M4.6 20.4v-6.2h14.8v6.2" />
      <path d="M7.4 14.2V9.6h9.2v4.6" />
      <path d="M12 9.6V5.2M8.6 5.2h6.8" />
    </svg>
  );
}

/** Projectmatig werk — afgebakend, met begin en eind. */
export function ProjectIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="4.6" width="18" height="14.8" rx="1.5" />
      <path d="M3 9.2h18" />
      <path d="M7 13h4.4M7 16.2h7.6" />
      <circle cx="17.4" cy="14.6" r="2.2" />
    </svg>
  );
}

/** Contractonderhoud — afspraken op papier. */
export function ContractIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...line} strokeWidth="1.6" aria-hidden="true">
      <path d="M13.6 3.2H6.9a1.8 1.8 0 0 0-1.8 1.8v14a1.8 1.8 0 0 0 1.8 1.8h10.2a1.8 1.8 0 0 0 1.8-1.8V8.4l-5.3-5.2Z" />
      <path d="M13.4 3.4v5.1h5.4" />
      <path d="M8.6 13.6c1.5-1.4 2.5.9 3.8-.2 1.1-.9 2 1.2 3.2.4" />
    </svg>
  );
}

/** Beeldmerk: twee verschoven vlakken — eenvoudig en vervangbaar. */
export function Wordmark({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="3" fill="currentColor" />
      <path d="M9 24.5 15.6 11h3.3l-6.6 13.5H9Z" fill="#fff" />
      <path d="M19.4 29 26 15.5h3.3L22.7 29h-3.3Z" fill="#A87A4C" />
    </svg>
  );
}
