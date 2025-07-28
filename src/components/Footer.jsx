import React, { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
    { name: "Home", href: "/" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Metadata", href: "/metadata" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact", hasCircle: true },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer({ textColor = "#f0f0f0" }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.footer
            style={{ color: textColor }}
            className="w-full pb-8 pt-10"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="flex justify-center py-6">
                <img
                    src="/logos/hofstra-logo.png"
                    alt="Hofstra University Logo"
                    className="h-14 object-contain"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        console.warn("Hofstra logo not found");
                    }}
                />
            </div>

            <nav className="flex flex-wrap justify-center gap-12 mb-10 max-w-7xl mx-auto px-6">
                {menuItems.map(({ name, href, hasCircle }, index) => {
                    const isHovered = hoveredIndex === index;
                    const isDimmed = hoveredIndex !== null && !isHovered;

                    return (
                        <div
                            key={name}
                            className={`relative group rounded-full transition duration-150 px-6 py-3 cursor-pointer flex items-center ${
                                isDimmed ? "opacity-50" : "opacity-100"
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {hasCircle && (
                                <div
                                    className={`absolute top-1/2 left-1/2 w-24 h-8 rounded-full bg-[#8FB6D6] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform transition-opacity duration-300 ease-out ${
                                        isHovered ? "opacity-70 scale-110" : "opacity-0 scale-95"
                                    }`}
                                />
                            )}
                            <a
                                href={href}
                                className="relative z-10 hover:text-white transition-colors duration-300 font-semibold"
                                style={{ color: textColor }}
                            >
                                {name}
                            </a>
                        </div>
                    );
                })}
            </nav>

            <div className="flex justify-center space-x-12 mb-8 max-w-7xl mx-auto px-6">
                <a
                    href="https://github.com/prabhadeus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-white transition-colors duration-300"
                    style={{ color: textColor }}
                >
                    <svg
                        className="w-7 h-7 fill-current"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>GitHub</title>
                        <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.207 11.385c.6.112.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.746.082-.73.082-.73 1.204.085 1.837 1.237 1.837 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.42-1.305.763-1.605-2.665-.304-5.466-1.335-5.466-5.933 0-1.31.468-2.381 1.236-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 016.004 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.244 2.873.12 3.176.77.839 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.43.371.823 1.103.823 2.222v3.293c0 .319.217.694.824.576A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </a>
            </div>

            <div className="max-w-7xl mx-auto px-6 my-10">
                <div className="border-t-4 border-blue-600 rounded-md mx-auto w-52" />
            </div>

            <p className="text-center text-sm max-w-7xl mx-auto px-6 mb-4" style={{ color: textColor }}>
                2025 Prabhjot Singh | Designed by Prabhjot Singh.
            </p>
        </motion.footer>
    );
}
