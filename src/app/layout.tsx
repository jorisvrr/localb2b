import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Public_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Twee schriften met elk een taak:
 *   Instrument Sans  koppen, knoppen en labels — strak, zakelijk, iets smal
 *   Public Sans      lopende tekst — neutraal en rustig op lange alinea's
 */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.url,
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.brand,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * De merkkleuren uit siteConfig worden hier als CSS-variabelen gezet.
   * Eén wijziging in site.ts verandert daarmee de hele site.
   */
  const themeVars = {
    "--color-brand": siteConfig.theme.brand,
    "--color-brand-dark": siteConfig.theme.brandDark,
    "--color-accent": siteConfig.theme.accent,
    "--color-accent-dark": siteConfig.theme.accentDark,
  } as React.CSSProperties;

  return (
    <html
      lang="nl"
      className={`${instrument.variable} ${publicSans.variable}`}
      style={themeVars}
    >
      <body>{children}</body>
    </html>
  );
}
