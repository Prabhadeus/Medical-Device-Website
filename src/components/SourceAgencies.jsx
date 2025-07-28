import React, { useState, useEffect, useRef } from "react";
import PulseLine from "./PulseLine";
import { motion, AnimatePresence } from "framer-motion";

const agencies = [
    {
        name: "FDA",
        description:
            "The U.S. Food and Drug Administration is responsible for protecting public health by ensuring the safety and efficacy of drugs, medical devices, and food products.",
        logo: "/logos/fda-logo.png",
        website: "https://www.fda.gov",
    },
    {
        name: "NIH",
        description:
            "The National Institutes of Health conducts medical research and provides funding to advance health knowledge and treatments.",
        logo: "/logos/nih-logo.png",
        website: "https://www.nih.gov",
    },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SourceAgencies({
                                           textColor = "#111111",
                                           titleColor = "#f0f0f0",
                                       }) {
    const [titleVisible, setTitleVisible] = useState(false);
    const [showPulse, setShowPulse] = useState(false);
    const sectionRefs = useRef([]);
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const [pulseWidth, setPulseWidth] = useState(0);

    // Show title with animation
    useEffect(() => {
        const timeout = setTimeout(() => setTitleVisible(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    // Get title width for pulse line
    useEffect(() => {
        if (titleRef.current) {
            setPulseWidth(titleRef.current.offsetWidth);
        }
    }, [titleVisible]);

    // Scroll handler to detect visible section
    useEffect(() => {
        const scrollContainer = mainRef.current;
        if (!scrollContainer) return;

        const onScroll = () => {
            let visibleIndex = null;
            const containerRect = scrollContainer.getBoundingClientRect();

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const section = sectionRefs.current[i];
                if (!section) continue;
                const rect = section.getBoundingClientRect();

                const visibleHeight =
                    Math.min(rect.bottom, containerRect.bottom) -
                    Math.max(rect.top, containerRect.top);
                const sectionHeight = rect.height;

                if (visibleHeight > sectionHeight / 2) {
                    visibleIndex = i;
                    break;
                }
            }

            setShowPulse(visibleIndex === 1);
        };

        onScroll();

        scrollContainer.addEventListener("scroll", onScroll);
        return () => scrollContainer.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.3 }}
            style={{ minHeight: "95vh", paddingBottom: "3rem" }}
        >
            <div
                className="flex flex-col items-center mb-4 w-full relative"
                style={{ paddingTop: "2rem", paddingBottom: "1rem" }}
            >
                <h1
                    ref={titleRef}
                    className={`text-center text-5xl font-extrabold select-none transition-all duration-700 ease-out ${
                        titleVisible ? "opacity-100 translate-y-2" : "opacity-0 translate-y-0"
                    }`}
                    style={{ color: titleColor, position: "relative", zIndex: 10 }}
                >
                    Source Agencies
                </h1>

                <AnimatePresence>
                    {titleVisible && showPulse && (
                        <motion.div
                            key="pulse-line"
                            style={{
                                position: "absolute",
                                bottom: "-0.75rem",
                                left: "calc(50% + -2rem)",
                                width: pulseWidth,
                                pointerEvents: "none",
                                zIndex: 5,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PulseLine color={titleColor} reverse={!showPulse} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div
                ref={mainRef}
                className="h-[80vh] max-w-xl mx-auto overflow-y-scroll scroll-smooth snap-y snap-mandatory rounded-lg border border-gray-200 shadow-sm bg-white"
                style={{ scrollBehavior: "smooth", userSelect: "text" }}
            >
                {agencies.map((agency, idx) => (
                    <section
                        key={agency.name}
                        ref={(el) => (sectionRefs.current[idx] = el)}
                        className="snap-start h-[80vh] flex flex-col items-center justify-center px-8 text-center"
                    >
                        <img
                            src={agency.logo}
                            alt={`${agency.name} logo`}
                            className="w-28 h-28 mb-6 object-contain"
                        />
                        <p
                            className="max-w-xl mb-4 leading-relaxed"
                            style={{ color: textColor, userSelect: "text" }}
                        >
                            {agency.description}
                        </p>
                    </section>
                ))}
            </div>
        </motion.div>
    );
}
