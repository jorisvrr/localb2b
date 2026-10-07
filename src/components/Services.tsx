import { siteConfig } from "@/config/site";
import type { ServiceIcon } from "@/config/site";
import {
  ArrowRightIcon,
  ClipboardIcon,
  ContractIcon,
  CycleIcon,
  ProjectIcon,
  SupportIcon,
  WorkplaceIcon,
  WrenchIcon,
} from "./ui/Icons";

/**
 * Diensten als brede genummerde rijen in plaats van een kaartenraster.
 *
 * Reden: een B2B-bezoeker scant op "zit mijn situatie ertussen" en leest dan
 * één item écht. Brede rijen geven ruimte aan de bullets die dat beantwoorden,
 * waar een raster van kleine kaarten de tekst zou afknijpen. Het geeft de
 * pagina bovendien een rustiger, meer documentachtig ritme — en het is een
 * andere opbouw dan de andere niche-demo's gebruiken.
 */
const icons: Record<ServiceIcon, (p: { className?: string }) => React.ReactElement> = {
  cycle: CycleIcon,
  wrench: WrenchIcon,
  support: SupportIcon,
  clipboard: ClipboardIcon,
  workplace: WorkplaceIcon,
  project: ProjectIcon,
  contract: ContractIcon,
};

export function Services() {
  const { services, servicesIntro, cta } = siteConfig;

  return (
    <section id="diensten" className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label-section">{servicesIntro.eyebrow}</p>
            <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
              {servicesIntro.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              {servicesIntro.subtitle}
            </p>
          </div>
          <a href={cta.primary.href} className="btn btn-outline">
            {cta.primary.label}
            <ArrowRightIcon />
          </a>
        </div>

        <ul className="reveal mt-10 border-t border-line">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.id}
                id={service.id}
                className="scroll-mt-28 border-b border-line py-7 md:py-8"
              >
                <div className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-8 lg:grid-cols-[auto_1.1fr_1fr]">
                  {/* Nummer + icoon */}
                  <div className="flex items-center gap-4 md:w-24 md:flex-col md:items-start md:gap-5">
                    <span className="label-xs text-muted tnum">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-7 w-7 text-accent-dark" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[1.2rem] leading-snug md:text-[1.3rem]">
                        {service.title}
                      </h3>
                      <span
                        className={`label-xs rounded-[3px] px-2 py-1 text-[0.58rem] ${
                          service.rhythm === "doorlopend"
                            ? "bg-brand text-white"
                            : "bg-stone-dark text-muted"
                        }`}
                      >
                        {service.rhythm === "doorlopend" ? "Doorlopend" : "Eenmalig"}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-lg text-[0.97rem] leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>

                  <ul className="grid gap-2 self-center text-[0.9rem] leading-snug text-muted sm:grid-cols-2 lg:grid-cols-1">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span
                          className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
