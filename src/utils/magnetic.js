import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
    const magnetic = useRef(null);

    useEffect(() => {

        // Adjust the duration for a longer-lasting effect
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1.5, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1.5, ease: "elastic.out(1, 0.3)" });

        magnetic.current.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Increase the effect radius by increasing the factor
            xTo(x * 0.5); // Adjust this value to control the radius
            yTo(y * 0.5); // Adjust this value to control the radius
        });

        magnetic.current.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
        });
    }, []);

    return React.cloneElement(children, { ref: magnetic });
};

export default Magnetic;
