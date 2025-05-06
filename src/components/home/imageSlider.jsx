import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import useWindowSize from '../../utils/useWindowSize'; // Import the custom hook
import throttle from 'lodash.throttle'; // Import lodash throttle

const slider1 = [
  {
    text: 'Exterior',
  },
];

const slider2 = [
  {
    text: 'Interior',
  },
];

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
  const isSmallScreen = size.width < 768; // Adjust the breakpoint as needed

  // Transforms for scroll-based animations
 
  // Throttle the scroll event to improve performance
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
    onChange: throttle(() => {
      // Your logic here (if needed)
    }, 500), // Adjust the throttle delay as needed
  });

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


  return (
    <div ref={container} className="relative bg-white z-1 overflow-hidden p-0 m-0">
      {/* First Slider */}
      <motion.div className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0">
        {slider1.map((project, index) => (
          <div key={index} className="w-full flex items-center justify-center p-0 m-0">
            <div className="relative w-full flex items-center justify-center p-0 m-0">
              <motion.h1
                style={{ x: x1, willChange: 'transform' }} // Added will-change for optimization
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0"
              >
                {project.text}
              </motion.h1>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Second Slider */}
      <motion.div className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0">
        {slider2.map((project, index) => (
          <div key={index} className="w-full flex items-center justify-center p-0 m-0">
            <div className="relative w-full flex items-center justify-center p-0 m-0">
              <motion.h1
                style={{ x: x2, willChange: 'transform' }} // Added will-change for optimization
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0"
              >
                {project.text}
              </motion.h1>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Background Curve */}
      <motion.div className="relative bg-red-500 overflow-hidden p-0 m-0">
        <div className="absolute w-[120%] -left-[10%] rounded-b-[50%] bg-white z-1 shadow-[0px_60px_50px_rgba(0,0,0,0.75)] p-0 m-0"></div>
      </motion.div>
    </div>
  );
};

export default ImageSlider;
