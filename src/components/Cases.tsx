import { siteConfig } from "@/config/site";

/**
 * Praktijkvoorbeelden, opgezet als caseblad: situatie → vraag → aanpak →
 * resultaat.
 *
 * Bewust zónder foto's. Een stockfoto van een kantoorpand bewijst niets en
 * suggereert dat het om die specifieke locatie gaat. De structuur zelf is hier
 * het bewijs: een lezer die vier van deze blokken naast elkaar legt, ziet of
 * je begrijpt wat er bij hem speelt.
 *
 * ⚠️ DEMO: de cases zijn verzonnen. Zie de comment bij `cases` in site.ts voor
 * de twee regels die ertoe doen bij het vervangen — toestemming voor
 * klantnamen, en geen verzonnen percentages.
 */
export function Cases() {
  const { cases, casesIntro, demoMode, demoLabels } = siteConfig;

  return (
    <section id="cases" className="section bg-stone">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="label-section">{casesIntro.eyebrow}</p>
            <h2 className="mt-5 text-[1.8rem] leading-tight md:text-[2.25rem]">
              {casesIntro.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              {casesIntro.subtitle}
            </p>
          </div>
          {demoMode && (
            <span className="label-xs rounded-[3px] border border-line bg-paper px-3 py-2 text-[0.6rem] text-muted">
              {demoLabels.casesBadge}
            </span>
          )}
        </div>

        {demoMode && (
          <p className="mt-6 max-w-3xl rounded-[3px] border-l-[3px] border-accent bg-paper px-4 py-3 text-[0.89rem] leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              {demoLabels.casesNoticeTitle}
            </strong>{" "}
            {demoLabels.casesNoticeBody}
          </p>
        )}

        <div className="reveal mt-9 grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="card card-marked flex flex-col p-6 md:p-7">
              <p className="label-xs text-accent-dark">
                {item.client} · {item.place}
              </p>
              <h3 className="mt-3 text-[1.18rem] leading-snug">{item.title}</h3>

              <dl className="mt-5 flex flex-1 flex-col gap-4 text-[0.92rem] leading-relaxed">
                <div>
                  <dt className="label-xs text-[0.6rem] text-muted">Situatie</dt>
                  <dd className="mt-1.5 text-muted">{item.situation}</dd>
                </div>
                <div>
                  <dt className="label-xs text-[0.6rem] text-muted">Vraag</dt>
                  <dd className="mt-1.5 text-ink">
                    <span className="italic">“{item.question}”</span>
                  </dd>
                </div>
                <div>
                  <dt className="label-xs text-[0.6rem] text-muted">Aanpak</dt>
                  <dd className="mt-1.5">
                    <ul className="space-y-1.5 text-muted">
                      {item.approach.map((step) => (
                        <li key={step} className="flex gap-2.5">
                          <span
                            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="mt-auto border-t border-line pt-4">
                  <dt className="label-xs text-[0.6rem] text-muted">Resultaat</dt>
                  <dd className="mt-1.5 text-ink">{item.result}</dd>
                </div>
              </dl>

              <ul className="flex flex-wrap gap-1.5 pt-5">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[3px] bg-stone px-2.5 py-1 text-[0.76rem] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
