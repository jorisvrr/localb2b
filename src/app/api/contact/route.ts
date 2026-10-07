import { NextResponse } from "next/server";

/**
 * ============================================================================
 *  AANVRAGEN — integratiepunt voor productie
 * ============================================================================
 *
 *  In de demo gebeurt er bewust niets met de aanvraag: hij wordt gevalideerd,
 *  gelogd en met een OK beantwoord. Zo kan de flow volledig getest worden
 *  zonder database, account of externe dienst. Er wordt dus géén CRM of
 *  backend gesuggereerd die er niet is.
 *
 *  Voor een echte klant hoef je alleen hieronder één koppeling aan te zetten:
 *
 *   1. WEBHOOK (makkelijkst — Make, Zapier, n8n, eigen endpoint)
 *      Zet CONTACT_WEBHOOK_URL in de Vercel environment variables.
 *      Werkt dan meteen; onderstaande code doet de rest.
 *
 *   2. E-MAIL via Resend
 *      npm i resend
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({ from, to, subject, text });
 *
 *   3. FORMSPREE / Formcarry
 *      Vervang de fetch hieronder door een POST naar de formulier-endpoint.
 *
 *   4. CRM (HubSpot, Pipedrive, Teamleader) of Supabase
 *      Maak vanuit deze route een lead of deal aan.
 *
 *   5. AFSPRAKENTOOL
 *      `preference` en `scopeId` zijn de velden om op te routeren: iemand die
 *      "Bel mij" kiest hoort in een belijst, niet in een mailbox.
 *
 *  Let op bij livegang: voeg spam-bescherming toe (honeypot-veld of Turnstile)
 *  en stel een AVG-conforme bewaartermijn in voor de aanvragen.
 * ============================================================================
 */

type InquiryPayload = {
  work: string[];
  company: string;
  place: string;
  locationType: string;
  /** Label zoals de bezoeker het zag */
  scope: string;
  /** Stabiele id — gebruik deze om op te routeren, niet het label */
  scopeId: string;
  locationCount: string;
  name: string;
  email: string;
  phone: string;
  /** "bellen" of "email" */
  preference: string;
  message: string;
};

function isValid(body: unknown): body is InquiryPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.work) &&
    typeof b.company === "string" &&
    b.company.trim().length > 1 &&
    typeof b.name === "string" &&
    b.name.trim().length > 1 &&
    typeof b.email === "string" &&
    b.email.includes("@")
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Vul bedrijfsnaam, naam en e-mailadres in." },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          receivedAt: new Date().toISOString(),
          source: "website-aanvraagformulier",
          /** Maakt het scheiden van contractkansen en losse klussen triviaal */
          isRecurring: ["maandelijks", "wekelijks", "contract"].includes(
            body.scopeId,
          ),
        }),
      });
      if (!res.ok) throw new Error(`Webhook antwoordde met ${res.status}`);
    } catch (error) {
      console.error("[aanvraag] doorsturen mislukt:", error);
      return NextResponse.json({ error: "Versturen mislukt" }, { status: 502 });
    }
  } else {
    // DEMO-modus: geen webhook ingesteld, dus alleen loggen.
    console.info("[aanvraag] demo-aanvraag ontvangen:", body);
  }

  return NextResponse.json({ ok: true });
}
