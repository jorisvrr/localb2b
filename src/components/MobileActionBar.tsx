"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ArrowRightIcon, PhoneIcon } from "./ui/Icons";

/**
 * Vaste actiebalk onderaan op mobiel.
 *
 * Keuze: BELLEN | PLAN KENNISMAKING, met de kennismaking als gevulde, bredere
 * knop.
 *
 * De andere optie was "Offerte | Plan kennismaking", maar die twee leiden naar
 * hetzelfde formulier en zouden elkaar dus beconcurreren om dezelfde klik.
 * Bellen is een ánder kanaal, kost op mobiel één tik, en past bij de bezoeker
 * die nu iets wil regelen in plaats van een traject starten. De primaire
 * conversie blijft visueel dominant: gevuld in de merkkleur en anderhalf keer
 * zo breed als de belknop.
 *
 * - De body heeft padding-bottom (globals.css), dus de balk dekt nooit content af.
 * - Zodra het aanvraagformulier zelf in beeld is, verdwijnt de balk: anders zit
 *   hij in de weg bij het invullen op een klein scherm.
 */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);
  const { cta, business } = siteConfig;

  useEffect(() => {
    const target = document.querySelector("#aanvraag");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-20% 0px -35% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/97 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={telHref}
          className="btn btn-outline flex-1 !gap-1.5 !px-2 !text-[0.9rem]"
          aria-label={`${cta.call.label}: ${business.phone.display}`}
        >
          <PhoneIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
          {cta.call.labelShort}
        </a>
        {/* Primaire conversie: gevuld én breder */}
        <a
          href={cta.primary.href}
          className="btn btn-primary flex-[1.55] !gap-1.5 !px-2 !text-[0.9rem]"
        >
          {cta.primary.labelShort}
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
