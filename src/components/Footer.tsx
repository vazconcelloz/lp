import logoFbn from "@/assets/logo-fbn.png";
import { MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-4">
      <div className="container px-4 md:px-8">
        <div className="grid sm:grid-cols-3 gap-3">
          {/* Logo + Address */}
          <div>
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src={logoFbn} alt="Grupo FBN" className="h-14 w-auto mb-1 brightness-0 invert cursor-pointer" />
            </a>
          </div>

          {/* Sobre a FBN */}
          <div>
            <h4 className="font-heading font-semibold mb-1 text-primary-foreground">Sobre a FBN</h4>
            <ul className="space-y-0.5 text-xs text-primary-foreground/80">
              <li><a href="https://grupofbn.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Acesse o site da FBN</a></li>
              <li><a href="https://blog.grupofbn.com.br/cultura-da-fbn-uma-transformacao-de-dentro-para-fora/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Cultura da FBN</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-semibold mb-1 text-primary-foreground">Fale com a FBN</h4>
            <ul className="space-y-0.5 text-xs text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5" />
                <a href="https://wa.me/5511934617280?text=Ol%C3%A1%2C%20estava%20na%20p%C3%A1gina%20de%20plano%20de%20sa%C3%BAde%20e%20fique%20com%20uma%20d%C3%BAvida" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a href="mailto:contato@grupofbn.com.br" className="hover:text-primary-foreground transition-colors">
                  contato@grupofbn.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/[0.03] mt-1.5 pt-3 text-center">
          <p className="text-[10px] text-primary-foreground/60 whitespace-nowrap">
            © {new Date().getFullYear()} Grupo FBN – Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
