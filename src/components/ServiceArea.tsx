import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { MapPinIcon, PhoneIcon } from "./ui/Icons";

/**
 * Werkgebied. Dubbele functie: het kwalificeert de bezoeker ("val ik
 * hieronder?") en het levert de plaatsnamen waar lokale zoekopdrachten op
 * binnenkomen — zonder dat daar aparte SEO-pagina's voor nodig zijn.
 */
export function ServiceArea() {
  const { serviceArea, business } = siteConfig;

  return (
    <section id="werkgebied" className="section bg-paper">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="label-section">{serviceArea.eyebrow}</p>
            <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
              {serviceArea.regionLong}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              {serviceArea.intro}
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
              {serviceArea.places.map((place) => (
                <li
                  key={place}
                  className="flex items-center gap-2 text-[0.92rem] text-ink"
                >
                  <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                  {place}
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[0.9rem] leading-relaxed text-muted">
              {serviceArea.note}
            </p>
            <a href={telHref} className="btn btn-outline mt-5">
              <PhoneIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
              {business.phone.display}
            </a>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[3px] lg:block">
            <Image
              src="/img/bedrijfspand.jpg"
              alt="Kantoorgebouw van onderaf gezien tegen een heldere lucht"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
