"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { mailHref, telHref } from "@/lib/contact";
import { ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon } from "./ui/Icons";

/**
 * Aanvraagflow in vier stappen:
 *   1. Werkzaamheden  2. Organisatie  3. Omvang  4. Contactgegevens
 *
 * Opzet:
 *  - Stap 1 vraagt alleen een tik: geen formulier in beeld bij binnenkomst.
 *  - Organisatie komt vroeg: de aanvraag kwalificeert zichzelf op pandtype
 *    en plaats, zodat er niet eerst gebeld hoeft te worden om dat te vragen.
 *  - Omvang bepaalt of er een losse offerte of een contractvoorstel komt.
 *  - Contactgegevens pas in stap 4, als iemand al geïnvesteerd heeft.
 *  - Alles blijft in één scherm; geen routing, geen formulierbibliotheek.
 *
 * De flow eindigt in een kennismaking, niet in een prijs: bij doorlopend werk
 * is een gesprek de realistische eerste stap, en een bedrag op dit moment
 * zou toch nergens op gebaseerd zijn.
 *
 * Alle vraagteksten en keuzes staan in siteConfig.inquiry.
 *
 * PRODUCTIE: de inzending gaat naar /api/contact. Zie
 * src/app/api/contact/route.ts voor de plek waar je e-mail, een webhook, een
 * CRM of een afsprakentool koppelt.
 */

type FormState = {
  work: string[];
  company: string;
  place: string;
  locationType: string;
  scope: string;
  scopeId: string;
  locationCount: string;
  name: string;
  email: string;
  phone: string;
  preference: string;
  message: string;
};

const EMPTY: FormState = {
  work: [],
  company: "",
  place: "",
  locationType: "",
  scope: "",
  scopeId: "",
  locationCount: "",
  name: "",
  email: "",
  phone: "",
  preference: "bellen",
  message: "",
};

