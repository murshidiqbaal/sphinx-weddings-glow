import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Leaf, Camera, Home } from "lucide-react";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import weddingTable from "@/assets/wedding-table.jpg";
import coupleHands from "@/assets/couple-hands.jpg";
import bouquet from "@/assets/bouquet.jpg";
import venueLights from "@/assets/venue-lights.jpg";
import rings from "@/assets/rings.jpg";
import plannerConsultation from "@/assets/planner-consultation.jpg";

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wide">
                SphinxWeddings
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-light">Event & Wedding Planner</p>
            </Link>
            
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-light text-primary mb-6 animate-fade-in">
            Our Gallery
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Explore our collection of beautifully curated celebrations and unforgettable moments
          </p>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-8 bg-background border-b border-border/50 sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`gap-2 ${
                  selectedCategory === category.id
                    ? "bg-sage hover:bg-sage/90 text-white"
                    : "hover:bg-beige"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-serif text-xl md:text-2xl font-semibold">
                      {image.title}
                    </h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {image.category.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"
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
          className="fixed inset-0 z-[100] bg-forest/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-sage transition-colors text-4xl font-light"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-beige">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-serif font-light text-primary mb-6">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's start planning your unforgettable celebration together
          </p>
          <Link to="/#contact">
            <Button className="bg-sage hover:bg-sage/90 text-white px-8 py-6 text-lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-forest text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif font-semibold mb-2">SphinxWeddings</h3>
          <p className="text-white/80 mb-6">Event Management and Wedding Planning</p>
          <p className="text-sm text-white/60">© 2025 SphinxWeddings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
