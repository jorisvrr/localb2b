import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mailHref, telHref } from "@/lib/contact";
import { MailIcon, MapPinIcon, PhoneIcon, Wordmark } from "./ui/Icons";

export function Footer() {
  const { business, footer, nav, serviceArea, services, demoMode, demoLabels, claims } =
    siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-stone text-muted">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Wordmark className="h-9 w-9 text-brand" />
              <span className="font-display text-[1.05rem] font-semibold tracking-tight text-brand">
                {business.shortName}
              </span>
            </div>
            <p className="mt-4 text-[0.9rem] leading-relaxed">{footer.about}</p>
            {/* Alleen tonen als het oprichtingsjaar is ingevuld in site.ts */}
            {claims.foundedYear && (
              <p className="mt-3 text-[0.85rem]">Actief sinds {claims.foundedYear}.</p>
            )}
          </div>

          <div>
            <p className="label-xs text-brand">Contact</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              <li>
                <a
                  href={telHref}
                  className="-my-1 flex min-h-11 items-center gap-2.5 py-1 hover:text-brand"
                >
                  <PhoneIcon className="h-4 w-4 text-accent" />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="-my-1 flex min-h-11 items-center gap-2.5 py-1 hover:text-brand"
                >
                  <MailIcon className="h-4 w-4 text-accent" />
                  {business.email}
                </a>
              </li>
              {business.address.showOnSite && (
                <li className="flex gap-2.5 pt-1">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-line-strong" />
                  <span>
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                  </span>
                </li>
              )}
            </ul>

            <ul className="mt-5 space-y-1 text-[0.85rem]">
              {business.hours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-3">
                  <span>{entry.days}</span>
                  <span className="tnum">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-xs text-brand">Diensten</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="hover:text-brand">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-xs text-brand">Werkgebied</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed">
              {serviceArea.places.join(" · ")}
            </p>

            <p className="label-xs mt-6 text-brand">Menu</p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-brand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {demoMode && (
          <p className="mt-10 rounded-[3px] border border-line bg-paper px-4 py-3 text-[0.85rem] leading-relaxed">
            <span className="label-xs text-accent-dark">{demoLabels.bannerTitle}</span>{" "}
            — {business.name} {demoLabels.bannerBody}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName} · KvK {business.kvk} · {business.btw}
          </p>
          <ul className="flex flex-wrap gap-5">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
            {business.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-brand"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
