import landingImage from "@/assets/Gride 21.jpg.jpeg";
import mobileBg from "@/assets/ben wed0234.JPG.jpeg";
import rings from "@/assets/imgs/IMG_6162.JPEG.jpg";
import weddingTable from "@/assets/imgs/IMG_7841.JPG";
import venueLights from "@/assets/imgs/IMG_7842.JPG";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import CursorGlow from "@/components/CursorGlow";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import { useGallery } from "@/hooks/useGallery";
import { ArrowLeft, Moon, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NightEvents = () => {
  const { images: dynamicImages } = useGallery("night");
  const { getText } = useContent();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const staticNightImages = [
    { src: venueLights, alt: "Evening venue with lights", title: "Starlit Ambiance" },
    { src: weddingTable, alt: "Night reception table", title: "Candlelit Elegance" },
    { src: rings, alt: "Rings with evening light", title: "Moonlit Promises" },
    { src: venueLights, alt: "Night celebration", title: "Evening Magic" },
    { src: weddingTable, alt: "Night dining setup", title: "Twilight Dining" },
    { src: weddingCeremony, alt: "Evening ceremony", title: "Dusk Celebration" },
  ];

  const nightImages = [
    ...staticNightImages,
    ...dynamicImages.map((img) => ({
      src: img.image_url,
      alt: img.alt || "Night Event",
      title: img.title || "Night Event",
    })),
  ];

  const [headerDark] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate random stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 3}s`
  }));

  // Generate random fireflies
  const fireflies = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${10 + Math.random() * 20}s`,
    delay: `${Math.random() * 5}s`
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".glass-card");
      cards.forEach((card) => {
        const item = card as HTMLElement;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation for tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        item.style.setProperty("--mouse-x", `${x}px`);
        item.style.setProperty("--mouse-y", `${y}px`);
        item.style.setProperty("--rotate-x", `${rotateX}deg`);
        item.style.setProperty("--rotate-y", `${rotateY}deg`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans text-foreground relative selection:bg-sage/30">
      {/* Background Layer - Desktop (Darker for Night Effect) */}
      <div
        className={`hidden md:block fixed inset-0 z-[-1] bg-cover bg-center transition-all duration-1000 transform scale-105 ${headerDark ? "blur-md" : "blur-0"}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(100,100,255,0.05) 0%, rgba(0,0,0,0) 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.95) 100%),
            url('${landingImage}')
          `
        }}
      />

      {/* Background Layer - Mobile (Darker for Night Effect) */}
      <div
        className={`md:hidden fixed inset-0 z-[-1] bg-cover bg-center transition-all duration-1000 transform scale-105 ${headerDark ? "blur-md" : "blur-0"}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(100,100,255,0.05) 0%, rgba(0,0,0,0) 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.95) 100%),
            url('${mobileBg}')
          `
        }}
      />

      {/* Night Atmosphere Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              '--duration': star.duration
            } as React.CSSProperties}
          />
        ))}

        {/* Fireflies */}
        {fireflies.map((fly) => (
          <div
            key={fly.id}
            className="firefly"
            style={{
              left: fly.left,
              '--duration': fly.duration,
              '--delay': fly.delay
            } as React.CSSProperties}
          />
        ))}
      </div>

      <CursorGlow />
      <div className="bg-noise" />
      {/* Accent Blobs - Cooler Night Tones */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-700" />
      </div>
      {/* Minimal Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4`}>
        <div className="container mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-md rounded-full py-2 px-6 border border-white/5 shadow-lg flex justify-between items-center max-w-5xl mx-auto">
            <Link to="/" className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-sans font-light text-white tracking-wider">
                SphinxWeddings
              </h1>
            </Link>

            <Link to="/gallery">
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white hover:bg-white/10 rounded-full">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Gallery</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Minimal */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-3 mb-8 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
            <Moon className="w-8 h-8 text-blue-200 relative z-10 animate-bounce-slow" />
            <Star className="w-8 h-8 text-blue-200 relative z-10 animate-pulse" />
            <Sparkles className="w-8 h-8 text-blue-200 relative z-10 animate-pulse delay-700" />
          </div>
          <div
            className="text-5xl md:text-7xl font-sans font-light text-white mb-6 tracking-wide drop-shadow-[0_0_25px_rgba(100,149,237,0.6)]"
            dangerouslySetInnerHTML={{ __html: getText("night-title") }}
          />
          <div
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light text-justify"
            dangerouslySetInnerHTML={{ __html: getText("night-subtitle") }}
          />
        </div>
      </section>

      {/* Minimal Gallery Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-1">
            {nightImages.map((image, index) => (
              <div
                key={index}
                className="glass-card group relative overflow-hidden cursor-pointer break-inside-avoid mb-2 p-2 bg-black/40 border-white/5"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="shimmer absolute inset-0 pointer-events-none opacity-50" />
                <div className="overflow-hidden rounded-[32px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[32px]">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                    <div
                      className="text-white font-sans text-xl font-light tracking-wide"
                      dangerouslySetInnerHTML={{ __html: image.title }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-sage hover:text-sage/60 transition-colors text-4xl font-light"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 font-light">© 2025 SphinxWeddings</p>
        </div>
      </footer>
    </div>
  );
};

export default NightEvents;

