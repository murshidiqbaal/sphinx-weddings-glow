import bouquet from "@/assets/bouquet.jpg";
import coupleHands from "@/assets/couple-hands.jpg";
import plannerConsultation from "@/assets/planner-consultation.jpg";
import rings from "@/assets/rings.jpg";
import venueLights from "@/assets/venue-lights.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import weddingTable from "@/assets/wedding-table.jpg";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Home, Leaf } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Category = "all" | "weddings" | "baptisms" | "corporate";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category[];
  title: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      src: weddingCeremony,
      alt: "Outdoor wedding ceremony",
      category: ["weddings"],
      title: "Garden Ceremony",
    },
    {
      src: weddingTable,
      alt: "Wedding reception table",
      category: ["weddings"],
      title: "Elegant Reception",
    },
    {
      src: coupleHands,
      alt: "Couple holding hands",
      category: ["weddings"],
      title: "Intimate Moments",
    },
    {
      src: bouquet,
      alt: "Wedding bouquet",
      category: ["weddings"],
      title: "Floral Artistry",
    },
    {
      src: venueLights,
      alt: "Venue with string lights",
      category: ["weddings", "corporate"],
      title: "Evening Ambiance",
    },
    {
      src: rings,
      alt: "Wedding rings",
      category: ["weddings"],
      title: "Symbol of Love",
    },
    {
      src: plannerConsultation,
      alt: "Planning consultation",
      category: ["weddings", "baptisms", "corporate"],
      title: "Personal Consultation",
    },
    {
      src: weddingTable,
      alt: "Baptism celebration",
      category: ["baptisms"],
      title: "Baptism Celebration",
    },
    {
      src: venueLights,
      alt: "Corporate event venue",
      category: ["corporate"],
      title: "Corporate Gala",
    },
  ];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-light tracking-wider" style={{ color: "#859a77" }}>
                SphinxWeddings
              </h1>
            </Link>
            
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/10" style={{ color: "#859a77" }}>
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
          <h2 className="text-5xl md:text-7xl font-serif font-light text-sage mb-8 tracking-wide animate-fade-in">
            Gallery
          </h2>
          
          {/* Collection Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/gallery/outdoor-events">
              <Button variant="outline" className="border-sage/30 text-sage hover:bg-sage/10 hover:border-sage/50 font-light">
                Outdoor Events
              </Button>
            </Link>
            <Link to="/gallery/night-events">
              <Button variant="outline" className="border-sage/30 text-sage hover:bg-sage/10 hover:border-sage/50 font-light">
                Night Events
              </Button>
            </Link>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light animate-fade-in">
            Explore our collection of beautifully curated celebrations
          </p>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-8 bg-background border-b border-sage/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`gap-2 font-light ${
                  selectedCategory === category.id
                    ? "bg-sage hover:bg-sage/90 text-background"
                    : "text-sage hover:bg-sage/10"
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
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="group relative overflow-hidden aspect-square cursor-pointer bg-muted/30 transition-all duration-500"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/10 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-white font-serif text-xl font-light">
                      {image.title}
                    </h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {image.category.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-1 bg-white/20 rounded-full text-white font-light"
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
          <h3 className="text-3xl md:text-5xl font-serif font-light text-sage mb-6">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
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
