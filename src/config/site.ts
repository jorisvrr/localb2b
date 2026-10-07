/**
 * ============================================================================
 *  SITE CONFIG — de enige file die je hoeft aan te passen per prospect.
 * ============================================================================
 *
 *  MODUS demo 05 — lokale zakelijke dienstverlening / bedrijfsdiensten (NL).
 *
 *  ⚠️  DEMO-CONTENT WAARSCHUWING
 *  "Westvliet Bedrijfsdiensten" is een VERZONNEN bedrijf. Alle referenties,
 *  cases, cijfers, adres- en contactgegevens hieronder zijn voorbeelddata.
 *  Alles wat verzonnen is, is gemarkeerd met `DEMO:` in een comment. Vervang
 *  deze velden voordat de site live gaat voor een echte klant.
 *
 *  Snelle personalisatie voor een prospect (±5 minuten):
 *    1. `business`      — naam, telefoon, e-mail, adres, openingstijden
 *    2. `claims`        — wat dit bedrijf écht belooft (zie blok hieronder)
 *    3. `theme`         — primaire kleur + accentkleur
 *    4. `serviceArea`   — regio + plaatsen
 *    5. `hero`          — kop, subkop, foto
 *    6. `services`      — diensten die dit bedrijf écht levert
 *    7. `cases`         — echte opdrachten, of korter maken
 *    8. `proof`         — echte referenties, of `show: false`
 *    9. `seo`           — title, description, canonical URL
 *   10. Zet `demoMode: false` zodra het geen demo meer is.
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────── TYPES ────

/** Welk icoon bij een dienst hoort. Zie src/components/ui/Icons.tsx. */
export type ServiceIcon =
  | "cycle"
  | "wrench"
  | "support"
  | "clipboard"
  | "workplace"
  | "project"
  | "contract";

export type Service = {
  /** slug — gebruikt als anchor en als id in het aanvraagformulier */
  id: string;
  title: string;
  /** Eén zin: wat de klant concreet krijgt. Geen marketingtaal. */
  description: string;
  /** 3 bullets. Scanbaar en concreet. */
  points: string[];
  icon: ServiceIcon;
  /** Terugkerend werk of eenmalig — stuurt het label op de kaart */
  rhythm: "doorlopend" | "eenmalig";
};

export type Case = {
  /** Type opdrachtgever, bewust geen bedrijfsnaam. Zie de comment bij `cases`. */
  client: string;
  place: string;
  title: string;
  /** Situatie → vraag → aanpak → resultaat. Kwalitatief, geen percentages. */
  situation: string;
  question: string;
  approach: string[];
  result: string;
  /** Diensten die hierbij hoorden */
  tags: string[];
};

export type Testimonial = {
  /** Functie in plaats van naam: geloofwaardiger én geen verzonnen persoon. */
  role: string;
  org: string;
  place: string;
  text: string;
};

/**
 * ============================================================================
 *  CLAIMS — alles wat dit bedrijf aan de klant BELOOFT.
 * ============================================================================
 *  Dit zijn de enige harde, bedrijfsspecifieke toezeggingen op de site. Ze
 *  staan hier los, zodat je ze bij het personaliseren voor een prospect in
 *  één oogopslag kunt nalopen: pas de waarde aan, of zet 'm op `null` /
 *  `false` en de claim verdwijnt overal waar hij voorkomt — hero, trustlaag,
 *  USP's, werkwijze, formulier, FAQ én de SEO-omschrijving.
 *
 *  In B2B word je hier harder op afgerekend dan bij particulieren: een
 *  facility manager legt je offerte naast die van twee anderen en checkt wat
 *  je beloofd hebt. Beloof dus niets wat de klant niet waarmaakt.
 * ============================================================================
 */
const claims = {
  /** Reactietermijn op een aanvraag. null = termijn wordt nergens genoemd. */
  responseTime: "1 werkdag" as string | null,
  /** Eén vast aanspreekpunt per klant. */
  singlePointOfContact: true,
  /** Offerte vooraf, gespecificeerd per onderdeel. */
  clearQuote: true,
  /** Werkt met eigen mensen in plaats van wisselende onderaannemers. */
  ownStaff: true,
  /** Kan meerdere locaties van dezelfde klant bedienen. */
  multiSite: true,
  /** Vaste maandrapportage of terugkoppeling na elk bezoek. */
  reporting: true,
  /**
   * Werk buiten kantooruren, bijv. "in overleg, ook 's avonds en in het
   * weekend". null = de site claimt niets over avond- of weekendwerk.
   */
  outsideHours: "in overleg" as string | null,
  /** Opzegtermijn van een contract, bijv. "1 maand". null = niet genoemd. */
  contractNotice: "1 maand" as string | null,
  /**
   * Jaar van oprichting. null = de site noemt NERGENS hoe lang het bedrijf
   * bestaat. "Al 20 jaar ervaring" is precies zo'n zin die je verzint en
   * waar een prospect je op betrapt.
   */
  foundedYear: 2011 as number | null,
  /**
   * ⚠️ CERTIFICERINGEN — standaard LEEG.
   *
   * Vul hier NIETS in wat je niet hebt gezien. ISO 9001, VCA, SVMS en
   * vergelijkbare keurmerken zijn verifieerbaar en in B2B het eerste wat een
   * inkoper natrekt. Laat leeg tot de klant het certificaat heeft gestuurd.
   *
   * Voorbeeld zodra het klopt:
   *   certifications: ["VCA* gecertificeerd", "ISO 9001"]
   */
  certifications: [] as string[],
  /**
   * ⚠️ KLANTAANTALLEN — standaard null.
   *
   * "Ruim 200 bedrijven gingen u voor" is onverifieerbaar en voegt niets toe.
   * Vul alleen in als het klopt én de klant het wil noemen.
   */
  clientCount: null as string | null,
  /**
   * ⚠️ REFERENTIELOGO'S — standaard leeg en bewust niet ondersteund.
   *
   * Logo's van bedrijven die geen klant zijn, zijn misleidend; logo's van
   * echte klanten mogen alleen met schriftelijke toestemming. In de demo
   * staan daarom "type klant"-kaarten in plaats van logo's.
   */
  clientLogos: [] as { name: string; src: string }[],
};

