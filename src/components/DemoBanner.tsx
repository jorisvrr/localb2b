import { siteConfig } from "@/config/site";

/**
 * Smalle balk bovenaan zolang `demoMode: true` staat in site.ts.
 * Maakt direct duidelijk dat dit een voorbeeldsite is met een verzonnen
 * bedrijf. Zet demoMode op false en de balk verdwijnt overal.
 */
export function DemoBanner() {
  if (!siteConfig.demoMode) return null;

  return (
    <div className="bg-brand-dark text-white">
      <p className="container-x py-2 text-center text-[0.78rem] leading-snug sm:text-[0.82rem]">
        <span className="label-xs text-accent">
          {siteConfig.demoLabels.bannerTitle}
        </span>{" "}
        <span className="text-white/70">
          — {siteConfig.business.name} {siteConfig.demoLabels.bannerBody}
        </span>
      </p>
    </div>
  );
}
