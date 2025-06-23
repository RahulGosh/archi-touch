import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import useCountUp from "../../utils/useCountUp";
import "./whyChooseUsText.css";

const WhyChooseUsText = React.memo(() => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  const controls = useAnimation();
  const isSectionInView = useInView(sectionRef, { once: true, margin: "100px" });

  const count500 = useCountUp(isSectionInView ? 500 : 0, 1500);
  const count98 = useCountUp(isSectionInView ? 98 : 0, 1500);
  const count85K = useCountUp(isSectionInView ? 85000 : 0, 2000);
  const count115 = useCountUp(isSectionInView ? 115 : 0, 1500);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: delay * 0.1 }
    })
  };

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  return (
    <div
      className="container max-w-7xl mx-auto custom-md:max-w-5xl custom-md:mx-auto px-0 pt-16 pb-0 mb-0"
      ref={sectionRef}
    >
      <div className="flex flex-col custom-md:flex-row justify-between w-full">
        <motion.div
          className="w-full custom-md:w-1/2 flex flex-col justify-start px-4"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          custom={0}
          variants={variants}
        >
          <h6 className="text-custom-md uppercase tracking-wider">
            Our Unique Advantages
          </h6>
          <h2 className="text-[43px] custom-md:text-5xl custom-whyChooseUsText-md:text-5xl font-bold mt-4">
            Why Choose Us?
          </h2>
        </motion.div>

        <div className="w-full custom-md:w-1/2 mt-8 custom-md:mt-0 flex flex-col space-y-8 px-4">
          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            custom={1}
            variants={variants}
          >
            At Decor, we take pride in transforming spaces into stunning,
            functional works of art. Over the years, we've completed over 500
            projects, consistently exceeding our clients' expectations.
          </motion.p>

          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            custom={2}
            variants={variants}
          >
            Our success is built on the satisfaction of our clients, who trust
            us to bring their visions to life with creativity and precision.
          </motion.p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 custom-md:gap-x-12 custom-md:gap-y-12">
            <motion.div
              className="text-start stat-left"
              initial="hidden"
              animate={controls}
              custom={3}
              variants={variants}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count500}+</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Realized Projects
              </p>
            </motion.div>

            <motion.div
              className="text-start stat-right"
              initial="hidden"
              animate={controls}
              custom={4}
              variants={variants}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count98}%</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Client Satisfaction
              </p>
            </motion.div>

            <motion.div
              className="text-start stat-left"
              initial="hidden"
              animate={controls}
              custom={5}
              variants={variants}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">
                {Math.floor(count85K / 1000)}K
              </h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Common Partners
              </p>
            </motion.div>

            <motion.div
              className="text-start stat-right"
              initial="hidden"
              animate={controls}
              custom={6}
              variants={variants}
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