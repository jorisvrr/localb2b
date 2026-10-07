# MODUS demo 05 — Lokale zakelijke dienstverlening (B2B)

Demo-website voor een **lokaal B2B-servicebedrijf**: onderhoud, storingen en
facilitaire ondersteuning voor bedrijven. Bedoeld voor koude acquisitie in de
Nederlandse markt — één sterk uitgewerkte site die je naar lokale
dienstverleners, onderhoudsbedrijven, facilitaire bedrijven en gespecialiseerde
B2B-aannemers kunt sturen als "dit is het type website en lead flow dat we voor
uw bedrijf kunnen bouwen".

> ⚠️ **Westvliet Bedrijfsdiensten is een verzonnen bedrijf.** Alle referenties,
> cases, cijfers, adres- en contactgegevens zijn demo-content. Zolang
> `demoMode: true` staat, is dat op elke pagina zichtbaar gemarkeerd.

Next.js 16 · TypeScript · Tailwind v4 · geen runtime-dependencies buiten React.

---

## Positionering

Bewust **breed maar geloofwaardig**: commercieel onderhoud, facilitaire
ondersteuning, werkplekdiensten en terugkerende contracten. Breed genoeg om naar
verschillende soorten B2B-dienstverleners te sturen, specifiek genoeg om als een
echt bedrijf te lezen in plaats van als een leeg sjabloon.

De bezoeker die we voor ogen hebben is een office manager, ondernemer of
vastgoedbeheerder die onderhoud wil uitbesteden en bang is de regie kwijt te
raken. De hele pagina is daarop geschreven.

## Zo personaliseer je de site (±5 minuten)

Alles wat per bedrijf verschilt staat in **één bestand**: `src/config/site.ts`.
Je hoeft geen component open te maken.

1. `business` — naam, telefoon, e-mail, adres, openingstijden
2. `claims` — wat dit bedrijf écht belooft (zie hieronder)
3. `theme` — twee kleuren bepalen de hele site
4. `serviceArea` — regio + plaatsen
5. `hero` — kop, subkop, doelgroepregel, foto
6. `services` — diensten die dit bedrijf echt levert
7. `cases` — echte opdrachten, of korter maken
8. `proof` — echte referenties, of `show: false`
9. `inquiry` — labels en keuzes van het aanvraagformulier
10. `seo` — title, description, canonical URL
11. Zet `demoMode: false` zodra het geen demo meer is

Vervang daarna de foto's in `public/img/` — zie `public/img/CREDITS.md`.

### Het `claims`-blok

Bovenaan `site.ts` staan alle harde toezeggingen bij elkaar: reactietermijn,
vast aanspreekpunt, heldere offerte, eigen mensen, meerdere locaties,
opzegtermijn, werk buiten kantooruren, oprichtingsjaar, certificeringen en
klantaantallen. Zet een claim op `null` of `false` en hij verdwijnt **overal** —
hero, trustlaag, USP's, werkwijze, formulier, FAQ, footer én de
SEO-omschrijving — zonder dat er een halve zin achterblijft.

