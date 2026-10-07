import { siteConfig } from "@/config/site";

/**
 * Bellen en mailen — altijd afgeleid uit siteConfig.business, zodat een
 * telefoonnummer op precies één plek staat.
 *
 * Deze niche heeft bewust GEEN WhatsApp-helper. Een facility manager die
 * onderhoud uitbesteedt mailt of belt; een WhatsApp-knop zou hier eerder
 * amateuristisch overkomen dan laagdrempelig.
 */
export const telHref = `tel:${siteConfig.business.phone.e164.replace(/\s/g, "")}`;

export const mailHref = `mailto:${siteConfig.business.email}`;

/** Mailto met een voorgevuld onderwerp, voor een specifieke aanleiding. */
export function mailHrefWithSubject(subject: string): string {
  return `mailto:${siteConfig.business.email}?subject=${encodeURIComponent(subject)}`;
}
