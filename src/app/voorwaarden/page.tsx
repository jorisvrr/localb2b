import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Algemene voorwaarden — ${siteConfig.business.name}`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Algemene voorwaarden">
      <h2>Offertes en opdrachten</h2>
      <p>
        Offertes zijn vrijblijvend en dertig dagen geldig. De genoemde prijzen
        zijn exclusief btw, tenzij anders vermeld. Meerwerk voeren we alleen uit
        na schriftelijk akkoord van de opdrachtgever.
      </p>
      <h2>Onderhoudscontracten</h2>
      <p>
        Een onderhoudscontract wordt aangegaan voor de in de overeenkomst
        genoemde periode en daarna stilzwijgend verlengd, tenzij anders
        afgesproken. De opzegtermijn staat in de overeenkomst vermeld.
      </p>
      <h2>Uitvoering</h2>
      <p>
        Werkzaamheden worden in overleg ingepland. Voor toegang tot de locatie
        maken we vooraf afspraken over sleutels, alarmcodes en aanwezigheid. Als
        tijdens het werk blijkt dat aanvullende werkzaamheden nodig zijn,
        melden we dat voordat we verdergaan.
      </p>
      <h2>Werkzaamheden buiten kantooruren</h2>
      <p>
        Werk buiten de reguliere openingstijden is in overleg mogelijk. Hiervoor
        geldt een afwijkend tarief, dat vooraf in de offerte wordt opgenomen.
      </p>
      <h2>Aansprakelijkheid</h2>
      <p>
        Onze aansprakelijkheid is beperkt tot het bedrag dat in het betreffende
        geval door onze verzekering wordt uitgekeerd.
      </p>
      <h2>Betaling</h2>
      <p>
        Betaling binnen dertig dagen na factuurdatum. Bij contractonderhoud
        factureren we periodiek, volgens het ritme dat in de overeenkomst staat.
      </p>
      <h2>Contact</h2>
      <p>
        {siteConfig.business.legalName}, KvK {siteConfig.business.kvk}.
      </p>
    </LegalPage>
  );
}
