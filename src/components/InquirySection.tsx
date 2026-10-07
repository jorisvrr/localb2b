import { siteConfig } from "@/config/site";
import { mailHref, telHref } from "@/lib/contact";
import { InquiryForm } from "./InquiryForm";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "./ui/Icons";

/**
 * De aanvraagsectie: links de context en het directe contact, rechts het
 * formulier. Op mobiel staat het formulier bovenaan — wie hier komt, komt
 * voor het formulier.
 *
 * Zowel "Plan een kennismaking" als "Offerte aanvragen" wijzen hierheen. Dat
 * is bewust hetzelfde formulier: het verschil zit in de intentie van de
 * bezoeker, niet in de vragen die je moet stellen.
 */
export function InquirySection() {
  const { inquiry, business, demoMode, demoLabels } = siteConfig;

  return (
    <section id="aanvraag" className="section scroll-mt-20 bg-stone">
      <div className="container-x">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="label-section">{inquiry.eyebrow}</p>
            <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
              {inquiry.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{inquiry.subtitle}</p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="label-xs text-muted">{inquiry.directContactTitle}</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={telHref}
                    className="-my-1 flex min-h-11 items-center gap-3 py-1 font-display text-[1.1rem] font-semibold text-brand hover:text-accent-dark"
                  >
                    <PhoneIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
                    {business.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={mailHref}
                    className="-my-1 flex min-h-11 items-center gap-3 py-1 text-[0.95rem] text-ink hover:text-accent-dark"
                  >
                    <MailIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
                    {business.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[0.95rem] text-muted">
                  <ClockIcon className="h-[1.05rem] w-[1.05rem] text-line-strong" />
                  {business.hoursSummary}
                </li>
                {business.address.showOnSite && (
                  <li className="flex gap-3 text-[0.95rem] text-muted">
                    <MapPinIcon className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-line-strong" />
                    <span>
                      {business.address.street}, {business.address.postalCode}{" "}
                      {business.address.city}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {demoMode && (
              <p className="mt-7 rounded-[3px] border-l-[3px] border-accent bg-paper px-4 py-3 text-[0.88rem] leading-relaxed text-muted">
                {demoLabels.formNotice}
              </p>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
