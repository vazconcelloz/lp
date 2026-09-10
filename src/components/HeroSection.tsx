import React from "react";
// import heroBg from "@/assets/hero-bg.jpg";
import videoThumb from "@/assets/video.png";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("formulario-estudo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [showVideo, setShowVideo] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "VideoView", {
        video_title: "Planos de saúde não são todos iguais"
      });
    }

    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "VideoView", {
        video_title: "Planos de saúde não são todos iguais"
      });
    }
  };

  return (
    <section className="relative bg-primary">
      <div className="container px-4 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Video Side */}
          <div className="relative overflow-visible rounded-3xl aspect-[16/8.3] w-full bg-black" style={{ top: '-8px' }}>
            {/* Imagem de fundo do hero */}
            <img
              src={videoThumb}
              alt="Thumbnail do vídeo"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl z-0 animate-oscillate"
              style={{ filter: 'brightness(0.7)', animation: 'oscillate-bright 2.2s ease-in-out infinite' }}
            />
            {/* Keyframes para animação blink */}
            <style>{`
              @keyframes oscillate-bright {
                0% { filter: brightness(0.7); }
                40% { filter: brightness(1.1); }
                60% { filter: brightness(1.1); }
                100% { filter: brightness(0.7); }
              }
            `}</style>
            {/* Overlay para garantir contraste */}
            <div className="absolute inset-0 bg-black/40 rounded-3xl z-10 pointer-events-none" />
            <div className="w-full h-full relative aspect-[16/9]">
              {/* Thumb visível enquanto vídeo não carregou */}
              <>
                <span className={`absolute left-0 right-0 top-[38.5%] flex items-center justify-center z-10 transition-opacity duration-500 ${showVideo && videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <span className="w-16 h-16 rounded-full bg-primary-foreground/90 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 fill-primary" />
                  </span>
                </span>
                {!showVideo && (
                  <p className="absolute bottom-4 left-4 right-4 text-center text-primary-foreground font-heading font-bold text-lg md:text-xl drop-shadow z-20 transition-opacity duration-500">
                    Planos de saúde não são todos iguais!
                  </p>
                )}
                {/* Overlay para clique */}
                {!showVideo && (
                  <span className="absolute inset-0 cursor-pointer z-20" onClick={handleVideoClick} aria-label="Assistir vídeo"></span>
                )}
              </>
              {/* Vídeo só aparece quando showVideo=true */}
              {showVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ddmvz64Bl28?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full object-cover rounded-3xl absolute top-0 left-0"
                  style={{ zIndex: 30 }}
                  onLoad={() => setVideoLoaded(true)}
                ></iframe>
              )}
            </div>
          </div>

          {/* CTA Side */}
          <div className="text-primary-foreground text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold leading-tight">
              O Plano de saúde
              <br />
              ideal para
              <br />
              <span className="block text-primary-foreground/90">
                <strong>sua empresa</strong>
              </span>
            </h1>

            <p className="mt-4 text-primary-foreground/85 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              Valorize sua empresa e seus colaboradores
              <br />
              saúde é uma prioridade.
            </p>

            <div className="mt-4 space-y-3 max-w-sm mx-auto md:mx-0">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="w-full justify-between bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-heading font-bold text-base h-14 shadow-lg"
              >
                <span>Realizar Estudo</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
