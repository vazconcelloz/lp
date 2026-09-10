import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/5511934617280?text=Ol%C3%A1%2C%20estava%20na%20p%C3%A1gina%20de%20plano%20de%20sa%C3%BAde%20e%20fique%20com%20uma%20d%C3%BAvida"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-xl shadow-primary/30 transition-all hover:scale-110 group"
      aria-label="Conversar pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card text-foreground text-sm font-semibold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco agora!
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
