import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SliderButton = ({ isVisible, image }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const updatePosition = () => {
      setCursorPosition((prevPosition) => ({
        x: prevPosition.x + (mousePosition.x - prevPosition.x) * 0.2,
        y: prevPosition.y + (mousePosition.y - prevPosition.y) * 0.2,
      }));

      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
      style={{
        top: cursorPosition.y,
        left: cursorPosition.x,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="w-40 h-40 rounded-full bg-white shadow-lg overflow-hidden">
        <motion.img
          src={image}
          alt="Room preview"
          className="w-full h-full object-cover"
          key={image} // Force re-render when image changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default SliderButton;
