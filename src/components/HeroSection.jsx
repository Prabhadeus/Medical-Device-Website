import React, { forwardRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = forwardRef(({ modeIndex, setModeIndex, modeCycle }, ref) => {
    const [showZoom, setShowZoom] = useState(false);
    const [hideNavbar, setHideNavbar] = useState(false);
    const [isHoveringPreview, setIsHoveringPreview] = useState(false);

    const nextMode = () => setModeIndex((prev) => (prev + 1) % modeCycle.length);
    const currentMode = modeCycle[modeIndex];
    const nextModePreview = modeCycle[(modeIndex + 1) % modeCycle.length];

    const handleClick = () => {
        setShowZoom(true);
        setTimeout(() => {
            nextMode();
            setShowZoom(false);
            if (nextModePreview === "cad" || nextModePreview === "fea") {
                document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
            }
        }, 500);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            const heroHeight = window.innerHeight;
            setHideNavbar(offset > heroHeight * 0.9);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
            navbar.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
            navbar.style.opacity = hideNavbar ? "0" : "1";
            navbar.style.transform = hideNavbar ? "translateY(-20px)" : "translateY(0)";
            navbar.style.pointerEvents = hideNavbar ? "none" : "auto";
        }
    }, [hideNavbar]);

    const backgroundClasses = (mode) =>
        `absolute top-0 left-0 h-full w-full object-cover transition-all duration-1000 ease-in-out
         ${currentMode === mode ? "opacity-100 scale-100 z-20" : "opacity-0 scale-105 z-10"}`;

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const previewVariants = {
        initial: { scale: 1, opacity: 0 },
        hover: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
        zoom: { scale: 4, opacity: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.section
            ref={ref}
            className="relative h-screen w-full overflow-visible"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Backgrounds */}
            <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    src="/videos/device.mp4"
                    className={backgroundClasses("video")}
                />
                <img
                    src="/images/cad-preview.png"
                    alt="CAD Background"
                    className={backgroundClasses("cad")}
                />
                <img
                    src="/images/fea-preview.png"
                    alt="FEA Background"
                    className={backgroundClasses("fea")}
                />
            </div>

            {/* CAD Mode Content */}
            {currentMode === "cad" && (
                <>
                    <motion.div
                        className="absolute z-40 top-32 left-10 max-w-md bg-black/20 p-4 rounded-lg text-white shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        <h2 className="text-6xl font-bold mb-2 drop-shadow-md">CAD Tutorials</h2>
                        <p className="text-lg drop-shadow-sm">
                            Learn the fundamentals of mechanical design using Autodesk Fusion 360. Our CAD tutorials
                            walk you through 3D modeling, assemblies, and industry workflows tailored for medical devices.
                        </p>
                    </motion.div>
                    <motion.h2
                        className="absolute z-40 bottom-10 right-10 text-white text-6xl font-bold drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        Autodesk Fusion 360
                    </motion.h2>
                </>
            )}

            {/* FEA Mode Content */}
            {currentMode === "fea" && (
                <>
                    <motion.div
                        className="absolute z-40 top-32 left-10 max-w-md bg-black/20 p-4 rounded-lg text-white shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        <h2 className="text-6xl font-bold mb-2 drop-shadow-md">FEA Tutorials</h2>
                        <p className="text-lg drop-shadow-sm">
                            Dive into Finite Element Analysis with COMSOL Multiphysics. These tutorials cover stress analysis,
                            heat transfer, and multiphysics simulation techniques relevant to biomedical applications.
                        </p>
                    </motion.div>
                    <motion.h2
                        className="absolute z-40 bottom-10 right-10 text-white text-6xl font-bold drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        COMSOL Multiphysics
                    </motion.h2>
                </>
            )}

            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-64"
                onMouseEnter={() => setIsHoveringPreview(true)}
                onMouseLeave={() => setIsHoveringPreview(false)}
            >
                <AnimatePresence>
                    {isHoveringPreview && (
                        <motion.div
                            className="cursor-pointer clip-circuit border shadow-xl bg-white/10 border-blue-500 flicker-glow w-full h-full"
                            initial="initial"
                            animate={showZoom ? "zoom" : "hover"}
                            exit="exit"
                            variants={previewVariants}
                            onClick={handleClick}
                        >
                            <div className="absolute inset-0 z-10 pointer-events-none" />

                            <motion.div
                                className="w-full h-full overflow-hidden"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                {nextModePreview === "video" && (
                                    <video
                                        src="/videos/device.mp4"
                                        loop
                                        muted
                                        autoPlay
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {nextModePreview === "cad" && (
                                    <img
                                        src="/images/cad-preview.png"
                                        alt="CAD Preview"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {nextModePreview === "fea" && (
                                    <img
                                        src="/images/fea-preview.png"
                                        alt="FEA Preview"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
});

export default HeroSection;
