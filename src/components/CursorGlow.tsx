
import { useEffect, useRef } from 'react';

import decoration from "@/assets/logo/vector1.webp";

const CursorGlow = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number | null = null;
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                if (cursorRef.current) {
                    cursorRef.current.animate({
                        left: `${x}px`,
                        top: `${y}px`
                    }, { duration: 100, fill: 'forwards', easing: "ease-out" });
                }
            });
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none translate-x-[-50%] translate-y-[-50%] z-50 hidden md:flex items-center justify-center"
            >
                <img
                    src={decoration}
                    alt=""
                    decoding="async"
                    className="w-32 h-auto opacity-80"
                    style={{
                        filter: 'brightness(0) invert(1)'
                    }}
                />
            </div>
        </>
    );
};

export default CursorGlow;
