import React, { useState } from "react";
import ScrollVideo from "./ScrollVideo";

const HeroSection = () => {
    const [scrollFraction, setScrollState] = useState(0);
    const showText = scrollFraction > 0.7 && scrollFraction < 0.95;
    const showPostVideoWhitespace = scrollFraction >= 1;

    return (
        <section className="relative">
            <ScrollVideo setScrollState={setScrollState} />

            <div
                className={`absolute transition-opacity duration-700 ease-in-out bottom-12 left-1/2 transform -translate-x-1/2 text-center text-[#7FD8DE] ${
                    showText ? "opacity-100" : "opacity-0"
                }`}
            >
                <h1 className="text-4xl md:text-5xl font-bold">
                    Explore Medical Devices Like Never Before
                </h1>
                <p className="text-lg mt-4 max-w-xl mx-auto">
                    Scroll to see hardware components, CAD/FEA tutorials, and metadata in one place.
                </p>
            </div>

            {showPostVideoWhitespace && (
                <div style={{ height: "150vh" }} className="bg-white w-full" />
            )}
        </section>
    );
};

export default HeroSection;
