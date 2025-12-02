import rings from "@/assets/imgs/IMG_6162.JPEG.jpg";
import weddingTable from "@/assets/imgs/IMG_7841.JPG";
import venueLights from "@/assets/imgs/IMG_7842.JPG";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useContent } from "@/hooks/useContent";
import { useGallery } from "@/hooks/useGallery";

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-sans font-light text-white tracking-wider">
                SphinxWeddings
              </h1>
            </Link>

            <Link to="/gallery">
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white/80 hover:bg-white/10">
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
          <div className="flex justify-center gap-3 mb-8">
            <Moon className="w-8 h-8 text-sage" />
            <Star className="w-8 h-8 text-sage" />
            <Sparkles className="w-8 h-8 text-sage" />
          </div>
          <div
            className="text-5xl md:text-7xl font-sans font-light text-sage mb-6 tracking-wide"
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
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 space-y-4">
            {nightImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer bg-white/5 transition-all duration-500 break-inside-avoid mb-4 rounded-lg"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div
                      className="text-white font-sans text-xl font-light"
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

