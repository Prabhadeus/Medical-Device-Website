import React, { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import SourceAgencies from "./components/SourceAgencies";
import Footer from "./components/Footer";

const cadTutorials = [
    { title: "CAD Tutorial 1", description: "Intro to CAD modeling", thumbnail: "/images/cad1.png", tags: ["modeling", "fusion360"] },
    { title: "CAD Tutorial 2", description: "Advanced CAD techniques", thumbnail: "/images/cad2.png", tags: ["advanced", "assembly"] },
    { title: "CAD Tutorial 3", description: "Parametric design basics", thumbnail: "/images/cad3.png", tags: ["parametric", "design"] },
    { title: "CAD Tutorial 4", description: "3D sketching essentials", thumbnail: "/images/cad4.png", tags: ["3D", "sketch"] },
    { title: "CAD Tutorial 5", description: "Surface modeling overview", thumbnail: "/images/cad5.png", tags: ["surface", "modeling"] },
];

const feaTutorials = [
    { title: "FEA Tutorial 1", description: "FEA basics", thumbnail: "/images/fea1.png", tags: ["fea", "simulation"] },
    { title: "FEA Tutorial 2", description: "Mesh generation", thumbnail: "/images/fea2.png", tags: ["mesh", "quality"] },
    { title: "FEA Tutorial 3", description: "Boundary conditions", thumbnail: "/images/fea3.png", tags: ["boundary", "conditions"] },
    { title: "FEA Tutorial 4", description: "Thermal analysis", thumbnail: "/images/fea4.png", tags: ["thermal", "analysis"] },
    { title: "FEA Tutorial 5", description: "Nonlinear analysis", thumbnail: "/images/fea5.png", tags: ["nonlinear", "advanced"] },
];

// Text colors
const DARK_TEXT = "#111111"; // near black for card titles and agency info
const LIGHT_TEXT = "#f0f0f0"; // whitish for navbar, footer, section titles on blue backgrounds

const backgroundColorMap = {
    video: {
        dark: "#2c3a4f",        // dark blue background
        light: "#6c7a95",       // lighter blue background
    },
    cad: {
        dark: "#aec7cc",        // light teal bg for image background 1
        light: "#cbd9db",
    },
    fea: {
        dark: "#1e325c",        // dark blue background for image background 2
        light: "#556f9b",
    },
};

const modeCycle = ["video", "cad", "fea"];

const App = () => {
    const [modeIndex, setModeIndex] = useState(0);
    const heroRef = useRef(null);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setShowNavbar(entry.isIntersecting),
            { threshold: 0.075 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
        };
    }, []);

    const currentMode = modeCycle[modeIndex];
    const colors = backgroundColorMap[currentMode];

    // Determine text colors based on mode:
    // Card tutorial titles and agency description text always dark (#111111)
    const cardTitleColor = DARK_TEXT;
    const agencyInfoColor = DARK_TEXT;

    // For navbar, footer, section titles: whitish on blue backgrounds (video, fea), else dark for cad
    const lightTextModes = ["video", "fea"];
    const useLightText = lightTextModes.includes(currentMode);

    const sectionTitleColor = useLightText ? LIGHT_TEXT : DARK_TEXT;
    const footerAndNavbarTextColor = useLightText ? LIGHT_TEXT : DARK_TEXT;

    return (
        <div className="App min-h-screen">
            <Navbar show={showNavbar} currentMode={currentMode} heroRef={heroRef} textColor={footerAndNavbarTextColor} />

            {/* HeroSection wrapper */}
            <div
                style={{ backgroundColor: colors.dark }}
                className="transition-colors duration-700"
            >
                <HeroSection
                    ref={heroRef}
                    modeIndex={modeIndex}
                    setModeIndex={setModeIndex}
                    modeCycle={modeCycle}
                />
            </div>

            {/* FeaturedSection wrapper */}
            <div
                style={{ backgroundColor: colors.light }}
                className="transition-colors duration-700"
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between", padding: "2rem" }}
                >
                    <FeaturedSection
                        title="Featured CAD Tutorials"
                        tutorials={cadTutorials}
                        buttonLabel="Show All CAD Tutorials"
                        buttonLink="/cad-tutorials"
                        side="left"
                        titleColor={sectionTitleColor}
                        cardTitleColor={cardTitleColor}
                    />
                    <FeaturedSection
                        title="Featured FEA Tutorials"
                        tutorials={feaTutorials}
                        buttonLabel="Show All FEA Tutorials"
                        buttonLink="/fea-tutorials"
                        side="right"
                        titleColor={sectionTitleColor}
                        cardTitleColor={cardTitleColor}
                    />
                </div>
            </div>

            {/* SourceAgencies wrapper */}
            <div
                style={{ backgroundColor: colors.dark }}
                className="transition-colors duration-700"
            >
                <SourceAgencies textColor={agencyInfoColor} titleColor={sectionTitleColor} />
            </div>

            {/* Footer wrapper */}
            <div
                style={{ backgroundColor: colors.light }}
                className="transition-colors duration-700"
            >
                <Footer textColor={footerAndNavbarTextColor} />
            </div>
        </div>
    );
};

export default App;