Dat is getest: met alle claims uit staat er nergens meer "vast aanspreekpunt",
"heldere offerte", "Actief sinds" of "meerdere locaties onder één contract", valt
de hele trustlaag weg, en vallen teksten terug op neutrale formuleringen ("zo
snel mogelijk" in plaats van "binnen 1 werkdag").

In B2B word je hier harder op afgerekend dan bij particulieren: een inkoper legt
je offerte naast die van twee anderen en checkt wat je beloofd hebt.

### Vier instellingen om bewust te laten staan

| Instelling | Standaard | Waarom |
| --- | --- | --- |
| `claims.certifications` | `[]` (leeg) | ISO 9001, VCA en SVMS zijn verifieerbaar en in B2B het eerste wat een inkoper natrekt. Vul pas in wat de klant heeft aangetoond. |
| `claims.clientCount` | `null` | "Ruim 200 bedrijven gingen u voor" is onverifieerbaar en voegt niets toe. |
| `claims.clientLogos` | `[]` (leeg) | Logo's van niet-klanten zijn misleidend; logo's van echte klanten mogen alleen met schriftelijke toestemming. De site toont daarom "type opdrachtgever"-kaarten. |
| `claims.foundedYear` | `2011` | Op `null` noemt de site nergens hoe lang het bedrijf bestaat. "Al 20 jaar ervaring" is precies zo'n zin die je verzint. |

---

## Waarom deze site eruitziet zoals hij eruitziet

### Conversie: eerst een gesprek, dan pas een prijs

De primaire CTA is **Plan een kennismaking**, de secundaire **Offerte
aanvragen**, met bellen en e-mailen eronder. Anders dan bij een particuliere
niche is de eerste stap hier een gesprek: een bedrijf dat onderhoud uitbesteedt
wil eerst weten met wie het te maken krijgt. Beide knoppen leiden naar hetzelfde
formulier — het verschil zit in de intentie van de bezoeker, niet in de vragen.

WhatsApp staat er bewust **niet** op. Een facility manager die een
onderhoudspartij zoekt mailt of belt; een WhatsApp-knop komt hier eerder
amateuristisch over dan laagdrempelig. Er zit daarom ook geen WhatsApp-helper in
`src/lib/contact.ts`.

### De mobiele actiebalk

**Bellen | Plan kennismaking**, met de kennismaking gevuld en anderhalf keer zo
breed. De alternatieve combinatie (Offerte | Plan kennismaking) is afgevallen
omdat die twee naar hetzelfde formulier leiden en dus om dezelfde klik zouden
concurreren. Bellen is een ánder kanaal en kost op mobiel één tik.

### De aanvraagflow

Vier stappen: werkzaamheden → organisatie → omvang → contactgegevens. De
organisatievraag komt vroeg, zodat de aanvraag zichzelf kwalificeert op pandtype
en plaats. De omvangvraag bepaalt of er een losse offerte of een contractvoorstel
volgt; in de API-route is `scopeId` daarom het veld om op te routeren, en
`preference` bepaalt of iemand gebeld of gemaild wil worden.

Er zit **geen CRM of backend** achter. De route valideert, logt en antwoordt met
OK — zie "Deployen" hieronder voor het aanzetten van een echte koppeling.

### Cases zonder foto's

De praktijkvoorbeelden zijn opgezet als caseblad: situatie → vraag → aanpak →
resultaat. Bewust zonder beeld. Een stockfoto van een kantoorpand bewijst niets
en suggereert dat het om díé locatie gaat. De structuur is hier het bewijs.
Resultaten zijn kwalitatief gehouden: verzonnen percentages zijn precies waar
een inkoper op doorvraagt.

### Vormgeving

Diep petrol met warm steen en een ingetogen bronzen accent, Instrument Sans en
Public Sans, 3px radius, haarlijnen in plaats van schaduwen. De primaire knop is
de merkkleur zelf en geen felle accentkleur: in B2B leest rust als betrouwbaar.
Diensten staan als brede genummerde rijen in plaats van een kaartenraster, omdat
een zakelijke lezer scant op "zit mijn situatie ertussen" en dan één item écht
leest.

Deze demo deelt bewust **geen** componenten of vormgeving met de andere
niche-demo's. Alleen de architectuurconventies zijn gelijk: één centrale
`site.ts`, `demoMode`, configureerbare claims, een niche-eigen meerstapsformulier
en lokale SEO/schema.

---

## Ontwikkelen

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## Deployen op Vercel

Importeer deze repository als eigen Vercel-project. Next.js wordt automatisch
herkend; er is geen extra configuratie nodig.

**Optioneel — aanvragen laten binnenkomen:** zet in de Vercel environment
variables `CONTACT_WEBHOOK_URL` op een endpoint van Make, Zapier, n8n of je eigen
backend. Zonder die variabele draait het formulier in demo-modus: de aanvraag
wordt gevalideerd en gelogd, maar niet verstuurd. Zie
`src/app/api/contact/route.ts` voor het aansluiten van e-mail (Resend),
Formspree, een CRM of een afsprakentool.

Voeg bij livegang spam-bescherming toe (honeypot of Turnstile) en stel een
AVG-conforme bewaartermijn in.

## Structuur

```
src/
├── app/
│   ├── api/contact/route.ts  aanvraag-endpoint + integratiepunt voor productie
│   ├── layout.tsx            fonts, metadata, merkkleuren als CSS-variabelen
│   ├── globals.css           design tokens, knoppen, sectielabels
│   ├── page.tsx              volgorde van de secties
│   ├── privacy/ voorwaarden/ juridische placeholders
│   └── robots.ts sitemap.ts
├── components/               alle secties — niche-eigen, niet gedeeld
├── config/site.ts            ⬅ de enige file die je per prospect aanpast
└── lib/contact.ts            tel- en mailto-links uit site.ts
```

## Nog te doen vóór livegang bij een echte klant

- [ ] `demoMode: false`
- [ ] Echte bedrijfsgegevens, KvK en btw-nummer
- [ ] Echte referenties met toestemming, of `proof.show: false`
- [ ] Echte cases — en alleen klantnamen waar toestemming voor is
- [ ] Eigen foto's in plaats van de Unsplash-placeholders
- [ ] `claims` nalopen mét de klant — beloof niets wat hij niet waarmaakt
- [ ] Privacyverklaring en algemene voorwaarden laten opstellen
- [ ] `seo.url` op het echte domein zetten
- [ ] Spam-bescherming op het formulier
