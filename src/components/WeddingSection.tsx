import { useRef } from "react";

interface WeddingSectionProps {
    images?: any[];
}

const WeddingSection = ({ images = [] }: WeddingSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 md:py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <div className="bg-black/30 backdrop-blur-xl rounded-[40px] shadow-sm p-8 md:p-10 border border-white/10 inline-block">
                    <p
                        className="text-4xl md:text-6xl text-white mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        We're getting married!
                    </p>
                    <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto font-light tracking-wide">
                        A glimpse into our journey and the moments we cherish.
                    </p>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                <div
                    className="flex gap-8 marquee-track w-max hover:[animation-play-state:paused]"
                >
                    {[...images, ...images, ...images].map((item, index) => {
                        const isObject = typeof item === 'object' && item !== null;
                        const src = isObject ? (item as any).image_url : item;
                        const caption = isObject ? (item as any).caption : `Moment #${index + 1}`;

                        return (
                            <div
                                key={`${index}`}
                                className="flex-none transform transition-transform hover:scale-105 duration-300"
                                style={{
                                    transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                                }}
                            >
                                <div className="bg-black/30 backdrop-blur-md p-4 pb-12 shadow-lg rounded-sm w-[280px] md:w-[320px] border border-white/10">
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-800 mb-4">
                                        <img
                                            src={src}
                                            alt={caption}
                                            className="w-full h-full object-cover filter sepia-[0.2] contrast-[1.05]"
                                        />
                                    </div>
                                    <div className="font-handwriting text-center text-gray-300 text-sm transform -rotate-1">
                                        {caption}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Gradient masks for smooth fade at edges */}
                <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#fffdf5] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#fffdf5] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
};

export default WeddingSection;
