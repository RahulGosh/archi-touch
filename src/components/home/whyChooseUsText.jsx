import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import useCountUp from "../../utils/useCountUp"
import "./whyChooseUsText.css";

const WhyChooseUsText = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stats500Ref = useRef(null);
  const stats98Ref = useRef(null);
  const stats85KRef = useRef(null);
  const stats115Ref = useRef(null);

  const controls = useAnimation();
  const stats500Controls = useAnimation();
  const stats98Controls = useAnimation();
  const stats85KControls = useAnimation();
  const stats115Controls = useAnimation();

  const isSectionInView = useInView(sectionRef, { once: true });
  const is500InView = useInView(stats500Ref, { once: true });
  const is98InView = useInView(stats98Ref, { once: true });
  const is85KInView = useInView(stats85KRef, { once: true });
  const is115InView = useInView(stats115Ref, { once: true });

  const count500 = useCountUp(is500InView ? 500 : 0, 2000);
  const count98 = useCountUp(is98InView ? 98 : 0, 2000);
  const count85K = useCountUp(is85KInView ? 85000 : 0, 2000); // Slow counting for 85K
  const count115 = useCountUp(is115InView ? 115 : 0, 2000);

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  useEffect(() => {
    if (is500InView) {
      stats500Controls.start("visible");
    }
  }, [is500InView, stats500Controls]);

  useEffect(() => {
    if (is98InView) {
      stats98Controls.start("visible");
    }
  }, [is98InView, stats98Controls]);

  useEffect(() => {
    if (is85KInView) {
      stats85KControls.start("visible");
    }
  }, [is85KInView, stats85KControls]);

  useEffect(() => {
    if (is115InView) {
      stats115Controls.start("visible");
    }
  }, [is115InView, stats115Controls]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          title.classList.add("sticky");
        } else {
          title.classList.remove("sticky");
        }
      },
      { threshold: 1, rootMargin: `-${title.offsetHeight}px 0px 0px 0px` }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);



  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.3 },
    }),
  };

  return (
    <div
      className="container max-w-7xl mx-auto custom-md:max-w-5xl custom-md:mx-auto px-0 pt-16 pb-0 mb-0"
      ref={sectionRef}
    >
      <div className="flex flex-col custom-md:flex-row justify-between w-full">
        {/* Left Side - "Why Choose Us?" Heading */}
        <motion.div
          className="w-full custom-md:w-1/2 flex flex-col justify-start px-4"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          variants={textVariants}
        >
          <h6 className="text-custom-md uppercase tracking-wider">
            Our Unique Advantages
          </h6>
          <h2 className="text-[43px] custom-md:text-5xl custom-whyChooseUsText-md:text-5xl font-bold mt-4">
            Why Choose Us?
          </h2>
        </motion.div>

        {/* Right Side - Long Description and Statistics */}
        <div className="w-full custom-md:w-1/2 mt-8 custom-md:mt-0 flex flex-col space-y-8 px-4">
          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            At Decor, we take pride in transforming spaces into stunning,
            functional works of art. Over the years, we've completed over 500
            projects, consistently exceeding our clients' expectations.
          </motion.p>
          <motion.p
            className="text-gray-600 text-base custom-md:text-base leading-relaxed"
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            Our success is built on the satisfaction of our clients, who trust
            us to bring their visions to life with creativity and precision.
          </motion.p>

          <div
            className="grid grid-cols-2 gap-x-6 gap-y-6 custom-md:gap-x-12 custom-md:gap-y-12"
          >
            <motion.div
              className="text-start stat-left"
              custom={0}
              initial="hidden"
              animate={stats500Controls}
              variants={statVariants}
              ref={stats500Ref}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count500}+</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Realized Projects
              </p>
            </motion.div>
            <motion.div
              className="text-start stat-right"
              custom={1}
              initial="hidden"
              animate={stats98Controls}
              variants={statVariants}
              ref={stats98Ref}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">{count98}%</h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Client Satisfaction
              </p>
            </motion.div>
            <motion.div
              className="text-start stat-left"
              custom={2}
              initial="hidden"
              animate={stats85KControls}
              variants={statVariants}
              ref={stats85KRef}
            >
              <h3 className="custom-md:text-6xl text-7xl font-bold">
                {Math.ceil(count85K / 1000)}K
              </h3>
              <p className="uppercase tracking-wide text-gray-500 mt-2 custom-md:text-xs text-sm font-bold">
                Common Partners
              </p>
            </motion.div>
            <motion.div
              className="text-start stat-right"
              custom={3}
              initial="hidden"
              animate={stats115Controls}
              variants={statVariants}
              ref={stats115Ref}
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
};

export default WhyChooseUsText;
