import coupleHands from "@/assets/imgs/IMG_6172.JPEG.jpg";
import bouquet from "@/assets/imgs/IMG_7448.JPG";
import venueLights from "@/assets/imgs/IMG_7842.JPG";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flower2, Sun, Trees } from "lucide-react";
import { Link } from "react-router-dom";

import { useContent } from "@/hooks/useContent";
import { useGallery } from "@/hooks/useGallery";

const OutdoorEvents = () => {
  const { images: dynamicImages } = useGallery("outdoor");
  const { getText } = useContent();

  const staticOutdoorImages = [
    { src: weddingCeremony, alt: "Outdoor wedding ceremony", title: "Garden Ceremony" },
    { src: coupleHands, alt: "Couple in nature", title: "Natural Setting" },
    { src: bouquet, alt: "Outdoor floral arrangements", title: "Fresh Blooms" },
    { src: venueLights, alt: "Outdoor venue with lights", title: "Open Air Elegance" },
    { src: weddingCeremony, alt: "Outdoor celebration", title: "Al Fresco Dining" },
    { src: bouquet, alt: "Garden details", title: "Nature's Beauty" },
  ];

  const outdoorImages = [
    ...staticOutdoorImages,
    ...dynamicImages.map((img) => ({
      src: img.image_url,
      alt: img.alt || "Outdoor Event",
      title: img.title || "Outdoor Event",
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-light text-primary tracking-wider">
                SphinxWeddings
              </h1>
            </Link>

            <Link to="/gallery">
              <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
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
            <Sun className="w-8 h-8 text-sage" />
            <Trees className="w-8 h-8 text-sage" />
            <Flower2 className="w-8 h-8 text-sage" />
          </div>
          <div
            className="text-5xl md:text-7xl font-serif font-light text-sage mb-6 tracking-wide"
            dangerouslySetInnerHTML={{ __html: getText("outdoor-title") }}
          />
          <div
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light text-justify"
            dangerouslySetInnerHTML={{ __html: getText("outdoor-subtitle") }}
          />
        </div>
      </section>

      {/* Minimal Gallery Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {outdoorImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden aspect-square bg-muted/30"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/10 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div
                      className="text-white font-serif text-xl font-light"
                      dangerouslySetInnerHTML={{ __html: image.title }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-sage/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-light">© 2025 SphinxWeddings</p>
        </div>
      </footer>
    </div>
  );
};

export default OutdoorEvents;
