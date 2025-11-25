import { useContent } from "@/hooks/useContent";
import { useEffect, useRef } from "react";

const WeddingSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { getText, getImage } = useContent();

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
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary leading-tight whitespace-pre-line">
                                {getText("wedding-section-title")}
                            </h2>
                        </div>

                        <div className="space-y-8 text-muted-foreground text-lg font-light leading-relaxed">
                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">{getText("wedding-vision-title")}</h3>
                                <p>
                                    {getText("wedding-vision-desc")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">{getText("wedding-process-title")}</h3>
                                <p>
                                    {getText("wedding-process-desc")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">{getText("wedding-celebration-title")}</h3>
                                <p>
                                    {getText("wedding-celebration-desc")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-primary mb-4">{getText("wedding-legacy-title")}</h3>
                                <p>
                                    {getText("wedding-legacy-desc")}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="group relative px-8 py-4 bg-transparent border border-primary/20 rounded-full overflow-hidden transition-all hover:border-primary/50">
                                <span className="relative z-10 text-sm uppercase tracking-widest text-primary group-hover:text-primary transition-colors">
                                    {getText("wedding-cta-button")}
                                </span>
                                <div className="absolute inset-0 bg-beige transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sticky Image */}
                    {/* Right Column: Sticky Image Grid */}
                    <div className="lg:w-7/12 relative lg:sticky lg:top-24 h-fit">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Tall Image - Left */}
                            <div className="row-span-2 h-[600px] rounded-[30px] overflow-hidden shadow-lg group">
                                <img
                                    src={getImage("wedding-image-tall")}
                                    alt="Wedding couple"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Stacked Images - Right */}
                            <div className="h-[290px] rounded-[30px] overflow-hidden shadow-lg group">
                                <img
                                    src={getImage("wedding-image-stacked-1")}
                                    alt="Wedding detail"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="h-[290px] rounded-[30px] overflow-hidden shadow-lg group">
                                <img
                                    src={getImage("wedding-image-stacked-2")}
                                    alt="Wedding atmosphere"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Wide Image - Bottom */}
                            <div className="col-span-2 h-[300px] rounded-[30px] overflow-hidden shadow-lg group">
                                <img
                                    src={getImage("wedding-image-wide")}
                                    alt="Wedding celebration"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeddingSection;
