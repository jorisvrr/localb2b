import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowRightIcon } from "./ui/Icons";

/**
 * Werkwijze in vijf stappen, als genummerde lijst naast een foto.
 *
 * Het doel van deze sectie is één specifieke angst wegnemen: dat je je met
 * een onderhoudspartij voor jaren vastlegt. Daarom begint de reeks met een
 * gesprek en eindigt hij met evalueren en bijsturen — niet met "tekenen".
 */
export function Process() {
  const { process, cta } = siteConfig;

  return (
    <section id="werkwijze" className="section bg-paper">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="label-section">{process.eyebrow}</p>
            <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
              {process.title}
            </h2>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              {process.subtitle}
            </p>

            <ol className="mt-9 border-t border-line">
              {process.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-line py-5"
                >
                  <span className="label-xs pt-1 text-accent-dark tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.08rem] leading-snug">{step.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a href={cta.primary.href} className="btn btn-primary mt-8">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-[3px] lg:block">
            <Image
              src={process.image}
              alt={process.imageAlt}
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
