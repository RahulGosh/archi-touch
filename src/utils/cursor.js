import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './cursor.css';

const Cursor = ({ isVisible }) => {
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

  const radius = 50;
  const boundedPosition = {
    x: Math.min(Math.max(cursorPosition.x, radius), window.innerWidth - radius),
    y: Math.min(Math.max(cursorPosition.y, radius), window.innerHeight - radius),
  };

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: boundedPosition.y,
        left: boundedPosition.x,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      // className="custom-cursor"
    >
      <div className="custom-cursor-circle">
        <span>DETAILS</span>
      </div>
    </motion.div>
  );
};

export default Cursor;


// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import './cursor.css';

// const Cursor = ({ isVisible }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [cursorLabel, setCursorLabel] = useState('Prev');
//   const [showCustomCursor, setShowCustomCursor] = useState(false);
//   const cursorRef = useRef(null);

//   const handleMouseMove = (e) => {
//     setMousePosition({ x: e.clientX, y: e.clientY });
//   };

//   useEffect(() => {
//     const updatePosition = () => {
//       setCursorPosition((prevPosition) => ({
//         x: prevPosition.x + (mousePosition.x - prevPosition.x) * 0.2,
//         y: prevPosition.y + (mousePosition.y - prevPosition.y) * 0.2,
//       }));

//       requestAnimationFrame(updatePosition);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     requestAnimationFrame(updatePosition);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [mousePosition]);

//   useEffect(() => {
//     const screenWidth = window.innerWidth;
//     const leftBoundary = screenWidth * 0.35;
//     const rightBoundary = screenWidth * 0.65;
//     const label = mousePosition.x < leftBoundary ? 'Prev' : mousePosition.x > rightBoundary ? 'Next' : 'Center';
//     setCursorLabel(label);
//     setShowCustomCursor(label !== 'Center');
//   }, [mousePosition]);

//   const radius = 50;
//   const boundedPosition = {
//     x: Math.min(Math.max(cursorPosition.x, radius), window.innerWidth - radius),
//     y: Math.min(Math.max(cursorPosition.y, radius), window.innerHeight - radius),
//   };

//   return (
//     showCustomCursor && (
//       <motion.div
//         ref={cursorRef}
//         style={{
//           position: 'fixed',
//           top: boundedPosition.y,
//           left: boundedPosition.x,
//           transform: 'translate(-50%, -50%)',
//           pointerEvents: 'none',
//           zIndex: 1000,
//         }}
//         animate={{
//           opacity: isVisible ? 1 : 0,
//           scale: isVisible ? 1 : 0,
//         }}
//         transition={{ duration: 0.3, ease: 'easeInOut' }}
//       >
//         <div className="custom-cursor-circle">
//           <span>{cursorLabel}</span>
//         </div>
//       </motion.div>
//     )
//   );
// };

// export default Cursor;