import landingImage from "@/assets/Gride 21.jpg.jpeg";
import mobileBg from "@/assets/ben wed0234.JPG.jpeg";
import logo from "@/assets/logo/logo1.png";
import CursorGlow from "@/components/CursorGlow";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import { useGallery } from "@/hooks/useGallery";
import { Camera, Heart, Home, Leaf, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Category = "all" | "weddings" | "baptisms" | "corporate";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category[];
  title: string;
}

const Gallery = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerDark, setHeaderDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { images: dynamicImages } = useGallery("gallery");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const { getText, getImage } = useContent();

  const staticGalleryImages: GalleryImage[] = [
    {
      src: getImage("gallery-item-1-src"),
      alt: "Outdoor wedding ceremony",
      category: ["weddings"],
      title: getText("gallery-item-1-title"),
    },
    {
      src: getImage("gallery-item-2-src"),
      alt: "Wedding reception table",
      category: ["weddings"],
      title: getText("gallery-item-2-title"),
    },
    {
      src: getImage("gallery-item-3-src"),
      alt: "Couple holding hands",
      category: ["weddings"],
      title: getText("gallery-item-3-title"),
    },
    {
      src: getImage("gallery-item-4-src"),
      alt: "Wedding bouquet",
      category: ["weddings"],
      title: getText("gallery-item-4-title"),
    },
    {
      src: getImage("gallery-item-5-src"),
      alt: "Venue with string lights",
      category: ["weddings", "corporate"],
      title: getText("gallery-item-5-title"),
    },
    {
      src: getImage("gallery-item-6-src"),
      alt: "Wedding rings",
      category: ["weddings"],
      title: getText("gallery-item-6-title"),
    },
    {
      src: getImage("gallery-item-7-src"),
      alt: "Planning consultation",
      category: ["weddings", "baptisms", "corporate"],
      title: getText("gallery-item-7-title"),
    },
    {
      src: getImage("gallery-item-8-src"),
      alt: "Baptism celebration",
      category: ["baptisms"],
      title: getText("gallery-item-8-title"),
    },
    {
      src: getImage("gallery-item-9-src"),
      alt: "Corporate event venue",
      category: ["corporate"],
      title: getText("gallery-item-9-title"),
    },
    {
      src: getImage("gallery-item-10-src"),
      alt: "Wedding details",
      category: ["weddings"],
      title: getText("gallery-item-10-title"),
    },
    {
      src: getImage("gallery-item-11-src"),
      alt: "Romantic moment",
      category: ["weddings"],
      title: getText("gallery-item-11-title"),
    },
    {
      src: getImage("gallery-item-12-src"),
      alt: "Ceremony setup",
      category: ["weddings"],
      title: getText("gallery-item-12-title"),
    },
    // Reusing items for the remaining slots to maintain layout
    {
      src: getImage("gallery-item-7-src"),
      alt: "Event planning",
      category: ["corporate"],
      title: "Strategic Planning",
    },
    {
      src: getImage("gallery-item-6-src"),
      alt: "Engagement rings",
      category: ["weddings"],
      title: "The Promise",
    },
    {
      src: getImage("gallery-item-5-src"),
      alt: "Party atmosphere",
      category: ["weddings", "corporate"],
      title: "Night to Remember",
    },
    {
      src: getImage("gallery-item-2-src"),
      alt: "Table setting",
      category: ["weddings", "baptisms"],
      title: "Elegant Dining",
    },
    {
      src: getImage("gallery-item-3-src"),
      alt: "Together",
      category: ["weddings"],
      title: "Hand in Hand",
    },
    {
      src: getImage("gallery-item-4-src"),
      alt: "Floral arrangement",
      category: ["weddings"],
      title: "Natural Beauty",
    },
    {
      src: getImage("gallery-item-1-src"),
      alt: "Wedding day",
      category: ["weddings"],
      title: "The Big Day",
    },
  ];

  const mappedDynamicImages: GalleryImage[] = dynamicImages.map((img) => ({
    src: img.image_url,
    alt: img.alt || "Gallery Image",
    category: (img.category as Category[]) || ["weddings"],
    title: img.title || "Gallery Image",
  }));

  const galleryImages = [...staticGalleryImages, ...mappedDynamicImages];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category.includes(selectedCategory));

  const categories = [
    { id: "all" as Category, label: "All Events", icon: <Camera className="w-5 h-5" /> },
    { id: "weddings" as Category, label: "Weddings", icon: <Heart className="w-5 h-5" /> },
    { id: "baptisms" as Category, label: "Baptisms", icon: <Leaf className="w-5 h-5" /> },
    { id: "corporate" as Category, label: "Corporate", icon: <Camera className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen w-full font-sans text-foreground relative selection:bg-sage/30">
      {/* Background Layer - Desktop */}
      <div
        className={`hidden md:block fixed inset-0 z-[-1] bg-cover bg-center transition-all duration-1000 transform scale-105 ${headerDark ? "blur-md" : "blur-0"}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%),
            url('${landingImage}')
          `
        }}
      />

      {/* Background Layer - Mobile */}
      <div
        className={`md:hidden fixed inset-0 z-[-1] bg-cover bg-center transition-all duration-1000 transform scale-105 ${headerDark ? "blur-md" : "blur-0"}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%),
            url('${mobileBg}')
          `
        }}
      />

      <CursorGlow />
      <div className="bg-noise" />
      {/* Accent Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-700" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4`}>
        <div className="container mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-full py-2 px-6 border border-white/10 shadow-lg flex justify-between items-center max-w-5xl mx-auto">
            <Link to="/" className="flex items-center gap-2 drop-shadow-xl">
              <img
                src={logo}
                alt="Logo"
                className="h-12 transition-all duration-300 brightness-0 invert"
              />
              <span className="text-xl font-bold text-white transition-colors tracking-widest uppercase">
                {getText("site-title")}
              </span>
            </Link>

            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white hover:bg-white/10 rounded-full">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div
            className="text-5xl md:text-7xl font-sans font-light text-white mb-8 tracking-wide animate-fade-in"
            dangerouslySetInnerHTML={{ __html: getText("gallery-title") }}
          />

          {/* Collection Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/gallery/outdoor-events">
              <Button variant="outline" className="gap-2 border-sage/30 text-sage hover:bg-sage/10 hover:border-sage/50 font-light">
                <Sun className="w-4 h-4" />
                Outdoor Events
              </Button>
            </Link>
            <Link to="/gallery/night-events">
              <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 font-light bg-primary/5">
                <Moon className="w-4 h-4" />
                Night Events
              </Button>
            </Link>
          </div>

          <div
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light animate-fade-in text-justify"
            dangerouslySetInnerHTML={{ __html: getText("gallery-subtitle") }}
          />
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-8 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 glass-card p-4 rounded-full max-w-3xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="ghost"
                className={`gap-2 font-light rounded-full transition-all duration-300 ${selectedCategory === category.id
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-1">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="glass-card group relative overflow-hidden cursor-pointer break-inside-avoid mb-2 p-2"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="shimmer absolute inset-0 pointer-events-none" />
                <div className="overflow-hidden rounded-[32px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[32px]">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div
                      className="text-white font-sans text-xl font-light tracking-wide"
                      dangerouslySetInnerHTML={{ __html: image.title }}
                    />
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {image.category.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/90 font-light backdrop-blur-md"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
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

      {/* Call to Action */}
      <section className="py-20 border-t border-sage/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-sans font-light text-sage mb-6">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-light text-justify">
            Let's start planning your unforgettable celebration together
          </p>
          <Link to="/#contact">
            <Button className="bg-sage hover:bg-sage/90 text-background px-8 py-6 text-lg font-light">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-sage/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-light">© 2025 SphinxWeddings</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