/** Houdt alleen de ingeschakelde items over, met behoud van het type. */
function enabled<T>(items: (T | null | false | undefined | "" | 0)[]): T[] {
  return items.filter((item): item is T => Boolean(item));
}

/** "1 werkdag" -> "binnen 1 werkdag", of een nette terugvaltekst. */
const within = (value: string | null, fallback: string) =>
  value ? `binnen ${value}` : fallback;

/** ["a","b","c"] -> "a, b en c" */
const sentenceList = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;

/**
 * De harde toezeggingen als één lopende zin, of een lege string als er geen
 * enkele claim aan staat. Wordt gebruikt in de hero-subkop en de
 * SEO-omschrijving, zodat ook díé teksten kloppen wanneer je claims uitzet.
 */
const promiseSentence = (() => {
  const parts = enabled([
    claims.singlePointOfContact && "één vast aanspreekpunt",
    claims.clearQuote && "een heldere offerte vooraf",
    claims.multiSite && "inzet op één of meerdere locaties",
  ]);
  if (parts.length === 0) return "";
  const sentence = sentenceList(parts);
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
})();

export const siteConfig = {
  /**
   * demoMode = true toont overal subtiele "voorbeeld"-labels en een
   * demo-balk bovenaan. Zet op false voor een echte klant.
   */
  demoMode: true,

  /** Weergave-opties die per prospect verschillen. */
  display: {
    /**
     * Tarieven of richtprijzen tonen.
     *
     * Staat BEWUST uit: in B2B gaat vrijwel alles op offertebasis, en een
     * bedrag op de site is hier eerder een reden om níét te bellen. Zet 'm
     * alleen aan als de klant met vaste tarieven werkt én die wil publiceren.
     */
    showPriceIndications: false,
  },

  /** Teksten die alleen zichtbaar zijn zolang demoMode aan staat. */
  demoLabels: {
    bannerTitle: "Voorbeeldwebsite",
    bannerBody:
      "is een fictief bedrijf. Teksten, referenties, cases en contactgegevens zijn demo-content.",
    badge: "Voorbeeld",
    casesBadge: "Voorbeeldcases",
    proofNoticeTitle: "Voorbeeldreferenties.",
    proofNoticeBody:
      "Deze citaten en klanttypes zijn demo-content en horen niet bij bestaande opdrachtgevers. In de live versie staan hier echte referenties, met toestemming van de klant.",
    casesNoticeTitle: "Voorbeeldcases.",
    casesNoticeBody:
      "Realistisch opgeschreven, maar verzonnen. Vervang ze door opdrachten die het bedrijf echt heeft uitgevoerd.",
    formNotice:
      "Demo: het formulier verstuurt nog niets. In productie gaat de aanvraag naar e-mail, CRM, een webhook of een afsprakentool.",
    formSuccessNotice: "Demo: deze aanvraag is niet echt verstuurd.",
  },

  // ───────────────────────────────────────────────────────────── BEDRIJF ────
  business: {
    /** DEMO: verzonnen bedrijfsnaam */
    name: "Westvliet Bedrijfsdiensten",
    /** Korte naam voor nav/footer wanneer de volledige naam te lang is */
    shortName: "Westvliet",
    legalName: "Westvliet Bedrijfsdiensten B.V.",
    tagline: "Onderhoud en facilitaire ondersteuning voor bedrijven",
    logoSrc: null as string | null,

    /** DEMO: placeholder-nummer. Overal afgeleid uit deze twee velden. */
    phone: {
      /** Internationaal, zonder spaties — voor tel: */
      e164: "+31701234567",
      /** Zoals getoond aan de bezoeker */
      display: "070 123 45 67",
    },
    /** DEMO: placeholder e-mail */
    email: "contact@westvlietbedrijfsdiensten.nl",

    /** DEMO: verzonnen vestigingsadres */
    address: {
      street: "Handelskade 18",
      postalCode: "2288 BE",
      city: "Rijswijk",
      country: "NL",
      showOnSite: true,
      /** DEMO: coördinaten bij benadering (Rijswijk) — alleen voor schema.org */
      lat: 52.0365,
      lng: 4.3247,
    },

    /** DEMO: verzonnen registratienummers */
    kvk: "00000000",
    btw: "NL000000000B01",

    hours: [
      { days: "Maandag t/m vrijdag", time: "07:30 – 17:00" },
      { days: "Zaterdag", time: "Op afspraak" },
      { days: "Zondag", time: "Gesloten" },
    ],
    /** Eén regel naast de telefoonknop */
    hoursSummary: "Ma t/m vr 07:30 – 17:00",

    socials: [{ label: "LinkedIn", href: "https://linkedin.com/" }],
  },

  // ─────────────────────────────────────────────────────────────── THEMA ────
  /**
   * Twee kleuren bepalen de hele site. Ze worden als CSS-variabelen op <html>
   * gezet (zie app/layout.tsx), dus hier wijzigen is genoeg.
   *   brand  = diep petrol: donkere vlakken, koppen én de primaire knop
   *   accent = ingetogen brons: haarlijnen, labels, kleine markeringen
   *
   * De primaire knop is bewust de MERKkleur en niet een felle accentkleur.
   * In B2B werkt rust beter dan een schreeuwerige CTA, en de hiërarchie komt
   * hier uit vulling versus omlijning in plaats van uit kleurcontrast.
   */
  theme: {
    brand: "#123B40",
    brandDark: "#0C2B2F",
    accent: "#A87A4C",
    accentDark: "#8C6339",
  },

  // ────────────────────────────────────────────────────────────────── CTA ────
  /**
   * De conversiehiërarchie van deze niche:
   *   1. Plan een kennismaking  — de hoofdconversie
   *   2. Offerte aanvragen      — zelfde formulier, andere intentie
   *   3. Bellen / e-mailen      — voor wie liever direct schakelt
   *
   * Anders dan bij een particuliere niche is de eerste stap hier een gesprek,
   * geen prijs. Een bedrijf dat onderhoud uitbesteedt wil eerst weten met wie
   * het te maken krijgt.
   */
  cta: {
    primary: {
      label: "Plan een kennismaking",
      labelShort: "Kennismaking",
      href: "#aanvraag",
    },
    secondary: {
      label: "Offerte aanvragen",
      labelShort: "Offerte",
      href: "#aanvraag",
    },
    call: { label: "Bellen", labelShort: "Bellen" },
    mail: { label: "E-mailen", labelShort: "E-mail" },
  },

  // ─────────────────────────────────────────────────────────────── REGIO ────
  serviceArea: {
    /** Gebruikt in koppen en SEO-teksten */
    region: "Den Haag",
    regionLong: "Den Haag, Rotterdam en omstreken",
    /** Korte variant voor in een kop */
    regionShort: "de regio Haaglanden en Rijnmond",
    places: [
      "Den Haag",
      "Rijswijk",
      "Delft",
      "Zoetermeer",
      "Leidschendam-Voorburg",
      "Westland",
      "Rotterdam",
      "Schiedam",
      "Capelle aan den IJssel",
      "Leiden",
      "Alphen aan den Rijn",
      "Gouda",
    ],
    note: "Staat uw locatie er niet bij? Neem gerust contact op — bij meerdere vestigingen kijken we wat haalbaar is.",
    eyebrow: "Werkgebied",
    intro:
      "We werken in de driehoek Den Haag – Rotterdam – Leiden. Door die beperkte straal kunnen we vaste bezoekmomenten plannen en bij een storing dezelfde regio-monteur sturen die uw pand al kent.",
  },

  // ──────────────────────────────────────────────────────────────── HERO ────
  /**
   * De hero moet vier vragen beantwoorden voordat iemand scrolt: wat doen
   * jullie, voor wie, waar, en wat moet ik nu doen.
   */
  hero: {
    eyebrow: "Zakelijke dienstverlening in Den Haag, Rotterdam en omstreken",
    title: "Zakelijke service en onderhoud voor bedrijven in de regio",
    subtitle: `Eén aanspreekpunt voor terugkerend onderhoud, storingen en praktische ondersteuning op locatie.${
      promiseSentence ? ` ${promiseSentence}` : ""
    }`,
    image: "/img/hero-onderhoud.jpg",
    imageAlt:
      "Servicemonteur controleert een wandpaneel in een kantoorpand met glazen scheidingswanden",
    /** Voor wie dit bedoeld is — maakt binnen één regel duidelijk of je goed zit */
    audience: "Kantoren, winkels, bedrijfspanden, horeca, VvE's en vastgoedbeheerders",
  },

  // ──────────────────────────────────────────────────────── TRUSTLAAG ────
  /**
   * De laag onder de hero. BEWUST geen certificeringen, geen klantaantallen
   * en geen beoordelingscijfer: dat zou allemaal verzonnen zijn. Alleen
   * kwalitatieve toezeggingen die uit `claims` komen en die je per prospect
   * uit kunt zetten.
   */
  trust: {
    items: enabled([
      claims.singlePointOfContact && {
        title: "Eén vast aanspreekpunt",
        body: "Dezelfde contactpersoon voor planning, offertes en vragen tussendoor.",
      },
      claims.responseTime && {
        title: `Reactie ${within(claims.responseTime, "zo snel mogelijk")}`,
        body: "Op elke aanvraag krijgt u antwoord van een mens, geen ontvangstbevestiging.",
      },
      claims.multiSite && {
        title: "Eén of meerdere locaties",
        body: "Van één pand tot een portefeuille met vestigingen, op dezelfde afspraken.",
      },
      claims.clearQuote && {
        title: "Heldere offerte vooraf",
        body: "Gespecificeerd per onderdeel, zodat u weet waarvoor u tekent.",
      },
    ]),
  },

  // ───────────────────────────────────────────────────────────── DIENSTEN ────
  servicesIntro: {
    eyebrow: "Diensten",
    title: "Wat we voor uw pand en organisatie doen",
    subtitle:
      "Doorlopend of eenmalig, afhankelijk van wat u nodig heeft. U kunt klein beginnen en later uitbreiden.",
  },

  services: [
    {
      id: "periodiek-onderhoud",
      title: "Periodiek onderhoud",
      description:
        "Vaste onderhoudsbeurten op een afgesproken ritme, zodat u er zelf niet meer aan hoeft te denken.",
      points: [
        "Jaarplanning met vaste bezoekmomenten",
        "Terugkoppeling na elk bezoek",
        "Signalering van wat op termijn vervangen moet worden",
      ],
      icon: "cycle",
      rhythm: "doorlopend",
    },
    {
      id: "storingen",
      title: "Storingen en kleine reparaties",
      description:
        "Losse meldingen die snel verholpen moeten worden, zonder dat u er een aparte partij voor hoeft te zoeken.",
      points: [
        "Eén nummer voor alle meldingen",
        "Kleine reparaties vaak in hetzelfde bezoek",
        "Grotere zaken eerst in offerte, daarna pas uitvoeren",
      ],
      icon: "wrench",
      rhythm: "eenmalig",
    },
    {
      id: "facilitair",
      title: "Facilitaire ondersteuning",
      description:
        "Praktische ondersteuning op locatie voor organisaties zonder eigen technische dienst.",
      points: [
        "Vaste dagdelen of op afroep",
        "Afstemming met uw facility manager of beheerder",
        "Coördinatie van externe partijen waar nodig",
      ],
      icon: "support",
      rhythm: "doorlopend",
    },
    {
      id: "inspecties",
      title: "Inspecties en controles",
      description:
        "Periodieke controlerondes met een vastgelegde bevinding per locatie.",
      points: [
        "Vaste checklist per pandtype",
        "Bevindingen met foto's vastgelegd",
        "Advies over wat nu, later of niet hoeft",
      ],
      icon: "clipboard",
      rhythm: "doorlopend",
    },
    {
      id: "werkplek",
      title: "Werkplek- en pandondersteuning",
      description:
        "Verhuizingen, herindelingen en alle kleine klussen die bij een pand horen.",
      points: [
        "Werkplekken verplaatsen en opnieuw inrichten",
        "Montagewerk, bevestiging en afhangwerk",
        "Oplevering van ruimtes bij wisseling van huurder",
      ],
      icon: "workplace",
      rhythm: "eenmalig",
    },
    {
      id: "projecten",
      title: "Projectmatig werk",
      description:
        "Afgebakende opdrachten met een begin, een eind en een vaste prijs.",
      points: [
        "Eén planning en één aanspreekpunt",
        "Werk buiten openingstijden in overleg",
        "Oplevering met puntenlijst die we samen aflopen",
      ],
      icon: "project",
      rhythm: "eenmalig",
    },
    {
      id: "contractonderhoud",
      title: "Contractonderhoud",
      description:
        "Een vast contract voor terugkerend werk, afgestemd op uw pand en budget.",
      points: [
        "Vast maandbedrag of staffel per locatie",
        "Jaarlijkse evaluatie en bijstelling",
        "Flexibel uit te breiden naar nieuwe vestigingen",
      ],
      icon: "contract",
      rhythm: "doorlopend",
    },
  ] satisfies Service[],

  // ───────────────────────────────────────────────────────────────── CASES ────
  /**
   * ⚠️ DEMO-CASES — dit zijn VERZONNEN voorbeelden, geen echte opdrachten.
   *
   * Let op twee dingen bij het vervangen:
   *  1. Noem alleen een klantnaam als je daar schriftelijk toestemming voor
   *     hebt. Zonder toestemming is "Kantoorlocatie, Den Haag" prima — het
   *     type opdrachtgever zegt een lezer meer dan de naam.
   *  2. Houd het resultaat kwalitatief. Verzonnen percentages ("30% minder
   *     storingen") zijn precies waar een inkoper op doorvraagt.
   */
  casesIntro: {
    eyebrow: "Praktijkvoorbeelden",
    title: "Hoe een samenwerking er in de praktijk uitziet",
    subtitle:
      "Drie situaties die we vaak tegenkomen, met wat we doen en wat het de opdrachtgever oplevert.",
  },

  cases: [
    {
      client: "Kantoorlocatie",
      place: "Den Haag",
      title: "Van losse klusjes naar een vaste maandronde",
      situation:
        "Een kantoor met ongeveer zestig werkplekken regelde onderhoud per keer: een schilder via de ene partij, een monteur via de andere, en kleine klussen bleven liggen bij de office manager.",
      question:
        "Kunnen we hier één partij voor hebben, zonder meteen aan een duur contract vast te zitten?",
      approach: [
        "Eerst drie maanden een vaste maandronde, zonder opzegtermijn",
        "Lijst met openstaande klussen in één keer weggewerkt",
        "Meldingen via één mailadres in plaats van vier telefoonnummers",
      ],
      result:
        "Na de proefperiode is het omgezet naar een doorlopende afspraak. De office manager houdt de regie, maar hoeft niet meer zelf partijen te bellen.",
      tags: ["Periodiek onderhoud", "Storingen", "Facilitaire ondersteuning"],
    },
    {
      client: "Retailpand",
      place: "Rotterdam",
      title: "Storingen oplossen zonder de winkel te sluiten",
      situation:
        "Een winkel met een drukke vloer kon overdag geen werkzaamheden hebben. Reparaties schoven daardoor steeds op, tot ze niet meer konden wachten.",
      question:
        "Kan het werk buiten openingstijden, en weten we vooraf wat het kost?",
      approach: [
        "Vaste avondmomenten afgesproken, één keer per twee weken",
        "Kleine reparaties meteen, grotere eerst in offerte",
        "Sleutelafspraken en alarmprocedure vastgelegd met de bedrijfsleider",
      ],
      result:
        "De winkel sluit niet meer voor onderhoud. Wat er is gedaan staat de volgende ochtend in de mail, zodat de bedrijfsleider weet wat er 's avonds is gebeurd.",
      tags: ["Storingen", "Projectmatig werk"],
    },
    {
      client: "Vastgoedbeheerder",
      place: "Zoetermeer",
      title: "Meerdere locaties op dezelfde afspraken",
      situation:
        "Een beheerder met een aantal panden in de regio werkte per pand met een andere leverancier. Facturen, afspraken en kwaliteit liepen daardoor uiteen.",
      question:
        "Kunnen alle locaties onder één set afspraken, met inzicht per pand?",
      approach: [
        "Inventarisatie per pand, met foto's en een puntenlijst",
        "Eén contract met een staffel per locatie",
        "Per pand een eigen rapportage, één factuur voor het geheel",
      ],
      result:
        "De beheerder heeft één aanspreekpunt voor alle panden en kan per locatie terugzien wat er is gedaan. Nieuwe panden worden toegevoegd zonder nieuw contract.",
      tags: ["Contractonderhoud", "Inspecties", "Periodiek onderhoud"],
    },
  ] satisfies Case[],

  // ────────────────────────────────────────────────────────── REFERENTIES ────
  /**
   * ⚠️ DEMO-REFERENTIES — verzonnen citaten.
   *
   * Bewust op functie en organisatietype in plaats van op persoonsnaam: dat is
   * in B2B gebruikelijker, het is geloofwaardiger, én het voorkomt dat er een
   * verzonnen persoon met naam en toenaam op de site staat.
   *
   * Er staan GEEN klantlogo's op deze site. Zie claims.clientLogos.
   */
  proof: {
    show: true,
    eyebrow: "Referenties",
    title: "Wat opdrachtgevers terugkoppelen",
    subtitle:
      "En het type organisaties waarvoor we werken. Geen logo's: die laten we alleen zien met toestemming van de klant.",
    /** Typen opdrachtgever — geen namen, geen logo's */
    clientTypes: [
      { label: "Kantoorlocaties", detail: "periodiek onderhoud en facilitaire ondersteuning" },
      { label: "Retail en horeca", detail: "storingen en werk buiten openingstijden" },
      { label: "Bedrijfspanden", detail: "inspecties, montage en projectmatig werk" },
      {
        label: "VvE's en vastgoedbeheer",
        detail: claims.multiSite
          ? "meerdere locaties onder één contract"
          : "onderhoud en inspecties voor beheerorganisaties",
      },
    ],
    testimonials: [
      {
        role: "Office manager",
        org: "Kantoorlocatie",
        place: "Den Haag",
        text: "Het grootste verschil is dat ik niet meer hoef na te bellen. Er komt iemand op de afgesproken dag, en als er iets niet kan hoor ik dat vooraf in plaats van achteraf.",
      },
      {
        role: "Bedrijfsleider",
        org: "Retailpand",
        place: "Rotterdam",
        text: "Ze werken 's avonds als wij dicht zijn en laten de vloer achter zoals ze hem aantroffen. De volgende ochtend ligt er een kort verslag van wat er is gedaan.",
      },
      {
        role: "Vastgoedbeheerder",
        org: "Beheerorganisatie",
        place: "Zoetermeer",
        text: "We hebben vier panden bij ze ondergebracht. Per pand zie ik terug wat er is gebeurd, maar ik krijg één factuur en heb één aanspreekpunt.",
      },
    ] satisfies Testimonial[],
  },

  // ──────────────────────────────────────────────────────── HOE HET WERKT ────
  process: {
    eyebrow: "Werkwijze",
    title: "Van kennismaking tot vaste afspraak",
    subtitle:
      "In vijf stappen, zonder dat u zich meteen voor lange tijd vastlegt.",
    image: "/img/kennismaking.jpg",
    imageAlt:
      "Twee mensen in gesprek aan een vergadertafel met een laptop en koffie",
    steps: [
      {
        title: "Kennismaking",
        body: "Een kort gesprek van een halfuur, bij u op locatie of online. We kijken wat er speelt en of we de juiste partij zijn.",
      },
      {
        title: "Inventarisatie",
        body: "We lopen het pand door en leggen vast wat er is, wat aandacht nodig heeft en wat kan wachten. Met foto's, zodat u het kunt navertellen.",
      },
      {
        title: "Voorstel",
        body: `U krijgt een voorstel met de werkzaamheden per onderdeel${
          claims.clearQuote ? " en een prijs die daarbij hoort" : ""
        }. Doorlopend, eenmalig of een combinatie — u kiest.`,
      },
      {
        title: "Uitvoering",
        body: `We plannen de bezoeken in en u weet wie er komt.${
          claims.singlePointOfContact
            ? " Bij vragen heeft u één vast aanspreekpunt."
            : ""
        }`,
      },
      {
        title: "Evaluatie en vervolg",
        body: `${
          claims.reporting
            ? "Na elk bezoek een korte terugkoppeling, en jaarlijks"
            : "Jaarlijks"
        } kijken we samen of de afspraken nog kloppen. Bijsturen kan altijd.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── USP'S ────
  /**
   * Geschreven rond de twijfels die een facility manager of ondernemer écht
   * heeft bij het uitbesteden van onderhoud: raak ik de regie kwijt, zit ik
   * ergens aan vast, en krijg ik steeds dezelfde mensen over de vloer?
   */
  whyUs: {
    eyebrow: "Waarom ons",
    title: "Waarom organisaties het bij ons onderbrengen",
    intro:
      "Onderhoud uitbesteden voelt als regie inleveren. Daarom hebben we het zo geregeld dat u juist meer overzicht krijgt, niet minder.",
    reasons: enabled([
      claims.singlePointOfContact && {
        title: "Eén aanspreekpunt, geen afdeling",
        body: "U belt dezelfde persoon voor een offerte, een melding of een vraag tussendoor. Die kent uw pand en hoeft het niet na te vragen.",
      },
      {
        title: "Duidelijke afspraken op papier",
        body: "Wat we doen, wanneer we komen en wat het kost staat vooraf vast. Afwijken gebeurt alleen in overleg.",
      },
      claims.responseTime && {
        title: "Snelle terugkoppeling",
        body: `Op aanvragen reageren we ${within(
          claims.responseTime,
          "zo snel mogelijk",
        )}. Ook als het antwoord is dat we het niet kunnen.`,
      },
      claims.multiSite && {
        title: "Meegroeien met uw portefeuille",
        body: "Begint u met één pand en komen er locaties bij, dan gaan die onder dezelfde afspraken mee. Geen nieuw traject.",
      },
      claims.ownStaff && {
        title: "Eigen mensen",
        body: "Vaste gezichten die uw pand kennen. Geen wisselende inhuur die elke keer opnieuw moet worden ingewerkt.",
      },
      claims.contractNotice && {
        title: `Opzegtermijn van ${claims.contractNotice}`,
        body: "U zit nergens lang aan vast. Werkt het niet, dan stopt het — dat houdt ons scherp.",
      },
    ]),
  },

  // ────────────────────────────────────────────────────────── AANVRAAGFLOW ────
  /**
   * Alle teksten en keuzes van het aanvraagformulier. De flow zelf staat in
   * src/components/InquiryForm.tsx; hier staat wat er gevraagd wordt.
   *
   * Opzet voor deze niche:
   *   1. Werkzaamheden   — één tik, geen formulier bij binnenkomst
   *   2. Organisatie     — bedrijfsnaam, plaats, type locatie
   *   3. Omvang          — ritme en aantal locaties; kwalificeert de aanvraag
   *   4. Contact         — inclusief voorkeur bellen of mailen
   *
   * De flow eindigt in een kennismaking, niet in een prijs. Dat is bij een
   * doorlopende samenwerking de realistische eerste stap.
   */
  inquiry: {
    eyebrow: "Aanvraag",
    title: "Plan een kennismaking",
    subtitle: `Vier korte vragen, ongeveer een minuut werk. U krijgt ${within(
      claims.responseTime,
      "zo snel mogelijk",
    )} antwoord${claims.singlePointOfContact ? " van een vast aanspreekpunt" : ""}.`,
    stepLabels: ["Werkzaamheden", "Organisatie", "Omvang", "Contactgegevens"],
    estimatedTime: "± 1 minuut",

    steps: {
      work: {
        question: "Waar kunnen we mee helpen?",
        help: "Meerdere opties mogen. Weet u het nog niet precies? Kies wat er het dichtst bij komt.",
      },
      organisation: {
        question: "Over uw organisatie",
        help: "Zo weten we met wat voor locatie we te maken hebben en wie er in de buurt zit.",
      },
      scope: {
        question: "Hoe vaak heeft u ons nodig?",
        help: "Een inschatting is genoeg. Dit bepaalt of we een losse offerte of een contractvoorstel maken.",
      },
      contact: {
        question: "Hoe kunnen we u bereiken?",
        help: `U krijgt ${within(
          claims.responseTime,
          "zo snel mogelijk",
        )} antwoord. We gebruiken uw gegevens alleen voor deze aanvraag.`,
      },
    },

    /** Stap 1 — meerkeuze */
    workOptions: [
      { id: "periodiek", label: "Periodiek onderhoud" },
      { id: "eenmalig", label: "Eenmalige opdracht" },
      { id: "storingen", label: "Storingen / reparaties" },
      { id: "facilitair", label: "Facilitaire ondersteuning" },
      { id: "inspectie", label: "Inspectie" },
      { id: "anders", label: "Anders" },
    ],

    /** Stap 2 */
    orgLabels: {
      company: "Bedrijfsnaam",
      place: "Plaats",
      locationType: "Type locatie",
    },
    locationTypes: [
      "Kantoor",
      "Winkel",
      "Bedrijfspand",
      "VvE / vastgoed",
      "Horeca",
      "Anders",
    ],

    /** Stap 3 */
    scopeOptions: [
      { id: "eenmalig", label: "Eenmalig", help: "Eén opdracht, afgebakend" },
      { id: "maandelijks", label: "Maandelijks", help: "Een vaste ronde per maand" },
      { id: "wekelijks", label: "Wekelijks", help: "Vaste dag of dagdeel per week" },
      {
        id: "contract",
        label: "Doorlopend contract",
        help: "Vaste afspraken voor langere tijd",
      },
      {
        id: "onbekend",
        label: "Nog niet zeker",
        help: "Dat zoeken we samen uit tijdens de kennismaking",
      },
    ],
    locationCountLabel: "Aantal locaties",
    locationCountOptions: ["1 locatie", "2 – 5 locaties", "6 – 15 locaties", "Meer dan 15"],

    /** Stap 4 */
    contactLabels: {
      name: "Naam",
      email: "Zakelijk e-mailadres",
      phone: "Telefoonnummer",
      preference: "Hoe neemt u het liefst contact op?",
      message: "Toelichting",
    },
    contactPreferences: [
      { id: "bellen", label: "Bel mij" },
      { id: "email", label: "Mail mij" },
    ],

    /** Knop- en hulpteksten */
    nextLabel: "Volgende",
    backLabel: "Terug",
    submitLabel: "Verstuur aanvraag",
    sendingLabel: "Versturen…",
    privacyNote:
      "Vrijblijvend. Uw gegevens gebruiken we alleen om op deze aanvraag te reageren.",
    directContactTitle: "Liever direct schakelen?",

    /** Wordt getoond na succesvol versturen */
    successTitle: "Bedankt, uw aanvraag staat bij ons binnen",
    successBody: `We nemen ${within(
      claims.responseTime,
      "zo snel mogelijk",
    )} contact op om een kennismaking in te plannen. Liever meteen schakelen? Bel of mail ons gerust.`,
  },

  // ─────────────────────────────────────────────────────────────────── FAQ ────
  faq: {
    eyebrow: "Vragen",
    title: "Veelgestelde vragen",
    aside:
      "Staat uw vraag er niet bij? Bel of mail gerust — u krijgt antwoord van iemand die het weet.",
    items: enabled([
      {
        q: "Werken jullie met onderhoudscontracten?",
        a: claims.contractNotice
          ? `Ja, maar het hoeft niet. Veel samenwerkingen beginnen met een losse opdracht of een proefperiode van een paar maanden. Bevalt het, dan zetten we het om naar een contract met een opzegtermijn van ${claims.contractNotice}. U zit dus nergens lang aan vast.`
          : "Ja, maar het hoeft niet. Veel samenwerkingen beginnen met een losse opdracht of een proefperiode van een paar maanden. Bevalt het, dan zetten we het om naar vaste afspraken.",
      },
      {
        q: "Kunnen jullie meerdere locaties bedienen?",
        a: claims.multiSite
          ? "Ja. We werken voor organisaties met één pand en voor beheerders met meerdere vestigingen in de regio. Elke locatie krijgt een eigen rapportage; u krijgt één factuur en één aanspreekpunt. Komen er panden bij, dan gaan die onder dezelfde afspraken mee."
          : "Dat bespreken we graag tijdens de kennismaking — het hangt af van de ligging en de omvang van de locaties.",
      },
      {
        q: "Is een eenmalige opdracht ook mogelijk?",
        a: "Zeker. Een verhuizing, een oplevering of een lijst met achterstallige klussen kan prima als losse opdracht. Daar hoeft geen contract achter te zitten, en we gebruiken het ook niet als opstapje naar een verkoopgesprek.",
      },
      {
        q: "Hoe werkt de offerte?",
        a: claims.clearQuote
          ? "Na de inventarisatie krijgt u een offerte waarin de werkzaamheden per onderdeel staan, met de prijs die daarbij hoort. Zo kunt u zelf schuiven met wat wel en niet doorgaat. Meerwerk voeren we alleen uit na uw akkoord."
          : "Na de inventarisatie krijgt u een voorstel met de werkzaamheden en de bijbehorende kosten. Meerwerk voeren we alleen uit na uw akkoord.",
      },
      claims.singlePointOfContact && {
        q: "Kunnen we één vast aanspreekpunt krijgen?",
        a: "Ja, dat is bij ons standaard. U krijgt één contactpersoon voor planning, offertes en meldingen. Die kent uw pand en de afspraken, zodat u niet elke keer opnieuw hoeft uit te leggen wat er speelt.",
      },
      {
        q: "Werken jullie buiten kantooruren?",
        /**
         * Volgt claims.outsideHours. Zet die op null als het bedrijf dit niet
         * doet — dan belooft de site het nergens.
         */
        a: claims.outsideHours
          ? `Werk buiten kantooruren is ${claims.outsideHours} mogelijk. Voor winkels en horeca plannen we het werk vaak 's avonds of vroeg in de ochtend, zodat uw zaak niet dicht hoeft. Daar geldt wel een afwijkend tarief voor; dat staat vooraf in de offerte.`
          : "We werken op werkdagen tijdens kantooruren. Heeft u werk dat alleen buiten die tijden kan, laat het weten tijdens de kennismaking — dan kijken we of het te plannen is.",
      },
      {
        q: "Kunnen jullie samenwerken met onze facility manager of vastgoedbeheerder?",
        a: "Graag. In de meeste gevallen werken we juist naast een interne facility manager of beheerder: zij houden de regie, wij voeren uit en koppelen terug. We sluiten aan op uw meldsysteem of werken gewoon via de mail, net wat voor u het handigst is.",
      },
      {
        q: "In welke regio werken jullie?",
        a: "In de driehoek Den Haag – Rotterdam – Leiden, met onder andere Rijswijk, Delft, Zoetermeer, Leidschendam-Voorburg, Westland, Schiedam, Gouda en Alphen aan den Rijn. Zit u er net buiten, of heeft u één locatie verder weg? Neem contact op, dan kijken we of het te plannen is.",
      },
      claims.certifications.length > 0 && {
        q: "Welke certificeringen hebben jullie?",
        a: `We werken met ${sentenceList(claims.certifications)}. De documenten sturen we op aanvraag mee met de offerte.`,
      },
    ]),
  },

  // ───────────────────────────────────────────────────────────── FINAL CTA ────
  finalCta: {
    title: "Even kennismaken?",
    body: "Een gesprek van een halfuur is genoeg om te zien of we bij elkaar passen. U zit nergens aan vast, en we sturen geen offerte waar u niet om gevraagd heeft.",
  },

  // ─────────────────────────────────────────────────────────────────── SEO ────
  seo: {
    /** Zonder trailing slash. Nodig voor canonical, OG en sitemap. */
    url: "https://demo-bedrijfsdiensten.vercel.app",
    title:
      "Zakelijke dienstverlening in Den Haag en Rotterdam | Onderhoud en facilitaire ondersteuning — Westvliet Bedrijfsdiensten",
    description: `Onderhoud, storingen en facilitaire ondersteuning voor kantoren, winkels, bedrijfspanden en VvE's in Den Haag, Rijswijk, Delft, Zoetermeer en Rotterdam.${
      promiseSentence ? ` ${promiseSentence}` : ""
    }`,
    locale: "nl_NL",
    ogImage: "/img/hero-onderhoud.jpg",
  },

  // ──────────────────────────────────────────────────────────────── FOOTER ────
  footer: {
    about:
      "Zakelijke dienstverlener voor onderhoud, storingen en facilitaire ondersteuning in Den Haag, Rotterdam en omstreken. Voor kantoren, retail, bedrijfspanden, horeca, VvE's en vastgoedbeheerders.",
    legalLinks: [
      { label: "Privacyverklaring", href: "/privacy" },
      { label: "Algemene voorwaarden", href: "/voorwaarden" },
    ],
  },

  // ─────────────────────────────────────────────────────────── NAVIGATIE ────
  nav: [
    { label: "Diensten", href: "#diensten" },
    { label: "Praktijk", href: "#cases" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Referenties", href: "#referenties" },
    { label: "Werkgebied", href: "#werkgebied" },
  ],

  /** Alle claims blijven leesbaar vanuit componenten die ze willen tonen. */
  claims,
};

export type SiteConfig = typeof siteConfig;
