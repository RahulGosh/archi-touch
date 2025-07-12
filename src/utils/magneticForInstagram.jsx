import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash'; // Import lodash throttle
import gsap from 'gsap';

const MagneticForInstagram = ({ children }) => {
  const magnetic = useRef(null);

  useEffect(() => {
    if (!magnetic.current) return; // Ensure the ref is assigned.

    const element = magnetic.current;

    // Use GSAP's quickTo for smoother transitions
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = throttle((e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 2); // Adjust for effect intensity
      yTo(y * 2);
    }, 16); // 60 FPS (16ms interval)

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners to prevent memory leaks
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div ref={magnetic}>{children}</div>;
};

export default MagneticForInstagram;