export function InquiryForm() {
  const { inquiry, serviceArea, business, demoMode, demoLabels } = siteConfig;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const stepCount = inquiry.stepLabels.length;

  const canContinue =
    (step === 0 && form.work.length > 0) ||
    (step === 1 && form.company.trim() !== "" && form.place.trim() !== "") ||
    (step === 2 && form.scopeId !== "");

  /**
   * Bij een stapwissel verandert de hoogte van het formulier. Zonder dit staat
   * iemand op mobiel ineens halverwege de volgende vraag te kijken.
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  function toggleWork(label: string) {
    setForm((f) => ({
      ...f,
      work: f.work.includes(label)
        ? f.work.filter((w) => w !== label)
        : [...f.work, label],
    }));
  }

  /** De omvangstap springt automatisch door: scheelt een tik. */
  function pickScope(option: (typeof inquiry.scopeOptions)[number]) {
    setForm((f) => ({ ...f, scope: option.label, scopeId: option.id }));
    setTimeout(() => setStep((s) => Math.min(s + 1, stepCount - 1)), 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={panelRef}
        className="scroll-mt-28 rounded-[3px] border border-line bg-paper p-6 text-center text-ink sm:p-7 md:p-10"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-[1.45rem]">{inquiry.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          {inquiry.successBody}
        </p>
        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <a href={telHref} className="btn btn-outline flex-1">
            <PhoneIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
            {business.phone.display}
          </a>
          <a href={mailHref} className="btn btn-outline flex-1">
            <MailIcon className="h-[1.05rem] w-[1.05rem] text-accent" />
            E-mail
          </a>
        </div>
        {demoMode && (
          <p className="mt-6 text-[0.88rem] text-muted">
            {demoLabels.formSuccessNotice}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className="scroll-mt-28 rounded-[3px] border border-line bg-paper text-ink"
    >
      {/* Voortgang: laat zien dat het kort is */}
      <div className="border-b border-line px-5 pt-5 pb-4 md:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="label-xs text-[0.66rem] text-ink">
            <span className="tnum">
              Stap {step + 1}/{stepCount}
            </span>
            <span className="ml-2.5 text-muted">{inquiry.stepLabels[step]}</span>
          </p>
          <p className="label-xs shrink-0 text-[0.66rem] text-muted">
            {inquiry.estimatedTime}
          </p>
        </div>
        <div className="mt-2.5 flex gap-1" aria-hidden="true">
          {inquiry.stepLabels.map((label, i) => (
            <span
              key={label}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-stone-dark"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 md:p-7">
        {/* ── Stap 1: werkzaamheden ──────────────────────────────────── */}
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-[1.2rem] font-semibold tracking-tight text-ink md:text-[1.35rem]">
              {inquiry.steps.work.question}
            </legend>
            <p className="mt-1.5 text-[0.93rem] text-muted">{inquiry.steps.work.help}</p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {inquiry.workOptions.map((option) => {
                const active = form.work.includes(option.label);
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-[3px] border p-4 text-[0.94rem] font-medium text-ink transition-colors ${
                      active
                        ? "border-brand bg-stone"
                        : "border-line hover:border-line-strong"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleWork(option.label)}
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border ${
                        active ? "border-brand bg-brand text-white" : "border-line-strong"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <CheckIcon className="h-3.5 w-3.5" />}
                    </span>
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ── Stap 2: organisatie ────────────────────────────────────── */}
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-[1.2rem] font-semibold tracking-tight text-ink md:text-[1.35rem]">
              {inquiry.steps.organisation.question}
            </legend>
            <p className="mt-1.5 text-[0.93rem] text-muted">
              {inquiry.steps.organisation.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label={inquiry.orgLabels.company}
                name="company"
                autoComplete="organization"
                required
                className="sm:col-span-2"
                value={form.company}
                onChange={(v) => setForm((f) => ({ ...f, company: v }))}
              />
              <div className="flex min-w-0 flex-col">
                <label htmlFor="place" className="text-[0.87rem] font-semibold text-ink">
                  {inquiry.orgLabels.place}
                </label>
                <input
                  id="place"
                  name="place"
                  list="service-area-places"
                  required
                  autoComplete="address-level2"
                  value={form.place}
                  onChange={(e) => setForm((f) => ({ ...f, place: e.target.value }))}
                  className="mt-1.5 min-h-12 w-full rounded-[3px] border border-line bg-stone px-3.5 text-base text-ink outline-none focus:border-brand"
                />
                <datalist id="service-area-places">
                  {serviceArea.places.map((place) => (
                    <option key={place} value={place} />
                  ))}
                </datalist>
              </div>
              <div className="flex min-w-0 flex-col">
                <label
                  htmlFor="locationType"
                  className="text-[0.87rem] font-semibold text-ink"
                >
                  {inquiry.orgLabels.locationType}
                </label>
                <select
                  id="locationType"
                  name="locationType"
                  value={form.locationType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, locationType: e.target.value }))
                  }
                  className="mt-1.5 min-h-12 w-full rounded-[3px] border border-line bg-stone px-3 text-base text-ink outline-none focus:border-brand"
                >
                  <option value="">Maak een keuze</option>
                  {inquiry.locationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-4 text-[0.87rem] text-muted">
              We werken in {serviceArea.regionLong}.
            </p>
          </fieldset>
        )}

        {/* ── Stap 3: omvang ─────────────────────────────────────────── */}
        {step === 2 && (
          <fieldset>
            <legend className="font-display text-[1.2rem] font-semibold tracking-tight text-ink md:text-[1.35rem]">
              {inquiry.steps.scope.question}
            </legend>
            <p className="mt-1.5 text-[0.93rem] text-muted">
              {inquiry.steps.scope.help}
            </p>

            <div className="mt-5 grid gap-2.5">
              {inquiry.scopeOptions.map((option) => {
                const active = form.scopeId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => pickScope(option)}
                    aria-pressed={active}
                    className={`flex items-center justify-between gap-3 rounded-[3px] border p-4 text-left transition-colors ${
                      active ? "border-brand bg-stone" : "border-line hover:border-line-strong"
                    }`}
                  >
                    <span>
                      <span className="block text-[0.94rem] font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-[0.85rem] text-muted">
                        {option.help}
                      </span>
                    </span>
                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted" />
                  </button>
                );
              })}
            </div>

            {/* Optionele kwalificatie — mag leeg blijven */}
            <div className="mt-5 flex min-w-0 flex-col">
              <label
                htmlFor="locationCount"
                className="text-[0.87rem] font-semibold text-ink"
              >
                {inquiry.locationCountLabel}{" "}
                <span className="font-normal text-muted">(optioneel)</span>
              </label>
              <select
                id="locationCount"
                name="locationCount"
                value={form.locationCount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, locationCount: e.target.value }))
                }
                className="mt-1.5 min-h-12 w-full rounded-[3px] border border-line bg-stone px-3 text-base text-ink outline-none focus:border-brand"
              >
                <option value="">Weet ik nog niet</option>
                {inquiry.locationCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        )}

        {/* ── Stap 4: contactgegevens ────────────────────────────────── */}
        {step === 3 && (
          <fieldset>
            <legend className="font-display text-[1.2rem] font-semibold tracking-tight text-ink md:text-[1.35rem]">
              {inquiry.steps.contact.question}
            </legend>
            <p className="mt-1.5 text-[0.93rem] text-muted">
              {inquiry.steps.contact.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label={inquiry.contactLabels.name}
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label={inquiry.contactLabels.phone}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <Field
                label={inquiry.contactLabels.email}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="sm:col-span-2"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
            </div>

            {/* Voorkeurskanaal — scheelt een misgelopen belpoging */}
            <fieldset className="mt-5">
              <legend className="text-[0.87rem] font-semibold text-ink">
                {inquiry.contactLabels.preference}
              </legend>
              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                {inquiry.contactPreferences.map((option) => {
                  const active = form.preference === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex flex-1 cursor-pointer items-center gap-3 rounded-[3px] border p-3.5 text-[0.94rem] font-medium text-ink transition-colors ${
                        active
                          ? "border-brand bg-stone"
                          : "border-line hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="preference"
                        className="sr-only"
                        checked={active}
                        onChange={() =>
                          setForm((f) => ({ ...f, preference: option.id }))
                        }
                      />
                      <span
                        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border ${
                          active ? "border-brand" : "border-line-strong"
                        }`}
                        aria-hidden="true"
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-brand" />}
                      </span>
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5 flex min-w-0 flex-col">
              <label htmlFor="message" className="text-[0.87rem] font-semibold text-ink">
                {inquiry.contactLabels.message}{" "}
                <span className="font-normal text-muted">(optioneel)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Bijvoorbeeld: kantoorpand van drie verdiepingen, nu alles los geregeld. We zoeken één partij voor klein onderhoud en storingen."
                className="mt-1.5 w-full resize-y rounded-[3px] border border-line bg-stone p-3.5 text-base text-ink outline-none focus:border-brand"
              />
            </div>

            {status === "error" && (
              <p className="mt-4 rounded-[3px] border-l-[3px] border-accent bg-stone px-4 py-3 text-[0.9rem] text-ink">
                Het versturen lukte niet. Probeer het opnieuw, of bel ons op{" "}
                <a href={telHref} className="font-semibold underline">
                  {business.phone.display}
                </a>
                .
              </p>
            )}
          </fieldset>
        )}

        {/* ── Navigatie ──────────────────────────────────────────────── */}
        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline sm:w-auto"
            >
              {inquiry.backLabel}
            </button>
          )}

          {step < stepCount - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {inquiry.nextLabel}
              <ArrowRightIcon />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary flex-1 disabled:opacity-60"
            >
              {status === "sending" ? inquiry.sendingLabel : inquiry.submitLabel}
              <ArrowRightIcon />
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-muted">
          {inquiry.privacyNote}
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "type" | "onChange" | "className"
>) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={name} className="text-[0.87rem] font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* text-base (16px) voorkomt dat iOS automatisch inzoomt op het veld */
        className="mt-1.5 min-h-12 w-full rounded-[3px] border border-line bg-stone px-3.5 text-base text-ink outline-none focus:border-brand"
        {...rest}
      />
    </div>
  );
}
