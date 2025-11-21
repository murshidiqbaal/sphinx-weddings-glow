import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Star, Sparkles } from "lucide-react";
import venueLights from "@/assets/venue-lights.jpg";
import weddingTable from "@/assets/wedding-table.jpg";
import rings from "@/assets/rings.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";

const NightEvents = () => {
  const nightImages = [
    { src: venueLights, alt: "Evening venue with lights", title: "Starlit Ambiance" },
    { src: weddingTable, alt: "Night reception table", title: "Candlelit Elegance" },
    { src: rings, alt: "Rings with evening light", title: "Moonlit Promises" },
    { src: venueLights, alt: "Night celebration", title: "Evening Magic" },
    { src: weddingTable, alt: "Night dining setup", title: "Twilight Dining" },
    { src: weddingCeremony, alt: "Evening ceremony", title: "Dusk Celebration" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-sage/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-light text-sage tracking-wider">
                SphinxWeddings
              </h1>
            </Link>
            
            <Link to="/gallery">
              <Button variant="ghost" size="sm" className="gap-2 text-sage hover:text-sage/80 hover:bg-sage/5">
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
          <h2 className="text-5xl md:text-7xl font-serif font-light text-sage mb-6 tracking-wide">
            Night Events
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Illuminated moments under the stars
          </p>
        </div>
      </section>

      {/* Minimal Gallery Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {nightImages.map((image, index) => (
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-sage font-serif text-xl font-light">
                      {image.title}
                    </h3>
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

export default NightEvents;
