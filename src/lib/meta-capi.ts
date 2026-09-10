type LeadFormData = {
  nome: string;
  email: string;
  whatsapp: string;
  cnpj: string;
};

type MetaLeadEvent = {
  eventId: string;
  sourceUrl: string;
  form: LeadFormData;
};

export const sendMetaLeadEvent = async ({ eventId, sourceUrl, form }: MetaLeadEvent) => {
  const endpoint = import.meta.env.VITE_META_CAPI_ENDPOINT?.trim();

  if (!endpoint) {
    return { ok: true, skipped: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId,
        sourceUrl,
        form
      })
    });

    return { ok: response.ok, skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
};