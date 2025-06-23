import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
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
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const isSmallScreen = size.width < 768;
  const x1 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isSmallScreen ? [-100, 0, 100] : [-200, 0, 200]
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isSmallScreen ? [100, 0, -100] : [200, 0, -200]
  );

  return (
    <div ref={container} className="relative bg-white overflow-hidden p-0 m-0">
      <motion.div className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0">
        {slider1.map((project, index) => (
          <div key={`slider1-${index}`} className="w-full flex items-center justify-center p-0 m-0">
            <motion.h1
              style={{ x: x1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0"
            >
              {project.text}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      <motion.div className="flex relative gap-[1vw] w-full overflow-hidden p-0 m-0">
        {slider2.map((project, index) => (
          <div key={`slider2-${index}`} className="w-full flex items-center justify-center p-0 m-0">
            <motion.h1
              style={{ x: x2 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center p-0 m-0"
            >
              {project.text}
            </motion.h1>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(ImageSlider);