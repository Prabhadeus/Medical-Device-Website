import React, {useState} from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Metadata", href: "/metadata" },
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact", hasCircle: true },
    ];

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* logo */}
                    <div className="text-xl font-bold cursor-pointer select-none">MedEdu</div>

                    {/* desktop menu */}
                    <div className="hidden md:flex space-x-4">
                        {menuItems.map((item, index) => {
                            const isHovered = hoveredIndex === index;
                            const isDimmed = hoveredIndex !== null && !isHovered;

                            return (
                                <div
                                    key={item.name}
                                    className={`relative group rounded-full transition duration-150 px-6 py-2 cursor-pointer flex items-center ${
                                        isDimmed ? "opacity-50" : "opacity-100"
                                    }`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.hasCircle && (
                                        <div
                                            className={`
                                              absolute
                                              top-1/2 left-1/2
                                              w-24 h-8
                                              rounded-full
                                              bg-gray-300
                                              opacity-70
                                              -translate-x-1/2 -translate-y-1/2
                                              pointer-events-none
                                              mix-blend-screen
                                              transition-all duration-300 ease-out
                                              ${isHovered ? 'scale-110 opacity-90' : 'scale-95 opacity-0'}
                                            `}
                                        />
                                    )}
                                    <a href={item.href} className="relative z-10">
                                        {item.name}
                                    </a>
                                </div>

                            );
                        })}
                    </div>

                    {/* mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                                 viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    </div>

                </div>

                {/* mobile menu links */}
                {menuOpen && (
                    <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
                        {menuItems.map((item, index) => {
                            const isHovered = hoveredIndex === index;
                            const isDimmed = hoveredIndex !== null && !isHovered;

                            return (
                                <div
                                    key={item.name}
                                    className={`w-fit relative group rounded-full transition duration-150 px-6 py-2 cursor-pointer flex items-center ${
                                    isDimmed ? "opacity-50" : "opacity-100"
                                    }`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.hasCircle && (
                                        <div
                                            className={`
                                             absolute
                                             top-1/2 left-1/2
                                             w-24 h-8
                                             rounded-full
                                             bg-gray-300
                                             opacity-70
                                             -translate-x-1/2 -translate-y-1/2
                                             pointer-events-none
                                             mix-blend-screen
                                             transition-all duration-300 ease-out
                                             ${isHovered ? 'scale-110 opacity-90' : 'scale-95 opacity-0'}
                                           `}
                                        />
                                    )}
                                    <a href={item.href} className="relative z-10">
                                        {item.name}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

