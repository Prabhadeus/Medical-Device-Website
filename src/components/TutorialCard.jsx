import React from "react";

const TutorialCard = ({ tutorial, isHovered }) => {
    return (
        <div
            className={`
              group relative flex-shrink-0 w-80 h-52 m-4 rounded-xl overflow-hidden
              transition-transform duration-500 ease-in-out
              ${isHovered ? "scale-105 z-20 shadow-lg" : "scale-100 shadow"}
              cursor-pointer
              bg-white
            `}
        >
            <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-full object-cover"
            />
            <div
                className={`absolute inset-0 bg-black/70 text-white p-4 transition-opacity duration-300
        ${isHovered ? "opacity-100" : "opacity-0"}
      `}
            >
                <h2 className="text-lg font-bold">{tutorial.title}</h2>
                <p className="text-sm mt-1">{tutorial.description}</p>
                <div className="mt-2 text-xs text-blue-200">{tutorial.tags.join(", ")}</div>
            </div>
        </div>
    );
};

export default TutorialCard;
