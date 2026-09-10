type LeadFormData = {
  nome: string;
  email: string;
  whatsapp: string;
  cnpj: string;
};

type LeadRequestBody = {
  eventId: string;
  sourceUrl?: string;
  form: LeadFormData;
};

type Env = {
  META_PIXEL_ID: string;
  META_ACCESS_TOKEN: string;
  META_TEST_EVENT_CODE?: string;
  META_API_VERSION?: string;
  ALLOWED_ORIGIN?: string;
};

const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });

const corsHeaders = (origin: string | null, env: Env) => {
  const allowedOrigin = env.ALLOWED_ORIGIN?.trim();

  return {
    "Access-Control-Allow-Origin": allowedOrigin || origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
};

const normalize = (value: string) => value.trim().toLowerCase();

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const sha256 = async (value: string) => {
  const encoded = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", encoded);

  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const buildPayload = async (body: LeadRequestBody, env: Env, request: Request) => {
  const nomeParts = body.form.nome.trim().split(/\s+/).filter(Boolean);
  const firstName = nomeParts[0] ?? "";
  const lastName = nomeParts.slice(1).join(" ");
  const eventSourceUrl = body.sourceUrl || request.headers.get("origin") || request.url;

  const userData: Record<string, string[] | undefined> = {
    em: [await sha256(normalize(body.form.email))],
    ph: [await sha256(digitsOnly(body.form.whatsapp))],
    external_id: [await sha256(digitsOnly(body.form.cnpj))]
  };

  if (firstName) {
    userData.fn = [await sha256(normalize(firstName))];
  }

  if (lastName) {
    userData.ln = [await sha256(normalize(lastName))];
  }

  return {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventSourceUrl,
        event_id: body.eventId,
        user_data: userData,
        custom_data: {
          content_name: "Formulario Estudo",
          form_name: "formulario-estudo"
        }
      }
    ],
    test_event_code: env.META_TEST_EVENT_CODE?.trim() || undefined
  };
};

export default {
  async fetch(request: Request, env: Env) {
    const origin = request.headers.get("origin");
    const headers = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }

    try {
      const body = (await request.json()) as LeadRequestBody;

      if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
        return json({ error: "Missing Meta configuration" }, 500, headers);
      }

      if (!body?.eventId || !body?.form?.nome || !body?.form?.email || !body?.form?.whatsapp || !body?.form?.cnpj) {
        return json({ error: "Invalid payload" }, 400, headers);
      }

      const payload = await buildPayload(body, env, request);
      const apiVersion = env.META_API_VERSION?.trim() || "v20.0";
      const metaResponse = await fetch(
        `https://graph.facebook.com/${apiVersion}/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const metaResult = await metaResponse.json();

      return json(
        {
          ok: metaResponse.ok,
          metaResult
        },
        metaResponse.ok ? 200 : 502,
        headers
      );
    } catch (error) {
      return json(
        {
          error: error instanceof Error ? error.message : "Unexpected error"
        },
        500,
        headers
      );
    }
  }
};