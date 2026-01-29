
import { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            if (cursorRef.current) {
                cursorRef.current.animate({
                    left: `${x}px`,
                    top: `${y}px`
                }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0.1, 0.9, 0.2, 1)" });
            }
        }

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef}
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none translate-x-[-50%] translate-y-[-50%] z-50 hidden md:block"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 50%)',
                    mixBlendMode: 'overlay',
                    backdropFilter: 'brightness(1.3) contrast(1.1)', // Acts as a lens clearing the dark glass
                    WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 60%)', // Softens the edge of the filter
                    maskImage: 'radial-gradient(circle, black 0%, transparent 60%)',
                }}
            ></div>
        </>
    );
};

export default CursorGlow;
