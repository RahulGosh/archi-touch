import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  useAnimation,
  useInView,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./leftSideStick.css";

const WorkStage = ({ stage, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      className={`relative py-4 px-4 border-y border-black cursor-pointer overflow-hidden ${
        isActive ? "bg-[#D8D2C2] text-black" : ""
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(stage)}
    >
      <span className="relative z-10">{stage}</span>
      <motion.div
        className="absolute inset-0 bg-[#D8D2C2]"
        initial="initial"
        animate={isHovered || isActive ? "visible" : "hidden"}
        variants={backgroundVariants}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

const Story = ({ project }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const exploreProjectsRef = useRef(null);
  const repeatedTextRef = useRef(null);
  const inspirationRef = useRef(null);
  const planningRef = useRef(null);
  const executionRef = useRef(null);
  const transformationRef = useRef(null);

  const [activeStage, setActiveStage] = useState("INSPIRATION");
  const [isHovered, setIsHovered] = useState(false);

  const controls = useAnimation();
  const exploreProjectsControls = useAnimation();

  const isSectionInView = useInView(sectionRef, { once: true });
  const isExploreProjectsInView = useInView(exploreProjectsRef, {
    threshold: 0.5,
  });
  const isRepeatedTextInView = useInView(repeatedTextRef, { threshold: 0.1 });

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (isRepeatedTextInView && screenWidth >= 935) {
      exploreProjectsControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    } else {
      exploreProjectsControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [isRepeatedTextInView, exploreProjectsControls]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          title.classList.add("stickys");
        } else {
          title.classList.remove("stickys");
        }
      },
      { threshold: 0.1, rootMargin: `-${section.offsetHeight}px 0px 0px 0px` }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const textRef = useRef(null);
  const titleControls = useAnimation();
  const textControls = useAnimation();

  const titleInView = useInView(titleRef, {
    triggerOnce: true,
    threshold: 0.5,
  });
  const textInView = useInView(textRef, { triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (titleInView) titleControls.start("visible");
    if (textInView) textControls.start("visible");
  }, [titleInView, textInView, titleControls, textControls]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleStageClick = useCallback(
    (stage) => {
      setActiveStage(stage);
      const refs = {
        INSPIRATION: inspirationRef,
        PLANNING: planningRef,
        EXECUTION: executionRef,
        TRANSFORMATION: transformationRef,
      };

      const ref = refs[stage];
      if (ref && ref.current) {
        setTimeout(() => {
          const yOffset = -90;
          const y =
            ref.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    },
    [inspirationRef, planningRef, executionRef, transformationRef]
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    const sections = [
      { ref: inspirationRef, stage: "INSPIRATION" },
      { ref: planningRef, stage: "PLANNING" },
      { ref: executionRef, stage: "EXECUTION" },
      { ref: transformationRef, stage: "TRANSFORMATION" },
    ];

    for (let i = sections.length - 1; i >= 0; i--) {
      const { ref, stage } = sections[i];
      if (ref.current && scrollPosition >= ref.current.offsetTop) {
        setActiveStage(stage);
        break;
      }
    }
  }, [inspirationRef, planningRef, executionRef, transformationRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeOut" } },
  };

  // Get the project details for the active stage
  const getStageContent = (stage) => {
    if (!project?.plans) return "";
    switch (stage) {
      case "INSPIRATION":
        return project.plans.inspiration;
      case "PLANNING":
        return project.plans.planning;
      case "EXECUTION":
        return project.plans.execution;
      case "TRANSFORMATION":
        return project.plans.transformation;
      default:
        return "";
    }
  };

  return (
    <div
      className="container max-w-7xl mx-auto px-4 pt-8 lg:pt-16 lg:px-16 flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8">
        {/* Left Side (Text Section) */}
        <motion.div
          className="w-full lg:w-1/3 flex flex-col justify-start px-0 sm:px-4"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-lg mb-8">WORK STAGES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-x-4">
            {["INSPIRATION", "PLANNING", "EXECUTION", "TRANSFORMATION"].map(
              (stage) => (
                <WorkStage
                  key={stage}
                  stage={stage}
                  isActive={activeStage === stage}
                  onClick={handleStageClick}
                />
              )
            )}
          </div>
          <div className="space-y-4 mt-12 sm:mt-14">
            {[
              { label: "Client", value: project?.client || "House Magazine" },
              { label: "Date", value: project?.date || "June, 2022" },
              { label: "Services", value: project?.category || "Interior Design" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-semibold text-black">{label}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-6 mt-6">
            {["X", "F", "@"].map((icon) => (
              <button
                key={icon}
                className="w-10 h-10 flex items-center justify-center border border-black rounded-full"
              >
                <span className="text-lg">{icon}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Side (Content Section) */}
        <div className="w-full lg:w-2/3 mt-8 lg:mt-0 flex flex-col px-0 sm:px-4 justify-center">
          {/* Inspiration Section */}
          <motion.div ref={inspirationRef} className="mb-0">
            <motion.h2
              className="text-base sm:text-base font-medium mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={titleVariants}
              transition={{ duration: 0.5 }}
            >
              INSPIRATION BEHIND OUR INTERIOR DESIGN CONCEPT
            </motion.h2>

            <motion.div initial="hidden" className="min-h-[200px] mb-8">
              <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={fadeInUpVariants}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transforming Visions Into Reality
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={fadeInUpVariants}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {getStageContent("INSPIRATION")}
              </motion.p>
              {project?.firstImage && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, threshold: 0.1 }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-96 w-full mb-8"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    mouseX.set(0.5);
                    mouseY.set(0.5);
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="w-full h-full"
                    style={{
                      rotateX: springRotateX,
                      rotateY: springRotateY,
                    }}
                  >
                    <motion.img
                      src={project.firstImage}
                      alt="Interior Design Example"
                      className="w-full h-full object-cover rounded-lg"
                      style={{
                        aspectRatio: "1 / 1",
                      }}
                    />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Planning Section */}
          <motion.div ref={planningRef}>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={titleVariants}
              transition={{ duration: 0.5 }}
            >
              Modern Living Spaces - Interior Design Planning
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {getStageContent("PLANNING")}
            </motion.p>

            {/* Two images side by side */}
            {project?.secondImage && project?.thirdImage && (
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <motion.img
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, threshold: 0.1 }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  src={project.secondImage}
                  alt="Planning Example 1"
                  className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <motion.img
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, threshold: 0.1 }}
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  src={project.thirdImage}
                  alt="Planning Example 2"
                  className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </motion.div>

          {/* Execution Section */}
          <div className="mb-8" ref={executionRef}>
            <motion.h2
              className="text-base sm:text-base font-medium mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={titleVariants}
              transition={{ duration: 0.5 }}
            >
              EXECUTION OF OUR INTERIOR DESIGN PROJECT
            </motion.h2>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Bringing Designs to Life
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {getStageContent("EXECUTION")}
            </motion.p>
            {project?.fourthImage && (
              <motion.div
                className="relative h-96 w-full mb-4"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(0.5);
                  mouseY.set(0.5);
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                >
                  <motion.img
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, threshold: 0.1 }}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    src={project.fourthImage}
                    alt="Interior Design Execution Example"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Transformation Section */}
          <div>
            <motion.h2
              className="text-base sm:text-lg font-medium mb-4"
              ref={transformationRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={titleVariants}
              transition={{ duration: 0.5 }}
            >
              FINAL TRANSFORMATION OF YOUR INTERIOR SPACE
            </motion.h2>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Turning Concepts Into a Stunning Reality
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {getStageContent("TRANSFORMATION")}
            </motion.p>
            {project?.fifthImage && (
              <motion.div
                className="relative h-96 w-full mb-6"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(0.5);
                  mouseY.set(0.5);
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                >
                  <motion.img
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, threshold: 0.1 }}
                    variants={fadeInUpVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    src={project.fifthImage}
                    alt="Interior Design Execution Example"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;