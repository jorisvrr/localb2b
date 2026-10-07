import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ArrowRightIcon, PhoneIcon } from "./ui/Icons";

/**
 * Hero.
 *
 * Beantwoordt vier vragen binnen één scherm: wat doen jullie, voor wie, waar,
 * en wat moet ik nu doen. De doelgroepregel staat er bewust letterlijk bij —
 * een facility manager wil binnen een seconde zien of hij goed zit, en "voor
 * bedrijven" is daarvoor te vaag.
 *
 * Opzet is een asymmetrisch raster met de tekst links en een rustige foto
 * rechts, op een lichte ondergrond. Geen donker vlak met tekst eroverheen:
 * dat doet de elektricien-demo, en het leest hier te luid.
 */
export function Hero() {
  const { hero, cta, business, serviceArea } = siteConfig;

  return (
    <section className="border-b border-line bg-stone">
      <div className="container-x">
        <div className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="label-section">{hero.eyebrow}</p>

            <h1 className="mt-6 text-[2.05rem] leading-[1.1] sm:text-[2.5rem] lg:text-[3.05rem]">
              {hero.title}
            </h1>

            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              {hero.subtitle}
            </p>

            {/* Voor wie — scheelt de verkeerde bezoeker een scroll */}
            <p className="mt-5 border-l-2 border-accent pl-4 text-[0.92rem] leading-relaxed text-muted">
              <span className="font-semibold text-ink">Voor </span>
              {hero.audience}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={cta.primary.href} className="btn btn-primary">
                {cta.primary.label}
                <ArrowRightIcon />
              </a>
              <a href={cta.secondary.href} className="btn btn-secondary">
                {cta.secondary.label}
              </a>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-muted">
              <a
                href={telHref}
                className="flex items-center gap-2 font-semibold text-brand hover:text-accent-dark"
              >
                <PhoneIcon className="h-4 w-4 text-accent" />
                {business.phone.display}
              </a>
              <span>{business.hoursSummary}</span>
              <span className="hidden sm:inline">{serviceArea.regionLong}</span>
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] lg:aspect-[5/6]">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
