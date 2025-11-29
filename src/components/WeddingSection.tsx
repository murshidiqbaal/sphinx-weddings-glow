import { useRef } from "react";

interface WeddingSectionProps {
    images?: string[];
}

const WeddingSection = ({ images = [] }: WeddingSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 md:py-32 bg-[#fffdf5] overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <div className="bg-white/60 backdrop-blur-md rounded-[40px] shadow-sm p-8 md:p-10 border border-white/50 inline-block">
                    <p
                        className="text-4xl md:text-6xl text-[#8b6247] mb-2"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        We're getting married!
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-light tracking-wide">
                        A glimpse into our journey and the moments we cherish.
                    </p>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                <div
                    className="flex gap-8 marquee-track w-max hover:[animation-play-state:paused]"
                >
                    {[...images, ...images, ...images].map((img, index) => (
                        <div
                            key={`${index}`}
                            className="flex-none transform transition-transform hover:scale-105 duration-300"
                            style={{
                                transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                            }}
                        >
                            <div className="bg-white p-4 pb-12 shadow-lg rounded-sm w-[280px] md:w-[320px] border border-gray-100">
                                <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                                    <img
                                        src={img}
                                        alt={`Moment ${index + 1}`}
                                        className="w-full h-full object-cover filter sepia-[0.2] contrast-[1.05]"
                                    />
                                </div>
                                <div className="font-handwriting text-center text-gray-500 text-sm transform -rotate-1">
                                    {/* Optional: Add captions here if available */}
                                    Moment #{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient masks for smooth fade at edges */}
                <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#fffdf5] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#fffdf5] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
};

export default WeddingSection;
