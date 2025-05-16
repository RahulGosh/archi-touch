import React, { useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash';
import gsap from 'gsap';

const MagneticForInstagram = React.memo(({ children }) => {
  const magnetic = useRef(null);

  // Use useCallback to memoize event handlers
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!magnetic.current) return;
      
      const element = magnetic.current;
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Using direct DOM manipulation instead of GSAP for simpler animations
      element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      element.style.transition = 'transform 0.2s ease-out';
    }, 20), // Slightly higher threshold for less frequent updates (50fps)
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!magnetic.current) return;
    
    // Reset position with a smooth transition
    magnetic.current.style.transform = 'translate(0px, 0px)';
    magnetic.current.style.transition = 'transform 0.5s ease-out';
  }, []);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

    // Predefine GSAP animations once for better performance
    const xTo = gsap.quickTo(element, "x", { 
      duration: 0.8, // Slightly faster
      ease: "elastic.out(1, 0.3)" 
    });
    
    const yTo = gsap.quickTo(element, "y", { 
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" 
    });
    
    // More efficient event handlers
    const handleMouseMoveGSAP = throttle((e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Use preconfigured animations
      xTo(x * 0.4); // Reduced multiplier for less intense effect
      yTo(y * 0.4);
    }, 20); // 50fps throttle rate (20ms)
    
    const handleMouseLeaveGSAP = () => {
      xTo(0);
      yTo(0);
    };

    // Determine which approach to use based on device capability
    // Use simpler animations for mobile/lower-end devices
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (isReducedMotion || isMobile) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    } else {
      element.addEventListener('mousemove', handleMouseMoveGSAP);
      element.addEventListener('mouseleave', handleMouseLeaveGSAP);
    }

    // Cleanup event listeners to prevent memory leaks
    return () => {
      if (isReducedMotion || isMobile) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        element.removeEventListener('mousemove', handleMouseMoveGSAP);
        element.removeEventListener('mouseleave', handleMouseLeaveGSAP);
      }
    };
  }, [handleMouseLeave, handleMouseMove]);

  return <div ref={magnetic} className="magnetic-element">{children}</div>;
});

// Add display name for easier debugging
MagneticForInstagram.displayName = 'MagneticForInstagram';

export default MagneticForInstagram;