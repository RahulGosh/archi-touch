import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import useWindowSize from '../../utils/useWindowSize';

const slider1 = [{ text: 'Exterior' }];
const slider2 = [{ text: 'Interior' }];

const ImageSlider = () => {
  return (
    <main className="overflow-x-hidden">
      <LeftRightTextSlider />
    </main>
  );
};

const LeftRightTextSlider = () => {
  const container = useRef(null);
  const size = useWindowSize();
  
  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  // Calculate transforms based on screen size
  const isSmallScreen = size.width < 768;
  const x1 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isSmallScreen ? [-100, 0, 100] : [-250, 0, 250]
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isSmallScreen ? [100, 0, -100] : [250, 0, -250]
  );

  // Clean up scroll listeners
  useEffect(() => {
    return () => {
      scrollYProgress.clearListeners();
    };
  }, []);

  return (
    <div 
      ref={container} 
      className="relative bg-white z-1 overflow-hidden p-0 m-0"
      style={{ willChange: 'transform' }}
    >
      {/* First Slider */}
      <motion.div 
        className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {slider1.map((project, index) => (
          <div 
            key={`slider1-${index}`}
            className="w-full flex items-center justify-center p-0 m-0"
            style={{ willChange: 'transform' }}
          >
            <motion.h1
              style={{ 
                x: x1,
                willChange: 'transform',
                translateZ: '0'
              }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0 transform-gpu"
            >
              {project.text}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Second Slider */}
      <motion.div 
        className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {slider2.map((project, index) => (
          <div 
            key={`slider2-${index}`}
            className="w-full flex items-center justify-center p-0 m-0"
            style={{ willChange: 'transform' }}
          >
            <motion.h1
              style={{ 
                x: x2,
                willChange: 'transform',
                translateZ: '0'
              }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0 transform-gpu"
            >
              {project.text}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Background Curve */}
      <motion.div 
        className="relative bg-red-500 overflow-hidden p-0 m-0"
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        <div 
          className="absolute w-[120%] -left-[10%] rounded-b-[50%] bg-white z-1 shadow-[0px_60px_50px_rgba(0,0,0,0.75)] p-0 m-0"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default React.memo(ImageSlider);