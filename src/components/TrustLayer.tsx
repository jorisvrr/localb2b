import { siteConfig } from "@/config/site";

/**
 * De laag onder de hero.
 *
 * Hier staat BEWUST geen certificering, geen klantaantal en geen
 * beoordelingscijfer: dat zou allemaal verzonnen zijn, en in B2B is dat het
 * eerste wat een inkoper natrekt. Alleen kwalitatieve toezeggingen die uit
 * `claims` komen — zet een claim uit en het item verdwijnt hier vanzelf.
 */
export function TrustLayer() {
  const { trust } = siteConfig;

  if (trust.items.length === 0) return null;

  return (
    <section className="border-b border-line bg-paper">
      <div className="container-x">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item) => (
            <li key={item.title} className="bg-paper py-6 sm:px-6 sm:first:pl-0 lg:py-8">
              <h2 className="font-display text-[0.98rem] font-semibold tracking-tight text-brand">
                {item.title}
              </h2>
              <p className="mt-1.5 text-[0.89rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
