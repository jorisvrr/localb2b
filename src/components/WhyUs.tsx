import { siteConfig } from "@/config/site";

/**
 * USP's op een donker vlak — het enige donkere blok vóór de aanvraagsectie,
 * zodat de pagina halverwege even van toon wisselt.
 *
 * Geschreven rond de twijfel die iemand écht heeft bij het uitbesteden van
 * onderhoud: raak ik de regie kwijt, zit ik ergens aan vast, en krijg ik
 * steeds dezelfde mensen over de vloer?
 *
 * Certificeringen verschijnen hier alleen als ze in site.ts zijn ingevuld.
 * Standaard is die lijst leeg en staat er dus niets.
 */
export function WhyUs() {
  const { whyUs, claims } = siteConfig;

  return (
    <section className="section bg-brand text-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label-section label-section-light">{whyUs.eyebrow}</p>
          <h2 className="mt-5 text-[1.8rem] leading-tight text-white md:text-[2.25rem]">
            {whyUs.title}
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-white/75">
            {whyUs.intro}
          </p>
        </div>

        <ul className="reveal mt-10 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.reasons.map((reason) => (
            <li key={reason.title} className="bg-brand p-6 md:p-7">
              <h3 className="text-[1.08rem] leading-snug text-white">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-white/70">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>

        {claims.certifications.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {claims.certifications.map((cert) => (
              <li
                key={cert}
                className="label-xs rounded-[3px] border border-white/20 px-3 py-2 text-[0.62rem] text-white/80"
              >
                {cert}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
