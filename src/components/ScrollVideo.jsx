import React, { useEffect, useRef } from "react";

const ScrollVideo = ({ setScrollState }) => {
    const videoRef = useRef(null);
    const targetTimeRef = useRef(0);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const maxScroll = window.innerHeight * 2;

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const scrollFraction = Math.min(scrollTop / maxScroll, 1);
            targetTimeRef.current = scrollFraction * video.duration;
            if (setScrollState) setScrollState(scrollFraction);
        };

        window.addEventListener("scroll", onScroll);

        let currentTime = 0;

        const smoothSeek = () => {
            if (!video) return;

            currentTime += (targetTimeRef.current - currentTime) * 0.1;

            if (Math.abs(video.currentTime - currentTime) > 0.01) {
                video.currentTime = currentTime;
            }

            animationFrameId.current = requestAnimationFrame(smoothSeek);
        };

        animationFrameId.current = requestAnimationFrame(smoothSeek);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [setScrollState]);

    useEffect(() => {
        document.body.style.height = `${window.innerHeight * 2}px`;
        return () => {
            document.body.style.height = null;
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src="/device/device.mp4"
            muted
            playsInline
            preload="auto"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                zIndex: -1,
            }}
        />
    );
};

export default ScrollVideo;
