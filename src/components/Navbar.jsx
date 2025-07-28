import React, { useState } from "react";
import clsx from "clsx";
import PulseLine from "./PulseLine";
import MedicalCrossIcon from "./MedicalCrossIcon";
import CloseIcon from "./CloseIcon";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ show }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const pulseWidth = 100;

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Metadata", href: "/metadata" },
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact" },
    ];

    const mobileMenuVariants = {
        hidden: { opacity: 0, scaleY: 0, originY: 0 },
        visible: { opacity: 1, scaleY: 1, originY: 0, transition: { duration: 0.3 } },
    };

    return (
        <nav
            id="main-navbar"
            className={clsx(
                "absolute top-0 left-0 w-full z-40 transition-all duration-700 ease-in-out",
                show
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-10 pointer-events-none"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-xl font-bold cursor-pointer select-none text-white">
                        MedEdu
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4">
                        {menuItems.map((item, index) => {
                            const isHovered = hoveredIndex === index;
                            const isDimmed = hoveredIndex !== null && !isHovered;

                            return (
                                <div
                                    key={item.name}
                                    className={clsx(
                                        "relative group rounded-full px-6 py-2 cursor-pointer flex items-center justify-center",
                                        isDimmed ? "opacity-50" : "opacity-100"
                                    )}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <span className="relative z-10 select-none text-white">
                                        <a href={item.href}>{item.name}</a>
                                    </span>

                                    {isHovered && (
                                        <div
                                            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-[20px] pointer-events-none"
                                            style={{ width: pulseWidth }}
                                        >
                                            <PulseLine width={pulseWidth} key={index} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            className="transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none"
                        >
                            {menuOpen ? (
                                <CloseIcon size={24} color="white" />
                            ) : (
                                <MedicalCrossIcon size={24} color="white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={mobileMenuVariants}
                            className="md:hidden absolute top-16 left-0 w-full z-30 bg-black/50 backdrop-blur-md origin-top"
                            style={{ paddingBottom: "1.25rem" }}
                        >
                            {menuItems.map((item, index) => {
                                const isHovered = hoveredIndex === index;
                                const isDimmed = hoveredIndex !== null && !isHovered;

                                return (
                                    <div
                                        key={item.name}
                                        className={clsx(
                                            "w-fit relative group rounded-full px-6 py-2 cursor-pointer flex items-center justify-center text-white",
                                            isDimmed ? "opacity-50" : "opacity-100"
                                        )}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <span className="relative z-10 select-none">
                                            <a href={item.href}>{item.name}</a>
                                        </span>

                                        {isHovered && (
                                            <div
                                                className="absolute bottom-[-10px] left-0 h-[20px] pointer-events-none"
                                                style={{ width: pulseWidth }}
                                            >
                                                <PulseLine width={pulseWidth} key={`mobile-${index}`} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
