import logoAbccom from "@/assets/Logo-Abccom.png";
import logoFrison from "@/assets/Logo-Frison.png";
import logoGiO from "@/assets/Logo-GIO.png";
import logoHurst from "@/assets/Logo-Hurst.png";
import logoLaav from "@/assets/Logo-LAAV.png";
import logoLenvie from "@/assets/Logo-Lenvie.png";
import logoMedassist from "@/assets/Logo-Medassist.png";
import logoMkt4u from "@/assets/Logo-MKT4U.png";
import logoOdontoclinic from "@/assets/Logo-Odontoclinic.png";
import logoOralunic from "@/assets/Logo-Oralunic.png";
import logoSorridents from "@/assets/Logo-Sorridents.png";
import logoSpecialist from "@/assets/Logo-Specialist.jpg";
import logoTransripoli from "@/assets/transripoli-logo.png";
import logoDupps from "@/assets/Logo-Dupps.png";

type ClientLogo = {
  name: string;
  logo: string;
  logoClassName?: string;
};

const clientsRow1: ClientLogo[] = [
  { name: "Sorridents", logo: logoSorridents },
  { name: "LAAV", logo: logoLaav, logoClassName: "scale-[3.1]" },
  { name: "Frison", logo: logoFrison },
  { name: "GiO", logo: logoGiO, logoClassName: "scale-[1.45]" },
  { name: "OralUnic", logo: logoOralunic, logoClassName: "translate-y-1" },
  { name: "MKT4U", logo: logoMkt4u },
  { name: "Odontoclinic", logo: logoOdontoclinic },
];

const clientsRow2: ClientLogo[] = [
  { name: "Abccom", logo: logoAbccom },
  { name: "Medassist", logo: logoMedassist, logoClassName: "scale-[1.8]" },
  { name: "Lenvie", logo: logoLenvie },
  { name: "Hurst", logo: logoHurst, logoClassName: "scale-[1.75]" },
  { name: "Specialist", logo: logoSpecialist, logoClassName: "h-16 w-32 md:h-20 md:w-40 lg:h-24 lg:w-48 max-h-none max-w-none" },
  { name: "Transripoli", logo: logoTransripoli },
  { name: "Dupps", logo: logoDupps },
];

const MarqueeRow = ({ clients, direction }: { clients: ClientLogo[]; direction: "left" | "right" }) => {
  const doubled = [...clients, ...clients];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden relative">
      <div className={`flex gap-6 w-max ${animationClass}`}>
        {doubled.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex items-center justify-center h-16 w-44 p-3 shrink-0"
          >
            <img
              src={client.logo}
              alt={`Logo ${client.name}`}
              className={`h-full w-full object-contain ${client.logoClassName ?? ""}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientsSection = () => {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-8 mb-12">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-foreground">
          Empresas que confiam e são clientes da <span className="text-primary">FBN</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow clients={clientsRow1} direction="left" />
        <MarqueeRow clients={clientsRow2} direction="right" />
      </div>
    </section>
  );
};

export default ClientsSection;
