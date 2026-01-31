import { useRef } from "react";

interface WeddingSectionProps {
    images?: any[];
}

const WeddingSection = ({ images = [] }: WeddingSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 md:py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <div className="relative inline-block py-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl -z-10" />
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
                                <div className="bg-white/[0.02] backdrop-blur-md p-4 pb-12 shadow-lg rounded-sm w-[280px] md:w-[320px] border border-white/10">
                                    <div className="aspect-[4/5] overflow-hidden bg-white/5 mb-4">
                                        <img
                                            src={src}
                                            alt={caption}
                                            className="w-full h-full object-cover filter sepia-[0.2] contrast-[1.05]"
                                        />
                                    </div>
                                    <div className="font-handwriting text-center text-gray-200 text-sm transform -rotate-1">
                                        {caption}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Gradient masks removed for transparency */}
            </div>
        </section>
    );
};

export default WeddingSection;
