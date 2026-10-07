import { Cases } from "@/components/Cases";
import { DemoBanner } from "@/components/DemoBanner";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InquirySection } from "@/components/InquirySection";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Process } from "@/components/Process";
import { Proof } from "@/components/Proof";
import { Schema } from "@/components/Schema";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { TrustLayer } from "@/components/TrustLayer";
import { WhyUs } from "@/components/WhyUs";

/**
 * De volgorde volgt de vragen van een zakelijke bezoeker:
 *   wat doen jullie en voor wie → wat kan ik afnemen → doen jullie dit vaker →
 *   hoe gaat het in zijn werk → waarom jullie → wat zeggen anderen →
 *   val ik in het werkgebied → aanvragen → losse vragen.
 *
 * Cases staan vroeg: in B2B is "begrijp je mijn situatie" de eerste horde,
 * en die neem je met een praktijkvoorbeeld, niet met een dienstenlijst.
 */
export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <TrustLayer />
        <Services />
        <Cases />
        <Process />
        <WhyUs />
        <Proof />
        <ServiceArea />
        <InquirySection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <Schema />
    </>
  );
}
