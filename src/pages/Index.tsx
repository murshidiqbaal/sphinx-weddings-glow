import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Leaf, Camera, ChevronDown, Menu, X, Facebook, Instagram } from "lucide-react";
import heroImage from "@/assets/wedding-ceremony.jpg";
import weddingTable from "@/assets/wedding-table.jpg";
import coupleHands from "@/assets/couple-hands.jpg";
import bouquet from "@/assets/bouquet.jpg";
import venueLights from "@/assets/venue-lights.jpg";
import rings from "@/assets/rings.jpg";
import plannerConsultation from "@/assets/planner-consultation.jpg";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("wedding-planning");
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".observe-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wide">
                SphinxWeddings
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-light">Event & Wedding Planner</p>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {["home", "our-works", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium text-foreground hover:text-sage transition-colors capitalize"
                >
                  {item === "our-works" ? "Our Works" : item}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              {["home", "our-works", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left text-sm font-medium text-foreground hover:text-sage transition-colors capitalize"
                >
                  {item === "our-works" ? "Our Works" : item}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 leading-tight">
            FOR THE LAID-BACK AND<br />THE WILDLY IN LOVE
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            Because you deserve to preserve your memories, beautifully.
          </p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="text-white w-8 h-8 animate-bounce-slow" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center observe-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-primary mb-8 leading-tight">
              IMAGINE HAVING A BEAUTIFULLY CRAFTED, TRULY EXCEPTIONAL CELEBRATION THAT PERFECTLY REFLECTS YOUR LOVE STORY
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              As newly engaged couples, the excitement of wedding planning quickly turns into stress when juggling vendors, 
              timelines, and endless details. That's where we come in—transforming your vision into reality with seamless 
              coordination, thoughtful design, and expert guidance every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="observe-scroll opacity-0 h-[400px] md:h-[600px] rounded-lg"
              style={{
                backgroundImage: `url(${plannerConsultation})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="observe-scroll opacity-0">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-primary mb-6 leading-tight">
                UNIQUELY, YOU'RE LOOKING FOR A PLANNER WHO CAN HELP YOU FEEL AT EASE THROUGH EVERY STEP OF THE JOURNEY.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that wedding planning should be as joyful as the celebration itself. Our approach is calm, 
                collaborative, and entirely focused on you. We take the time to understand your story, your style, 
                and your dreams—then bring them to life with precision and care.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                From intimate gatherings to grand celebrations, we create moments that feel authentic, beautiful, 
                and deeply personal. Because at the heart of it all, this is your day—and our job is to make sure 
                it's everything you've imagined and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-sage" />,
                title: "MOMENTS IN BLOOM",
                description: "Where every detail blossoms into a memory that lasts forever.",
              },
              {
                icon: <Leaf className="w-12 h-12 text-sage" />,
                title: "ECHOES OF LOVE",
                description: "Designing celebrations that linger in hearts long after the day ends.",
              },
              {
                icon: <Camera className="w-12 h-12 text-sage" />,
                title: "WHERE MAGIC TAKES SHAPE",
                description: "Turning fleeting moments into timeless scenes you'll treasure always.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="observe-scroll opacity-0 text-center p-8 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="our-works" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-center text-primary mb-12">
            RECENT WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[weddingTable, coupleHands, bouquet, venueLights, rings, plannerConsultation].map((img, index) => (
              <div
                key={index}
                className="observe-scroll opacity-0 relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Wedding work ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-center text-primary mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "wedding-planning",
                title: "Wedding Planning",
                icon: <Heart className="w-10 h-10 text-sage" />,
                description: "Complete wedding coordination from concept to celebration",
                features: [
                  "Full planning & design",
                  "Vendor coordination",
                  "Timeline management",
                  "Day-of coordination",
                ],
              },
              {
                id: "baptism",
                title: "Baptism & Christening",
                icon: <Leaf className="w-10 h-10 text-sage" />,
                description: "Meaningful ceremonies for your precious milestone",
                features: [
                  "Venue selection",
                  "Décor & styling",
                  "Catering coordination",
                  "Guest management",
                ],
              },
              {
                id: "corporate",
                title: "Corporate Events",
                icon: <Camera className="w-10 h-10 text-sage" />,
                description: "Professional events that leave lasting impressions",
                features: [
                  "Event conceptualization",
                  "Logistics planning",
                  "AV & technical setup",
                  "On-site management",
                ],
              },
            ].map((service) => (
              <div
                key={service.id}
                className="observe-scroll opacity-0 bg-background p-8 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-center mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-sage mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael Johnson",
                type: "Wedding Clients",
                initials: "SJ",
                testimonial:
                  "SPHINX made our wedding day absolutely perfect. Every detail was thoughtfully planned and beautifully executed. We couldn't have asked for a better team to bring our vision to life.",
              },
              {
                name: "David Thompson",
                type: "Corporate Client",
                initials: "DT",
                testimonial:
                  "Our corporate event turned out amazing. The professionalism and attention to detail exceeded our expectations. Highly recommend their services for any business event.",
              },
              {
                name: "Maria Rodriguez",
                type: "Baptism Client",
                initials: "MR",
                testimonial:
                  "The baptism ceremony was beautiful and meaningful. They handled everything with such care and respect. Our family will cherish these memories forever.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="observe-scroll opacity-0 bg-beige p-8 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.type}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-center text-primary mb-12">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="observe-scroll opacity-0">
              <h3 className="text-2xl font-serif font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> hello@sphinxweddings.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> 123 Wedding Lane, Love City, LC 12345
                </p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Instagram className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="observe-scroll opacity-0">
              <form className="space-y-4">
                <Input placeholder="Your Name" className="bg-background" />
                <Input type="email" placeholder="Your Email" className="bg-background" />
                <select
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="wedding-planning">Wedding Planning</option>
                  <option value="baptism">Baptism & Christening</option>
                  <option value="corporate">Corporate Events</option>
                </select>
                <Textarea placeholder="Your Message" rows={5} className="bg-background" />
                <Button className="w-full bg-sage hover:bg-sage/90 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-forest text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif font-semibold mb-2">SphinxWeddings</h3>
          <p className="text-white/80 mb-6">Event Management and Wedding Planning</p>
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="text-white hover:text-sage">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-sage">
              <Instagram className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-white/60">© 2025 SphinxWeddings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
