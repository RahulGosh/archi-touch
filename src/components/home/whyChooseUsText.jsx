import React, { useEffect, useRef, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import useCountUp from "../../utils/useCountUp";
import "./whyChooseUsText.css";

const WhyChooseUsText = React.memo(() => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  // Single animation controller
  const controls = useAnimation();
  const isSectionInView = useInView(sectionRef, { once: true, margin: "100px" });

  // Optimized counters with proper 85K implementation
  const count500 = useCountUp(isSectionInView ? 500 : 0, 2000);
  const count98 = useCountUp(isSectionInView ? 98 : 0, 2000);
  const count85K = useCountUp(isSectionInView ? 85000 : 0, 3000); // Longer duration for larger number
  const count115 = useCountUp(isSectionInView ? 115 : 0, 2000);

  // Shared animation variants with optimized physics
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5,
        delay: delay * 0.15
      }
    })
  };

  // Single animation trigger
  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView]);

  // Optimized sticky header with passive events
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          title.classList.toggle("sticky", !entry.isIntersecting);
        });
      },
      { 
        threshold: 1,
        rootMargin: `-${title.offsetHeight}px 0px 0px 0px`
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="container max-w-7xl mx-auto custom-md:max-w-5xl custom-md:mx-auto px-0 pt-16 pb-0 mb-0"
      ref={sectionRef}
      style={{ willChange: 'transform' }}
    >
      <div className="flex flex-col custom-md:flex-row justify-between w-full">
        {/* Left Side - Heading */}
        <motion.div
          className="w-full custom-md:w-1/2 flex flex-col justify-start px-4"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          custom={0}
          variants={variants}
          style={{ willChange: 'transform, opacity' }}
        >
          <h6 className="text-custom-md uppercase tracking-wider">
            Our Unique Advantages
          </h6>
          <h2 className="text-[43px] custom-md:text-5xl custom-whyChooseUsText-md:text-5xl font-bold mt-4">
            Why Choose Us?
          </h2>
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full custom-md:w-1/2 mt-8 custom-md:mt-0 flex flex-col space-y-8 px-4">
          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            custom={0.5}
            variants={variants}
            style={{ willChange: 'transform, opacity' }}
          >
            At Decor, we take pride in transforming spaces into stunning,
            functional works of art. Over the years, we've completed over 500
            projects, consistently exceeding our clients' expectations.
          </motion.p>

          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            custom={0.7}
            variants={variants}
            style={{ willChange: 'transform, opacity' }}
          >
            Our success is built on the satisfaction of our clients, who trust
            us to bring their visions to life with creativity and precision.
          </motion.p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 custom-md:gap-x-12 custom-md:gap-y-12">
            {/* Stat Block 1 */}
            <motion.div
              className="text-start stat-left"
              initial="hidden"
              animate={controls}
              custom={1}
              variants={variants}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count500}+</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Realized Projects
              </p>
            </motion.div>

            {/* Stat Block 2 */}
            <motion.div
              className="text-start stat-right"
              initial="hidden"
              animate={controls}
              custom={1.2}
              variants={variants}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count98}%</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Client Satisfaction
              </p>
            </motion.div>

            {/* Stat Block 3 */}
            <motion.div
              className="text-start stat-left"
              initial="hidden"
              animate={controls}
              custom={1.4}
              variants={variants}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">
                {Math.floor(count85K / 1000)}K
              </h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Common Partners
              </p>
            </motion.div>

            {/* Stat Block 4 */}
            <motion.div
              className="text-start stat-right"
              initial="hidden"
              animate={controls}
              custom={1.6}
              variants={variants}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count115}+</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Awards & Honors
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WhyChooseUsText;