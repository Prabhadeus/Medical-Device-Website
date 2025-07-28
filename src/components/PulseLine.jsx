import React from "react";
import { motion } from "framer-motion";

export default function PulseLine({
                                      color = "#8FB6D6",
                                      className = "",
                                      width = 100,
                                      height = 20,
                                      reverse = false,
                                  }) {
    // Base length for stroke dash offset
    const length = 160;

    // Variants for animation
    const variants = {
        initial: { strokeDashoffset: reverse ? 0 : length },
        animate: { strokeDashoffset: reverse ? length : 0 },
        exit: { strokeDashoffset: reverse ? 0 : length },
    };

    return (
        <svg
            className={className}
            viewBox="0 0 100 20"
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
        >
            <motion.path
                d="
          M0 10
          L10 10
          L14 4
          L18 16
          L22 10
          L26 10
          L30 14
          L34 6
          L38 12
          L42 10
          L60 10
          L100 10
        "
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={length}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            />
        </svg>
    );
}
