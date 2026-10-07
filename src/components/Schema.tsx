import { siteConfig } from "@/config/site";

/**
 * Gestructureerde data voor lokale zakelijke vindbaarheid.
 *
 *  - Organization + LocalBusiness: naam, adres, openingstijden, werkgebied
 *    en de dienstencatalogus.
 *  - FAQPage: de vragen onderaan de pagina.
 *
 * Er staat bewust GEEN aggregateRating in: die hoort alleen bij echte,
 * verifieerbare reviews, en de referenties op deze site zijn demo-content.
 * Er staan om dezelfde reden geen verzonnen klantaantallen of certificeringen
 * in het schema — zie `claims` in site.ts.
 */
export function Schema() {
  const { business, serviceArea, services, seo, faq, claims } = siteConfig;

  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${seo.url}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: seo.description,
    url: seo.url,
    telephone: business.phone.e164,
    email: business.email,
    image: `${seo.url}${seo.ogImage}`,
    priceRange: "€€",
    ...(claims.foundedYear ? { foundingDate: String(claims.foundedYear) } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    areaServed: serviceArea.places.map((place) => ({
      "@type": "City",
      name: place,
    })),
    /** Houd gelijk aan business.hours — schema.org wil losse tijden. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Zakelijke dienstverlening",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: serviceArea.regionLong,
        },
      })),
    },
    sameAs: business.socials.map((social) => social.href),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
