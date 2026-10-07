import { siteConfig } from "@/config/site";
import { mailHref, telHref } from "@/lib/contact";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "./ui/Icons";

/**
 * Slot-CTA op het donkere merkvlak. Herhaalt de primaire conversie en houdt
 * bellen en mailen ernaast — wie tot hier leest, weet inmiddels genoeg om
 * zelf te kiezen hoe hij contact opneemt.
 */
export function FinalCta() {
  const { finalCta, cta, business } = siteConfig;

  return (
    <section className="bg-brand text-white">
      <div className="container-x py-14 md:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="max-w-2xl">
            <h2 className="text-[1.7rem] leading-tight text-white md:text-[2.1rem]">
              {finalCta.title}
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">{finalCta.body}</p>
          </div>

          <div className="flex flex-col gap-2.5 lg:shrink-0">
            <a href={cta.primary.href} className="btn btn-light">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a href={telHref} className="btn btn-outline-light flex-1">
                <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
                {business.phone.display}
              </a>
              <a href={mailHref} className="btn btn-outline-light flex-1">
                <MailIcon className="h-[1.05rem] w-[1.05rem]" />
                {cta.mail.labelShort}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
