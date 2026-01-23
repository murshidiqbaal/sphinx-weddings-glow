import celebrationToast from "@/assets/imgs/IMG_7349.JPEG.jpg";
import logo from "@/assets/logo/logo1.png";
import decoration from "@/assets/logo/vector1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WeddingSection from "@/components/WeddingSection";
import { useContent } from "@/hooks/useContent";
import { supabase } from "@/lib/supabase";
import { Camera, ChevronDown, Facebook, Heart, Instagram, Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

  const { getText, getImage } = useContent();

  // State Definitions moved to top to fix hoisting
  const [recentWorks, setRecentWorks] = useState<any[]>([]);
  const [weddingMoments, setWeddingMoments] = useState<any[]>([]);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const galleryImages = [
    getImage("gallery-image-1"),
    getImage("wedding-image-wide"),
    getImage("gallery-image-3"),
    getImage("gallery-image-4"),
    getImage("gallery-image-5"),
    getImage("gallery-image-6"),
  ];

  const heroTitle = getText("hero-title");
  const heroSubtitle = getText("hero-subtitle");
  const heroImageUrl = getImage("hero-image");
  const introTitle = getText("intro-title");
  const introDescription = getText("intro-description");
  const aboutTitle = getText("about-title");
  const aboutImageUrl = getImage("about-image");
  const contactEmail = getText("contact-email");
  const contactPhone = getText("contact-phone");
  const contactAddress = getText("contact-address");

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
  }, [testimonials, showAllTestimonials, recentWorks, weddingMoments]);

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



  useEffect(() => {
    const fetchRecentWorks = async () => {
      const { data } = await supabase
        .from("recent_works")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setRecentWorks(data);
      }
    };
    fetchRecentWorks();

    const fetchWeddingMoments = async () => {
      const { data } = await supabase
        .from("wedding_moments")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setWeddingMoments(data);
      }
    };
    fetchWeddingMoments();

    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);


  // Use DB data if available, otherwise fallback to hardcoded for now (or just empty)
  // To make the marquee effect work with few items, we might need to duplicate them if count is low
  const finalWorks = recentWorks.length > 0 && recentWorks.length < 5
    ? [...recentWorks, ...recentWorks, ...recentWorks]
    : recentWorks;

  const allTestimonials = testimonials.length > 0 ? testimonials : [
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
  ];

  const displayedTestimonials = showAllTestimonials ? allTestimonials : allTestimonials.slice(0, 3);


  const marqueeCardCaptions = [
    "City Soirée",
    "Sunlit Ceremony",
    "Moonlit Reception",
    "Garden Toasts",
    "Velvet Evenings",
    "Golden Hour Vows",
  ];

  const cardDescription = "Layered styling, thoughtful pacing, and a dedicated team on-site.";

  return (
    <div className="min-h-screen bg-background">
      {/* Header backdrop-blur-sm border-b border-border/50 */}
      <header className="fixed top-0 left-0 right-0 z-50 ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" onClick={() => scrollToSection("home")} className="flex items-center gap-2 drop-shadow-xl">
              <img
                src={logo}
                alt="Logo"
                className={`h-16 transition-all duration-300 ${headerDark ? "filter-none" : "filter brightness-0 invert"}`}
              />
              <span className={`text-xl font-bold ${headerDark ? "text-foreground" : "text-white"} transition-colors`}>
                {getText("site-title")}
              </span>
            </Link>

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${heroImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-light-bold text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          />
          <div
            className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: heroSubtitle }}
          />
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="text-white w-8 h-8 animate-bounce-slow" />
        </div>
      </section>

      {/* Hero Transition Section */}
      <section className="relative bg-[#fdf2f2] pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden z-20">
        <div className="brush-edge" aria-hidden="true" />
        <div className="container mx-auto px-4 relative"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Arched Image */}
              <div className="relative z-10">
                <div className="overflow-hidden rounded-[40px] h-[400px] md:h-[500px] w-full bg-white/95 border border-[#f5e7db] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-2">
                  <img src={galleryImages[0]} alt="Featured celebration" className="w-full h-full object-cover rounded-[32px]" />
                </div>
                <div className="w-full flex justify-center mt-2">
                  <img src={decoration} alt="" className="w-[140px] h-8 ml-2 inline-block opacity-80" />
                </div>
              </div>
              {/* Decorative elements behind */}
              {/* <div className="absolute top-10 -left-4 w-full h-full rounded-t-full border border-[#b27b61]/30 -z-10 transform -rotate-3" />
              <div className="absolute top-10 -right-4 w-full h-full rounded-t-full border border-[#b27b61]/30 -z-10 transform rotate-3" /> */}
            </div>

            <div className="text-center lg:text-left space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-[#b27b61] font-medium">Sphinx Weddings</p>
              <h2 className="text-5xl md:text-7xl font-sans text-primary leading-none">
                <span className="font-script text-[#b27b61] text-6xl md:text-8xl block mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>unique</span>
                WEDDING
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed text-justify">
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
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-32 bg-[#e8f0e8]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="max-w-4xl mx-auto text-center observe-scroll opacity-0">
            <div
              className="text-3xl md:text-5xl font-sans font-light text-primary mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: introTitle }}
            />
            <div
              className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: introDescription }}
            />
          </div>
        </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-12 md:py-32 bg-[#f9f5f0]"
      >
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[24px] md:rounded-[40px] shadow-sm p-6 md:p-10 border border-white/50">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center">
            <div className="observe-scroll opacity-0 flex flex-col justify-center py-2 md:py-4">
              <p className="text-[#b27b61] text-2xl md:text-3xl mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Who We Are
              </p>

              <div
                className="text-2xl md:text-4xl font-sans font-light text-primary mb-4 md:mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: aboutTitle }}
              />


              <div className="w-12 h-[1px] bg-[#b27b61]/50 mb-4 md:mb-6" />

              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed text-justify mb-6 md:mb-8">
                <p>
                  We believe that wedding planning should be as joyful as the celebration itself. Our approach is calm,
                  collaborative, and entirely focused on you. We take the time to understand your story, your style,
                  and your dreams then bring them to life with precision and care.
                </p>
                <p>
                  From intimate gatherings to grand celebrations, we create moments that feel authentic, beautiful,
                  and deeply personal. Because at the heart of it all, this is your day and our job is to make sure
                  it's everything you've imagined and more.
                </p>
                <p>
                  Our team brings years of experience in design, logistics, and hospitality. We anticipate needs before
                  they arise and handle the unexpected with grace, ensuring a seamless experience for you and your guests.

                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button variant="outline" className="border-[#b27b61] text-[#b27b61] hover:bg-[#b27b61] hover:text-white rounded-full px-8 uppercase tracking-widest text-xs h-10 md:h-12 transition-all w-full sm:w-auto">
                  Read Our Story
                </Button>

                <div className="text-right hidden sm:block">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">With Love,</p>
                  <p className="text-2xl text-[#b27b61]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    Sphinx Team
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end relative order-first md:order-last">
              {/* Decorative Offset Border
              <div className="absolute top-4 -left-4 w-full h-full border border-[#b27b61]/30 rounded-2xl -z-10 hidden md:block" /> */}

              <div className="flex flex-col items-center">
                <div
                  className="observe-scroll opacity-0 w-full max-w-[260px] md:max-w-[320px] aspect-[5/7] rounded-2xl overflow-hidden shadow-lg relative z-10"
                >
                  <img
                    src={aboutImageUrl}
                    alt="About Sphinx Weddings"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="w-full flex justify-center mt-2">
                  <img src={decoration} alt="" className="w-[100px] h-6 ml-2 inline-block opacity-80" />
                </div>
              </div>


              <div className="hidden md:block w-20" />

              {/* Floating Badge
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full shadow-xl animate-spin-slow hidden md:block z-20">
                <Sparkles className="w-6 h-6 text-[#b27b61]" />
              </div> */}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* New Wedding Section */}
      <WeddingSection images={weddingMoments} />

      {/* Storytelling Section
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-[0.4fr_1.6fr] items-start mb-12">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.4em] text-sage uppercase">About Agency</p>
              <h2 className="text-3xl md:text-4xl font-sans text-primary leading-snug uppercase">
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
      <section className="relative py-24 md:py-32 bg-[#fdf2f2] overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-24 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 80 C 150 20 350 20 500 80 C 650 140 850 140 1000 80 C 1100 40 1200 60 1200 60 L 1200 0 L 0 0 Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "1200px 120px",
          }}
        />
        <div className="container mx-auto px-4 relative"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fce7d4] to-[#f4d5bf] blur-[40px] opacity-50" />
                <div className="relative bg-white/95 border border-[#f5e7db] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                  <div className="absolute -top-6 -left-6 bg-[#b27b61] text-white text-xs uppercase tracking-[0.4em] px-4 py-2 rounded-full shadow-lg">
                    Est. 2025
                  </div>
                  <img src={celebrationToast} alt="Celebration toast" className="w-full h-[360px] object-cover" />
                  <div className="px-8 py-6 text-center space-y-2">
                    <p className="text-xs uppercase tracking-[0.4em] text-sage">Signature curation</p>
                    <p className="text-sm text-muted-foreground">
                      Layered textures, soft light, elevated palettes.
                    </p>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white border border-[#f1e2d1] shadow-xl" />
                </div>
                <div className="w-full flex justify-center mt-4">
                  <img src={decoration} alt="" className="w-[100px] h-6 inline-block opacity-80" />
                </div>
              </div>
              <div className="text-center lg:text-left">
                <p className="uppercase tracking-[0.35em] text-xs text-sage">Sphinx</p>
                {/* <p className="text-4xl md:text-5xl font-sans text-primary mt-2 whitespace-nowrap"></p> */}
                <p className="text-4xl md:text-5xl font-sans text-primary mt-2">
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
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    Whether you&apos;ve got it all together and just need a day-of coordinator or feel a little overwhelmed
                    and want help with all the things, we&apos;re here to help you celebrate your intimate Sphinx wedding in
                    a big way.
                  </p>
                  <Button className="bg-[#b27b61] hover:bg-[#a06d52] text-white px-8 py-6 rounded-full w-fit">
                    Let&apos;s create something incredible
                  </Button>
                </div>
                {/* <div className="self-start border border-[#d6bba3] rounded-full w-32 h-32 flex flex-col items-center justify-center text-xs uppercase tracking-[0.3em] text-[#b27b61]">
                  Est 2025
                  <span className="tracking-[0.1em] text-[10px] text-muted-foreground mt-1">Sphinx</span>
                  <span className="text-[9px] tracking-[0.4em] mt-1">Weddings</span>
                </div> */}
              </div>
              {/* <div className="grid grid-cols-3 gap-4">
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
              </div> */}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-[#e8f0e8]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
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
                <h3 className="text-xl md:text-2xl font-sans font-semibold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Recent Works Section */}
      <section id="our-works" className="py-20 md:py-32 bg-[#f9f5f0]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm tracking-[0.4em] text-sage uppercase font-light">Recent Work</p>
            <img src={decoration} alt="" className="w-[100px] h-6 mx-auto opacity-80" />
            <h2 className="text-3xl md:text-4xl font-sans text-primary leading-snug mt-4">
              A living reel of the tender, modern celebrations we design.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mt-4 text-center">
              Drift through a continuous ribbon of moments from our gallery. Each card is a real couple, a real story,
              and a glimpse into the ambience we create before mapping out your service suite below.
            </p>
          </div>

          <div className="mt-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              grabCursor={true}
              className="pb-12"
            >
              {finalWorks.map((item, index) => (
                <SwiperSlide key={`${item.id}-${index}`}>
                  <div
                    className="bg-[#fffaf6] rounded-[28px] p-4 border border-[#f0e2d5] h-full"
                  >
                    <div className="rounded-[20px] overflow-hidden h-[380px]">
                      <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover" />
                    </div>
                    {/* <img src={decoration} alt="" className="w-[200px] h-8 ml-2 inline-block opacity-80" /> */}
                    <div className="mt-4">
                      <p className="text-lg font-sans text-primary">
                        {item.caption}
                      </p>
                      <p className={`${item.description?.length > 80 ? "text-xs" : item.description?.length > 40 ? "text-sm" : "text-base"
                        } text-muted-foreground text-justify`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-[#f2f2f5]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="text-center max-w-3xl mx-auto mb-16">

            <p className="text-xs uppercase tracking-[0.4em] text-sage mb-4">Our Expertise</p>
            <img src={decoration} alt="" className="w-[100px] h-6 mx-auto opacity-80" />
            <h2 className="text-4xl md:text-6xl font-sans font-light text-primary mb-6">
              Curated Celebrations
            </h2>
            {/* <p className="text-muted-foreground text-lg font-light text-justify">
              From intimate gatherings to grand affairs, we craft every detail with precision and grace.
            </p> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              {
                id: "engagement",
                title: "Engagement",
                image: getImage("gallery-image-5"), // rings
                description: "The beginning of your forever, marked with elegance.",
              },
              {
                id: "wedding-planning",
                title: "Wedding Planning",
                image: getImage("wedding-image-stacked-2"),
                description: "Full-service coordination for your perfect day.",
              },
              {
                id: "reception",
                title: "Reception",
                image: getImage("gallery-image-1"), // weddingTable
                description: "An evening of joy, dining, and unforgettable toasts.",
              },
              {
                id: "haldi",
                title: "Haldi Ceremony",
                image: getImage("gallery-image-1"), // Placeholder, reusing weddingTable
                description: "Vibrant traditions soaked in love and laughter.",
              },
              {
                id: "mehandi",
                title: "Mehandi",
                image: getImage("wedding-image-wide"), // coupleHands
                description: "Intricate artistry and festive pre-wedding vibes.",
              },
              {
                id: "baptism",
                title: "Baptism",
                image: getImage("gallery-image-3"), // bouquet
                description: "Welcoming new life with grace and sanctity.",
              },
              {
                id: "birthday",
                title: "Birthday Bash",
                image: getImage("gallery-image-4"), // venueLights
                description: "Celebrating another year of life in style.",
              },
              {
                id: "corporate",
                title: "Corporate Events",
                image: getImage("gallery-image-6"), // plannerConsultation
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
                    <h3 className="text-2xl font-sans text-white mb-2 italic">
                      {service.title}
                    </h3>
                    <p className="text-white/90 font-light text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 leading-relaxed text-justify">
                      {service.description}
                    </p>
                    <div className="mt-4 w-8 h-[1px] bg-white/60 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-[#fffdf5]">

        <h2 className="text-3xl md:text-5xl font-sans font-light text-center text-primary mb-12">
          Hear From Our Clients
          <img src={decoration} alt="" className="w-[100px] h-6 mx-auto opacity-80" />
        </h2>
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">

          <div className="grid md:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial, index) => (
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
                <p className="text-muted-foreground leading-relaxed italic text-justify">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>

          {allTestimonials.length > 3 && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                className="rounded-full px-8 border-sage text-sage hover:bg-sage hover:text-white transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {showAllTestimonials ? "Show Less" : "See More Testimonials"}
              </Button>
            </div>
          )}
        </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-32 bg-[#e8f0e8]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-sage mb-4">The People</p>
            <img src={decoration} alt="" className="w-[100px] h-6 mx-auto opacity-80" />
            <h2 className="text-4xl md:text-6xl font-sans font-light text-primary mb-6">
              Meet The Team
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
              The creative minds and dedicated hearts behind every perfect celebration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Murshid Iqbaal",
                role: "Founder & Lead Planner",
                image: getImage("about-image"),
                bio: "With a passion for storytelling and an eye for detail, Murshid crafts weddings that are as unique as the couples he serves."
              },
              {
                name: "Sarah Jenkins",
                role: "Creative Director",
                image: getImage("gallery-image-3"),
                bio: "Bringing dreams to visual reality through color, texture, and light arrangement."
              },
              {
                name: "David Chen",
                role: "Event Coordinator",
                image: getImage("gallery-image-6"),
                bio: "Ensuring every logistical element flows seamlessly, so you can focus on the celebration."
              }
            ].map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-sans text-primary mb-2">{member.name}</h3>
                <p className="text-[#b27b61] uppercase tracking-widest text-xs mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto text-justify">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-[#fdf2f2]">
        <div className="container mx-auto px-4"><div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-12 border border-white/50">
          <h2 className="text-3xl md:text-5xl font-sans font-light text-center text-primary mb-12 flex items-center justify-center gap-2 md:gap-4">
            <img src={decoration} alt="" className="w-[60px] md:w-[100px] h-4 md:h-6 opacity-80" />
            <span className="shrink-0">Get in Touch</span>
            <img src={decoration} alt="" className="w-[60px] md:w-[100px] h-4 md:h-6 opacity-80" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="observe-scroll opacity-0">
              <h3 className="text-2xl font-sans font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> <span dangerouslySetInnerHTML={{ __html: contactEmail }} />
                </p>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong> <span dangerouslySetInnerHTML={{ __html: contactPhone }} />
                </p>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> <span dangerouslySetInnerHTML={{ __html: contactAddress }} />
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

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-forest text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-sans font-semibold mb-2">SphinxWeddings</h3>
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
