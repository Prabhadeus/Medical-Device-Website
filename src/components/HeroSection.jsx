import React, { useEffect, useState, useRef} from "react";

const imageFrames = [
    '/images/device/frame0.png',
    '/images/device/frame1.png',
    '/images/device/frame2.png',
    '/images/device/frame3.png',
];

const HeroSection = () => {
    const [frameIndex, setFrameIndex] = useState(0);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 500;
            const scrollFraction = Math.min(scrollY / maxScroll, 1);
            const frame = Math.floor(scrollFraction * (frames.length - 1));
            setFrameIndex(frame);
            lastScrollY.current = scrollY;
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section className="relative h-screen bg-blue-50 flex flex-col items-center justify-center text-center px-4">
            <img
                src={frames[frameIndex]}
                alt="Medical device disassembly animation"
                className="max-w-full max-h-[60vh] object-contain"
                loading="lazy"
            />
            <h1 className="text-3xl font-bold mt-6 text-blue-900">Explore Medical Devices Like Never Before</h1>
            <p className="mt-2 text-blue-700 max-w-xl">
                Watch our interactive disassembly animation as you scroll down to see inside the device and learn about its hardware.
            </p>
        </section>
    );
};

export default HeroSection;