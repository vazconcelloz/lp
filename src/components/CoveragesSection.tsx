import { BriefcaseBusiness, ChartNoAxesColumn, Handshake, LayoutDashboard, ShieldCheck, MapPinned } from "lucide-react";
import logoAmil from "@/assets/Logo-Amil.png";
import logoBradesco from "@/assets/Logo-Bradesco.png";
import logoOmint from "@/assets/Logo-Omint.png";
import logoPorto from "@/assets/Logo-Porto.webp";
import logoSulamerica from "@/assets/Logo-Sulamerica.webp";

const coverages = [
  {
    icon: BriefcaseBusiness,
    title: "Entregamos soluções personalizadas",
    description:
      "Escolha os planos que mais se encaixam no seu perfil e no seu investimento, na FBN você encontra o que precisa para ter o melhor custo benefício do mercado para sua empresa.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Análises preventivas",
    description:
      "Monitoramos seu contrato constantemente para evitar surpresas negativas, como mudanças inesperadas e reajustes elevados.",
  },
  {
    icon: Handshake,
    title: "Flexibilidade de escolha",
    description:
      "Escolha seu médico ou tratamento e conte com a nossa assessoria para antecipar previsão e obter reembolsos.",
  },
  {
    icon: LayoutDashboard,
    title: "Portal Personalizado",
    description:
      "A FBN disponibiliza um portal personalizado para suporte e movimentação de segurados, facilitando a vida do seu RH.",
  },
  {
    icon: ShieldCheck,
    title: "Acesso privilegiado",
    description:
      "Conheça seus direitos. A FBN faz questão de mostrar os benefícios disponíveis. Informações atualizadas, podem trazer grandes economias, se bem utilizado.",
  },
  {
    icon: MapPinned,
    title: "Seu plano onde você precisa",
    description:
      "Analisamos e adequamos a oferrta baseando-se nas localidades que são importantes para você.",
  },
];

const healthOperators = [
  { name: "Amil", logo: logoAmil },
  { name: "Bradesco Saude", logo: logoBradesco },
  { name: "Omint", logo: logoOmint },
  { name: "Porto", logo: logoPorto },
  { name: "SulAmerica", logo: logoSulamerica },
];

const CoveragesSection = () => {
  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-10 bg-section-gray">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-primary mb-12">
          Coberturas e <span className="text-primary">Assistências</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverages.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-14">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-center text-primary mb-6">
            Tenha acesso às melhores operadoras do mercado.
          </h3>

          <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {healthOperators.map((operator) => (
              <div
                key={operator.name}
                className={
                  operator.name === "SulAmerica"
                    ? "h-24 px-4 flex items-center justify-center col-span-2 md:col-span-1"
                    : "h-24 px-4 flex items-center justify-center"
                }
              >
                <img
                  src={operator.logo}
                  alt={`Logo ${operator.name}`}
                  className="max-h-12 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoveragesSection;
