// HeroSection.jsx
import React, { useState } from "react";

const HeroSection = ({ modeIndex, setModeIndex, modeCycle }) => {
    const nextMode = () => setModeIndex((prev) => (prev + 1) % modeCycle.length);
    const currentMode = modeCycle[modeIndex];
    const nextModePreview = modeCycle[(modeIndex + 1) % modeCycle.length];

    const handleClick = () => {
        nextMode();
        if (currentMode === "cad" || currentMode === "fea") {
            document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-dvh w-screen overflow-hidden">
            <div className="relative z-10 h-full w-full rounded-lg transition-all duration-1000 ease-in-out">
                {/* background layer */}
                <div className="absolute top-0 left-0 h-full w-full">
                    {/* video */}
                    <video
                        autoPlay
                        loop
                        muted
                        src="/videos/device.mp4"
                        className={`
                          absolute top-0 left-0 h-full w-full object-cover
                          transition-opacity duration-1000 ease-in-out
                          ${currentMode === "video" ? "opacity-100 z-20" : "opacity-0 z-10"}
                        `}
                    />

                    {/* CAD */}
                    <img
                        src="/images/cad-preview.png"
                        alt="CAD Background"
                        className={`
                          absolute top-0 left-0 h-full w-full object-cover
                          transition-opacity duration-1000 ease-in-out
                          ${currentMode === "cad" ? "opacity-100 z-20" : "opacity-0 z-10"}
                        `}
                    />

                    {/* FEA */}
                    <img
                        src="/images/fea-preview.png"
                        alt="FEA Background"
                        className={`
                          absolute top-0 left-0 h-full w-full object-cover
                          transition-opacity duration-1000 ease-in-out
                          ${currentMode === "fea" ? "opacity-100 z-20" : "opacity-0 z-10"}
                        `}
                    />
                </div>


                {/* hover box preview. TODO: Make the popup and transition to the next background more fluid (maybe a zoom in/out feature) */}
                <div
                    onClick={handleClick}
                    className="absolute-center z-30 size-64 rounded-lg cursor-pointer overflow-hidden transition-transform duration-500 ease-in group"
                >
                    <div
                        className="scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out size-full">
                        {nextModePreview === "video" && (
                            <video
                                src="/videos/device.mp4"
                                loop
                                muted
                                autoPlay
                                className="h-full w-full object-cover rounded-lg"
                            />
                        )}
                        {nextModePreview === "cad" && (
                            <img
                                src="/images/cad-preview.png"
                                alt="CAD Preview"
                                className="h-full w-full object-cover rounded-lg"
                            />
                        )}
                        {nextModePreview === "fea" && (
                            <img
                                src="/images/fea-preview.png"
                                alt="FEA Preview"
                                className="h-full w-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                </div>

                {/* TODO: ADD TEXT HERE LATER */}
                <h1 className="absolute bottom-5 right-5 z-50 text-white text-xl">
                    {currentMode.toUpperCase()}
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;
