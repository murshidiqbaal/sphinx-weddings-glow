import coupleHands from "@/assets/couple-hands.jpg"; // Placeholder until generation works
import { useEffect, useRef } from "react";

const WeddingSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in");
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-b from-[#fdf8f4] to-[#fff5ed]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Left Column: Text Content */}
                    <div className="lg:w-5/12 flex flex-col justify-center space-y-12 py-10">
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.4em] text-sage font-medium">
                                Our Philosophy
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary leading-tight">
                                Perfectly Planned, <br />
                                <span className="italic text-accent">Beautifully</span> Executed
                            </h2>
                        </div>

                        <div className="space-y-8 text-muted-foreground text-lg font-light leading-relaxed">
                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">The Vision</h3>
                                <p>
                                    We believe that every love story deserves a setting as unique as the couple itself.
                                    Our process begins not with logistics, but with listening—understanding the nuances
                                    of your journey, your shared aesthetics, and the atmosphere you wish to cultivate.
                                    We don't just plan weddings; we curate experiences that feel authentically yours.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">The Process</h3>
                                <p>
                                    From the initial concept board to the final floral arrangement, our approach is
                                    meticulous and collaborative. We handle the complexities of vendor management,
                                    timeline creation, and budget allocation with transparency and grace. This allows
                                    you to enjoy the creative aspects of planning without the weight of administrative
                                    stress. We are your advocates, your designers, and your peace of mind.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">The Celebration</h3>
                                <p>
                                    On the day of, our presence is felt but rarely seen. We orchestrate the flow of
                                    events seamlessly, ensuring that you and your guests are immersed in the moment.
                                    From the quiet anticipation of the morning preparations to the last dance under
                                    the stars, we safeguard the magic of your celebration, allowing you to be fully
                                    present in the joy of your union.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">The Legacy</h3>
                                <p>
                                    Long after the cake is cut and the flowers have faded, what remains are the memories
                                    of a day filled with love, laughter, and beauty. We take pride in creating
                                    timeless celebrations that you will look back on with fondness for decades to come.
                                    Your wedding is the first chapter of your new life together, and we are honored to
                                    help you write it beautifully.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="group relative px-8 py-4 bg-transparent border border-primary/20 rounded-full overflow-hidden transition-all hover:border-primary/50">
                                <span className="relative z-10 text-sm uppercase tracking-widest text-primary group-hover:text-primary transition-colors">
                                    Start Your Journey
                                </span>
                                <div className="absolute inset-0 bg-beige transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sticky Image */}
                    <div className="lg:w-7/12 relative lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
                        <div className="h-[500px] lg:h-full w-full rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
                            <img
                                src={coupleHands}
                                alt="Romantic wedding moment"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeddingSection;
