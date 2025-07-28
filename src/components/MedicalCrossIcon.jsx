import React from "react";

const MedicalCrossIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="10" y="4" width="4" height="16" />
        <rect x="4" y="10" width="16" height="4" />
    </svg>
);

export default MedicalCrossIcon;
