import bouquet from "@/assets/bouquet.jpg";
import coupleHands from "@/assets/couple-hands.jpg";
import rings from "@/assets/imgs/IMG_6162.JPEG.jpg";
import plannerConsultation from "@/assets/imgs/IMG_6163.JPEG.jpg";
import venueLights from "@/assets/imgs/IMG_6166.JPEG.jpg";
import weddingTable from "@/assets/imgs/IMG_6172.JPEG.jpg";
import heroImage from "@/assets/wedding-ceremony.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WeddingSection from "@/components/WeddingSection";
import { getContent } from "@/lib/firebaseService";
import { Camera, ChevronDown, Facebook, Heart, Instagram, Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("wedding-planning");
  const [headerDark, setHeaderDark] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "wedding-planning",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  // Content from Firebase
  const [heroTitle, setHeroTitle] = useState("FOR THE LAID-BACK AND\nTHE WILDLY IN LOVE");
  const [heroSubtitle, setHeroSubtitle] = useState("Because you deserve to preserve your memories, beautifully.");
  const [heroImageUrl, setHeroImageUrl] = useState(heroImage);
  const [introTitle, setIntroTitle] = useState("IMAGINE HAVING A BEAUTIFULLY CRAFTED, TRULY EXCEPTIONAL CELEBRATION THAT PERFECTLY REFLECTS YOUR LOVE STORY");
  const [introDescription, setIntroDescription] = useState("As newly engaged couples, the excitement of wedding planning quickly turns into stress when juggling vendors, timelines, and endless details. That's where we come in—transforming your vision into reality with seamless coordination, thoughtful design, and expert guidance every step of the way.");
  const [aboutTitle, setAboutTitle] = useState("UNIQUELY, YOU'RE LOOKING FOR A PLANNER WHO CAN HELP YOU FEEL AT EASE THROUGH EVERY STEP OF THE JOURNEY.");
  const [aboutImageUrl, setAboutImageUrl] = useState(plannerConsultation);
  const [contactEmail, setContactEmail] = useState("sphinxweddings2025@gmail.com");
  const [contactPhone, setContactPhone] = useState("9072140083");
  const [contactAddress, setContactAddress] = useState("College Rd, near Ann theater, Kothamangalam, Kerala 686691");
  const [galleryImages, setGalleryImages] = useState([
    weddingTable,
    coupleHands,
    bouquet,
    venueLights,
    rings,
    plannerConsultation,
  ]);

  // Load content from Firebase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await getContent();
        if (content.length > 0) {
          content.forEach((item) => {
            switch (item.id) {
              case "hero-title":
                if (item.value) setHeroTitle(item.value);
                break;
              case "hero-subtitle":
                if (item.value) setHeroSubtitle(item.value);
                break;
              case "hero-image":
                if (item.value) setHeroImageUrl(item.value);
                break;
              case "intro-title":
                if (item.value) setIntroTitle(item.value);
                break;
              case "intro-description":
                if (item.value) setIntroDescription(item.value);
                break;
              case "about-title":
                if (item.value) setAboutTitle(item.value);
                break;
              case "about-image":
                if (item.value) setAboutImageUrl(item.value);
                break;
              case "contact-email":
                if (item.value) setContactEmail(item.value);
                break;
              case "contact-phone":
                if (item.value) setContactPhone(item.value);
                break;
              case "contact-address":
                if (item.value) setContactAddress(item.value);
                break;
              case "gallery-image-1":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[0] = item.value;
                    return newImages;
                  });
                }
                break;
              case "gallery-image-2":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[1] = item.value;
                    return newImages;
                  });
                }
                break;
              case "gallery-image-3":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[2] = item.value;
                    return newImages;
                  });
                }
                break;
              case "gallery-image-4":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[3] = item.value;
                    return newImages;
                  });
                }
                break;
              case "gallery-image-5":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[4] = item.value;
                    return newImages;
                  });
                }
                break;
              case "gallery-image-6":
                if (item.value) {
                  setGalleryImages((prev) => {
                    const newImages = [...prev];
                    newImages[5] = item.value;
                    return newImages;
                  });
                }
                break;
            }
          });
        }
      } catch (error) {
        console.error("Error loading content from Firebase:", error);
        // Use default values if Firebase fails
      }
    };

    loadContent();
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 1.1; // 300vh
      setHeaderDark(window.scrollY > scrollHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "3a0165cf-d681-426f-96dc-5c7a950d9556",
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          to_email: "murshidiqbaalkm@gmail.com",
          from_name: "SphinxWeddings Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormMessage("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          service: "wedding-planning",
          message: "",
        });
        // Auto-clear message after 5 seconds
        setTimeout(() => setFormMessage(""), 5000);
      } else {
        setFormMessage(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormMessage("Error sending message. Please check your connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const marqueeImages = [...galleryImages, ...galleryImages];
  const agencyImages = galleryImages.slice(0, 3);
  const servicesMarqueeImages = [...galleryImages, ...galleryImages];
  const marqueeCardCaptions = [
    "City Soirée",
    "Sunlit Ceremony",
    "Moonlit Reception",
    "Garden Toasts",
    "Velvet Evenings",
    "Golden Hour Vows",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className={`text-2xl md:text-3xl font-serif font-bold ${headerDark ? "text-primary" : "text-white"} tracking-wide transition-colors duration-300`}>
                SphinxWeddings
              </h1>
              <p className={`text-xs md:text-sm ${headerDark ? "text-muted-foreground" : "text-white/80"} font-light transition-colors duration-300`}>Event & Wedding Planner</p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {["home", "our-works", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium ${headerDark ? "text-foreground" : "text-white"} hover:text-sage transition-colors capitalize`}
                >
                  {item === "our-works" ? "Our Works" : item}
                </button>
              ))}
              <Link
                to="/gallery"
                className={`text-sm font-medium ${headerDark ? "text-foreground" : "text-white"} hover:text-sage transition-colors`}
              >
                Gallery
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${headerDark ? "text-foreground" : "text-white"} transition-colors`}
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
                  className={`text-left text-sm font-medium ${headerDark ? "text-foreground" : "text-white"} hover:text-sage transition-colors capitalize`}
                >
                  {item === "our-works" ? "Our Works" : item}
                </button>
              ))}
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-sm font-medium ${headerDark ? "text-foreground" : "text-white"} hover:text-sage transition-colors`}
              >
                Gallery
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center mt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 leading-tight">
            {heroTitle.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heroTitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="text-white w-8 h-8 animate-bounce-slow" />
        </div>
      </section>

      {/* Hero Transition Section */}
      <section className="relative bg-gradient-to-b from-white to-[#faf6f1] pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden z-20">
        <div className="brush-edge" aria-hidden="true" />
        <div className="container mx-auto px-4 relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Arched Image */}
              <div className="relative z-10">
                <div className="overflow-hidden rounded-t-full h-[400px] md:h-[500px] w-full border-[8px] border-white shadow-xl">
                  <img src={galleryImages[0]} alt="Featured celebration" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Decorative elements behind */}
              <div className="absolute top-10 -left-4 w-full h-full rounded-t-full border border-[#b27b61]/30 -z-10 transform -rotate-3" />
              <div className="absolute top-10 -right-4 w-full h-full rounded-t-full border border-[#b27b61]/30 -z-10 transform rotate-3" />
            </div>

            <div className="text-center lg:text-left space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-[#b27b61] font-medium">Sphinx Weddings</p>
              <h2 className="text-5xl md:text-7xl font-serif text-primary leading-none">
                <span className="font-script text-[#b27b61] text-6xl md:text-8xl block mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>unique</span>
                WEDDING
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Personalized wedding planning for couples livin&apos; it up in KCMO. From one-hour consults to full-scale
                production, we create artful timelines, manage every vendor, and keep you present in every moment.
              </p>
              <div className="pt-4">
                <Button className="bg-[#b27b61] hover:bg-[#a06d52] text-white px-10 py-6 rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-lg hover:-translate-y-1">
                  Let&apos;s create magic
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-32 bg-[#faf6f1]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center observe-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-primary mb-8 leading-tight">
              {introTitle}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {introDescription}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-20 md:py-32 bg-gradient-to-b from-[#faf6f1] via-[#f8f1ea] to-[#fdf8f4]"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div
              className="observe-scroll opacity-0 sticky top-24 h-[500px] md:h-[calc(100vh-6rem)] rounded-lg overflow-hidden"
            >
              <img
                src={aboutImageUrl}
                alt="About Sphinx Weddings"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="observe-scroll opacity-0 flex flex-col justify-center min-h-[60vh] py-10">
              <h2 className="text-3xl md:text-5xl font-serif font-light text-primary mb-6 leading-tight">
                {aboutTitle}
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  We believe that wedding planning should be as joyful as the celebration itself. Our approach is calm,
                  collaborative, and entirely focused on you. We take the time to understand your story, your style,
                  and your dreams—then bring them to life with precision and care.
                </p>
                <p>
                  From intimate gatherings to grand celebrations, we create moments that feel authentic, beautiful,
                  and deeply personal. Because at the heart of it all, this is your day—and our job is to make sure
                  it's everything you've imagined and more.
                </p>
                <p>
                  Our team brings years of experience in design, logistics, and hospitality. We anticipate needs before
                  they arise and handle the unexpected with grace, ensuring a seamless experience for you and your guests.
                </p>
                {/* <p>
                  Whether you envision a rustic countryside affair or a chic city soirée, we have the expertise and
                  creative vision to execute it flawlessly. Your love story is unique, and your wedding should be too.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Wedding Section */}
      <WeddingSection />

      {/* Script Intro & Marquee */}
      <section className="py-16 bg-gradient-to-b from-[#fff5ed] to-[#fdf8f4]">
        <div className="container mx-auto px-4 text-center">
          <p
            className="text-4xl md:text-5xl text-[#8b6247] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            We're getting married!
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Bask in the warmth of handcrafted celebrations where every detail feels soft, sunlit, and effortlessly
            romantic. Glide through our latest moments below and feel the energy of a day curated just for you.
          </p>
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 marquee-track">
            {marqueeImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="min-w-[220px] md:min-w-[260px] bg-white/90 rounded-[28px] p-3"
              >
                <img src={img} alt={`marquee-${index}`} className="h-48 w-full object-cover rounded-[20px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-[0.4fr_1.6fr] items-start mb-12">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.4em] text-sage uppercase">About Agency</p>
              <h2 className="text-3xl md:text-4xl font-serif text-primary leading-snug uppercase">
                We curate elevated, intimate wedding narratives
              </h2>
            </div>
            <div className="space-y-5 text-muted-foreground">
              <p>
                We are a full-service wedding agency that organizes every detail with a stylist&apos;s eye. Your love is
                the story; we simply craft the setting, cadence, and atmosphere so it feels timeless, calm, and uniquely
                you.
              </p>
              <p>
                From concept boards to on-site direction, we guide you through the entire experience, ensuring every
                moment is both beautiful and deeply personal.
              </p>
              <Button variant="outline" className="rounded-full px-8 uppercase tracking-wide">
                Discover
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[galleryImages[1], galleryImages[3], galleryImages[5]].map((img, index) => (
              <div
                key={img}
                className="rounded-[30px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-[#f1eade] bg-white"
              >
                <img src={img} alt={`Agency highlight ${index + 1}`} className="w-full h-[420px] object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Signature Planning Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#fdf8f4] to-[#faf6f1] overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-24 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 80 C 150 20 350 20 500 80 C 650 140 850 140 1000 80 C 1100 40 1200 60 1200 60 L 1200 0 L 0 0 Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "1200px 120px",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fce7d4] to-[#f4d5bf] blur-[40px] opacity-50" />
                <div className="relative bg-white/95 border border-[#f5e7db] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                  <div className="absolute -top-6 -left-6 bg-[#b27b61] text-white text-xs uppercase tracking-[0.4em] px-4 py-2 rounded-full shadow-lg">
                    Est. 2025
                  </div>
                  <img src={galleryImages[0]} alt="Celebration toast" className="w-full h-[360px] object-cover" />
                  <div className="px-8 py-6 text-center space-y-2">
                    <p className="text-xs uppercase tracking-[0.4em] text-sage">Signature curation</p>
                    <p className="text-sm text-muted-foreground">
                      Layered textures, soft light, elevated palettes.
                    </p>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white border border-[#f1e2d1] shadow-xl" />
                </div>
              </div>
              <div className="text-center lg:text-left">
                <p className="uppercase tracking-[0.35em] text-xs text-sage">Sphinx</p>
                <p className="text-4xl md:text-5xl font-serif text-primary mt-2">
                  <span className="italic text-[#b27b61]">unique</span> wedding planning + coordination
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="space-y-4 max-w-lg">
                  <p className="text-lg uppercase tracking-[0.2em] text-[#b27b61]">
                    Personalized wedding planning for couples livin&apos; it up in KCMO
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Whether you&apos;ve got it all together and just need a day-of coordinator or feel a little overwhelmed
                    and want help with all the things, we&apos;re here to help you celebrate your intimate Sphinx wedding in
                    a big way.
                  </p>
                  <Button className="bg-[#b27b61] hover:bg-[#a06d52] text-white px-8 py-6 rounded-full w-fit">
                    Let&apos;s create something incredible
                  </Button>
                </div>
                <div className="self-start border border-[#d6bba3] rounded-full w-32 h-32 flex flex-col items-center justify-center text-xs uppercase tracking-[0.3em] text-[#b27b61]">
                  Est 2025
                  <span className="tracking-[0.1em] text-[10px] text-muted-foreground mt-1">Sphinx</span>
                  <span className="text-[9px] tracking-[0.4em] mt-1">Weddings</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[galleryImages[2], galleryImages[3], galleryImages[5]].map((img, index) => (
                  <div
                    key={img}
                    className="bg-white p-2 rounded-[18px] shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
                    style={{
                      transform:
                        index === 0 ? "rotate(-5deg)" : index === 1 ? "rotate(2deg)" : "rotate(7deg)",
                    }}
                  >
                    <img src={img} alt={`Planning highlight ${index + 1}`} className="rounded-[12px] h-40 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#faf6f1] to-white">
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

      {/* Recent Works Section */}
      <section id="our-works" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm tracking-[0.4em] text-sage uppercase font-light">Recent Work</p>
            <h2 className="text-3xl md:text-4xl font-serif text-primary leading-snug mt-4">
              A living reel of the tender, modern celebrations we design.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mt-4">
              Drift through a continuous ribbon of moments from our gallery. Each card is a real couple, a real story,
              and a glimpse into the ambience we create before mapping out your service suite below.
            </p>
          </div>

          <div className="overflow-hidden mt-12">
            <div className="flex gap-6 marquee-track-reverse">
              {servicesMarqueeImages.map((img, index) => (
                <div
                  key={`${img}-${index}`}
                  className="min-w-[240px] md:min-w-[280px] bg-[#fffaf6] rounded-[28px] p-4 border border-[#f0e2d5]"
                >
                  <div className="rounded-[20px] overflow-hidden h-64">
                    <img src={img} alt={`Marquee showcase ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#b27b61]">Curated</p>
                    <p className="text-lg font-serif text-primary">
                      {marqueeCardCaptions[index % marqueeCardCaptions.length]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Layered styling, thoughtful pacing, and a dedicated team on-site.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#faf6f1]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-sage mb-4">Our Expertise</p>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-primary mb-6">
              Curated Celebrations
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              From intimate gatherings to grand affairs, we craft every detail with precision and grace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "engagement",
                title: "Engagement",
                image: rings,
                description: "The beginning of your forever, marked with elegance.",
              },
              {
                id: "wedding-planning",
                title: "Wedding Planning",
                image: heroImage,
                description: "Full-service coordination for your perfect day.",
              },
              {
                id: "reception",
                title: "Reception",
                image: weddingTable,
                description: "An evening of joy, dining, and unforgettable toasts.",
              },
              {
                id: "haldi",
                title: "Haldi Ceremony",
                image: weddingTable, // Placeholder, reusing for now
                description: "Vibrant traditions soaked in love and laughter.",
              },
              {
                id: "mehandi",
                title: "Mehandi",
                image: coupleHands,
                description: "Intricate artistry and festive pre-wedding vibes.",
              },
              {
                id: "baptism",
                title: "Baptism",
                image: bouquet,
                description: "Welcoming new life with grace and sanctity.",
              },
              {
                id: "birthday",
                title: "Birthday Bash",
                image: venueLights,
                description: "Celebrating another year of life in style.",
              },
              {
                id: "corporate",
                title: "Corporate Events",
                image: plannerConsultation,
                description: "Professional gatherings executed with flawlessness.",
              },
            ].map((service) => (
              <div
                key={service.id}
                className="group relative h-[380px] overflow-hidden rounded-[16px] cursor-pointer"
                onClick={() => setSelectedService(service.id)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-serif text-white mb-2 italic">
                      {service.title}
                    </h3>
                    <p className="text-white/90 font-light text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 w-8 h-[1px] bg-white/60 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#faf6f1] to-[#fdf8f4]">
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
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-[#fdf8f4] to-[#faf6f1]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-center text-primary mb-12">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="observe-scroll opacity-0">
              <h3 className="text-2xl font-serif font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {contactEmail}
                </p>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong> {contactPhone}
                </p>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> {contactAddress}
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
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <Input
                  placeholder="Your Name"
                  className="bg-background"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-background"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <select
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                >
                  <option value="wedding-planning">Wedding Planning</option>
                  <option value="baptism">Baptism & Christening</option>
                  <option value="corporate">Corporate Events</option>
                </select>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="bg-background"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                />
                {formMessage && (
                  <p className={`text-sm ${formMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                    {formMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-sage hover:bg-sage/90 text-white"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? "Sending..." : "Send Message"}
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
            <Button variant="ghost" size="icon" className="text-white hover:text-sage" onClick={() => window.open('https://www.facebook.com/sphinxinternational', '_blank')}>
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-sage" onClick={() => window.open('https://www.instagram.com/ms_sphinx_decore/', '_blank')}>
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
