import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

const CTASection = () => {
  const [whatsapp, setWhatsapp] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nome = String(formData.get("nome") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const planoAtivo = String(formData.get("planoAtivo") ?? "").trim();

    if (!nome || !email || !whatsapp.trim() || !cnpj.trim() || !planoAtivo) {
      setFeedbackMessage("Preencha todos os campos para enviar o formulario.");
      setShowSuccessPopup(false);
      return;
    }

    setFeedbackMessage("");
    setShowSuccessPopup(true);
    form.reset();
    setWhatsapp("");
    setCnpj("");
  };

  return (
    <section id="formulario-estudo" className="py-16 md:py-24 bg-primary">
      <div className="container px-4 md:px-8 text-center">

        <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-primary-foreground">
          Não perca mais tempo.{" "}
          <span className="text-primary-foreground/90 block mt-1">Faça seu estudo agora.</span>
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-foreground/80 text-sm">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary-foreground" /> Atendimento personalizado</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 max-w-3xl mx-auto bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-5 md:p-6 text-left">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cta-nome" className="text-primary-foreground font-semibold">*NOME:</Label>
              <Input id="cta-nome" name="nome" type="text" placeholder="Seu nome completo" className="bg-primary-foreground text-primary placeholder:text-primary/60 border-primary-foreground/50" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-email" className="text-primary-foreground font-semibold">*E-MAIL:</Label>
              <Input id="cta-email" name="email" type="email" placeholder="voce@empresa.com" className="bg-primary-foreground text-primary placeholder:text-primary/60 border-primary-foreground/50" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-whatsapp" className="text-primary-foreground font-semibold">*WHATSAPP:</Label>
              <Input
                id="cta-whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
                className="bg-primary-foreground text-primary placeholder:text-primary/60 border-primary-foreground/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-cnpj" className="text-primary-foreground font-semibold">*CNPJ:</Label>
              <Input
                id="cta-cnpj"
                name="cnpj"
                type="text"
                inputMode="numeric"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(event) => setCnpj(formatCnpj(event.target.value))}
                className="bg-primary-foreground text-primary placeholder:text-primary/60 border-primary-foreground/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-plano" className="text-primary-foreground font-semibold">*JÁ POSSUI UM PLANO ATIVO?</Label>
              <select id="cta-plano" name="planoAtivo" className="flex h-10 w-full rounded-md border border-primary-foreground/50 bg-primary-foreground px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60" required>
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Nao</option>
              </select>
            </div>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/90">
            Ao enviar, concordo em receber comunicações e conteúdos da FBN.
          </p>

          <Button type="submit" size="lg" className="mt-3 w-full md:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold text-base h-12">
            Enviar dados para estudo
          </Button>

          {feedbackMessage ? (
            <p className="mt-4 text-sm md:text-base text-primary-foreground font-medium">
              {feedbackMessage}
            </p>
          ) : null}
        </form>

        {showSuccessPopup ? (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 md:p-7 text-center shadow-2xl">
              <CheckCircle2 className="mx-auto h-16 w-16 text-blue-600" />
              <p className="mt-4 text-base md:text-lg font-semibold text-slate-900">
                Recebemos suas informações, um de nossos especialistas entrará em contato em breve
              </p>
              <Button type="button" className="mt-6" onClick={() => setShowSuccessPopup(false)}>
                Fechar
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CTASection;
