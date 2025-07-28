import React, { useEffect, useRef, useState } from "react";
import "../featuredSection.css";
import { motion } from "framer-motion";

const CARD_WIDTH = 320;

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const FeaturedSection = ({
                             title,
                             tutorials,
                             buttonLabel,
                             buttonLink,
                             side = "left",
                             titleColor = "#111111",
                             cardTitleColor = "#111111",
                         }) => {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

    useEffect(() => {
        if (!isHovered && tutorials.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % tutorials.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, tutorials.length]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.style.transition = "transform 0.7s ease-in-out";
            container.style.transform = `translateX(${-currentIndex * CARD_WIDTH}px)`;
        }
    }, [currentIndex]);

    useEffect(() => {
        setHasAnimatedIn(true);
    }, []);

    const slideInStyle = {
        transform: hasAnimatedIn
            ? "translateX(0)"
            : side === "left"
                ? `translateX(-100vw)`
                : `translateX(100vw)`,
        opacity: hasAnimatedIn ? 1 : 0,
        transition: "transform 1s ease, opacity 1s ease",
    };

    const bgClass = `circuit-bg ${side === "left" ? "left-bg" : "right-bg"}`;

    return (
        <motion.section
            className="featured-section-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            <div className={bgClass} />

            <div
                className="content-wrapper"
                style={slideInStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: titleColor, marginLeft: "1.85rem" }}
                >
                    {title}
                </h2>

                <div className="overflow-hidden" style={{ width: CARD_WIDTH }}>
                    <div
                        ref={containerRef}
                        className="flex"
                        style={{ width: tutorials.length * CARD_WIDTH }}
                    >
                        {tutorials.map((tutorial, idx) => (
                            <TutorialCard
                                key={idx}
                                tutorial={tutorial}
                                cardTitleColor={cardTitleColor}
                                variants={cardVariants}
                            />
                        ))}
                    </div>
                </div>

                {buttonLabel && buttonLink && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => (window.location.href = buttonLink)}
                            className="relative inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg overflow-hidden border"
                            style={{
                                backgroundColor: "white",
                                borderColor: "#2563EB",
                                color: "#2563EB",
                                position: "relative",
                            }}
                        >
                            <span
                                className="absolute inset-0 transition-transform duration-500 ease-in-out"
                                style={{
                                    backgroundImage: "url(/images/circuit-fill.png)",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    transform: "translateY(100%)",
                                    zIndex: 0,
                                }}
                            ></span>

                            <span className="relative z-10 transition-colors duration-300">
                                {buttonLabel}
                            </span>

                            <style>{`
                                button:hover > span:first-child {
                                    transform: translateY(0) !important;
                                }
                                button:hover {
                                    color: white !important;
                                    border-color: transparent !important;
                                }
                            `}</style>
                        </button>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

const TutorialCard = ({ tutorial, cardTitleColor, variants }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="tutorial-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold" style={{ color: cardTitleColor }}>
                    {tutorial.title}
                </h3>
            </div>
            <div className={`tutorial-hover-overlay ${hovered ? "opacity-100" : ""}`}>
                <h4 className="text-lg font-bold">{tutorial.title}</h4>
                <p className="text-sm mt-2">{tutorial.description}</p>
                {tutorial.difficulty && <p className="text-xs italic mt-1">{tutorial.difficulty}</p>}
                {tutorial.sponsor && <p className="text-xs mt-1">Sponsored by {tutorial.sponsor}</p>}
                {tutorial.tags && (
                    <p className="text-xs mt-2 text-blue-300">Tags: {tutorial.tags.join(", ")}</p>
                )}
            </div>
        </motion.div>
    );
};

export default FeaturedSection;
