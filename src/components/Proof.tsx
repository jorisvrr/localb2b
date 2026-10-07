import { siteConfig } from "@/config/site";
import { QuoteMarkIcon } from "./ui/Icons";

/**
 * Referenties: citaten plus het type opdrachtgevers.
 *
 * Twee bewuste keuzes:
 *  1. GEEN klantlogo's. Logo's van bedrijven die geen klant zijn is
 *     misleiding; logo's van echte klanten mogen alleen met schriftelijke
 *     toestemming. Daarom "type opdrachtgever"-kaarten.
 *  2. Citaten op functie en organisatietype in plaats van op persoonsnaam.
 *     Dat is in B2B gebruikelijker, geloofwaardiger, en er staat geen
 *     verzonnen persoon met naam en toenaam op de site.
 */
export function Proof() {
  const { proof, demoMode, demoLabels } = siteConfig;

  if (!proof.show) return null;

  return (
    <section id="referenties" className="section bg-stone">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label-section">{proof.eyebrow}</p>
          <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
            {proof.title}
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
            {proof.subtitle}
          </p>
        </div>

        {demoMode && (
          <p className="mt-6 max-w-3xl rounded-[3px] border-l-[3px] border-accent bg-paper px-4 py-3 text-[0.89rem] leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              {demoLabels.proofNoticeTitle}
            </strong>{" "}
            {demoLabels.proofNoticeBody}
          </p>
        )}

        <ul className="reveal mt-9 grid gap-5 lg:grid-cols-3">
          {proof.testimonials.map((item) => (
            <li key={item.role + item.place} className="card flex flex-col p-6">
              <QuoteMarkIcon className="h-5 w-5 text-accent" />
              <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink">
                {item.text}
              </blockquote>
              <footer className="mt-5 border-t border-line pt-4">
                <p className="text-[0.92rem] font-semibold text-brand">{item.role}</p>
                <p className="mt-0.5 text-[0.86rem] text-muted">
                  {item.org} · {item.place}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        {/* Type opdrachtgever — in plaats van logo's */}
        <div className="mt-10 border-t border-line pt-8">
          <p className="label-xs text-muted">Type opdrachtgevers</p>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {proof.clientTypes.map((type) => (
              <li key={type.label}>
                <p className="font-display text-[1rem] font-semibold tracking-tight text-brand">
                  {type.label}
                </p>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">
                  {type.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
