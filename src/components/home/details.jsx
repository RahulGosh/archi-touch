import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Cursor from "../../utils/cursor";
import useWindowSize from "../../utils/useWindowSize";
import { Link } from "react-router-dom";
import { singleProjectsData } from "../../data/singleProjectsData";

const ImageTextCard = ({ title, author, year, imgSrc }) => {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const imgControls = useAnimation();
  const textControls = useAnimation();
  const imgInView = useInView(imgRef, { once: true });
  const textInView = useInView(textRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const size = useWindowSize();

  const fadeInControls = useAnimation(); // Controls for fading in the black div
  const fadeInRef = useRef(null);
  const fadeInView = useInView(fadeInRef, { once: true });

  useEffect(() => {
    if (imgInView) {
      imgControls.start({ y: 0, transition: { duration: 0.3 } });
    }
    if (textInView) {
      textControls.start({ y: 0, transition: { duration: 0.5 } });
    }
  }, [imgInView, textInView, imgControls, textControls]);

  useEffect(() => {
    if (fadeInView) {
      fadeInControls.start({
        opacity: 1,
        transition: { duration: 1 }, // Adjust the duration as per your need
      });
    }
  }, [fadeInView, fadeInControls]);

  return (
    <motion.div
      ref={fadeInRef} // Ref to trigger fade-in when in view
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={fadeInControls} // Animate opacity when in view
      className="bg-black text-white overflow-hidden relative"
    >
      <motion.div
        ref={imgRef}
        initial={{ y: 50 }}
        animate={imgControls}
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={imgSrc} alt={title} className="w-full h-auto object-cover" />
        {size.width > 768 && <Cursor isVisible={isHovered} />}
      </motion.div>
      <motion.div
        ref={textRef}
        initial={{ y: 50 }}
        animate={textControls}
        className="p-4 flex justify-between items-start w-full"
        style={{ position: "relative" }}
        onMouseEnter={() => setIsHoveredTitle(true)}
        onMouseLeave={() => setIsHoveredTitle(false)}
      >
        <div className="flex flex-col justify-between w-full">
          <div
            className="relative overflow-hidden h-[3em]"
            onMouseEnter={() => setIsHoveredTitle(true)}
            onMouseLeave={() => setIsHoveredTitle(false)}
          >
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold absolute w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: isHoveredTitle
                  ? "translateY(-140%)"
                  : "translateY(0)",
              }}
            >
              {title}
            </h2>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold absolute w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: isHoveredTitle
                  ? "translateY(0)"
                  : "translateY(140%)",
              }}
            >
              {title}
            </h2>
          </div>
          <div className="flex justify-between mt-0 md:mt-3 text-[#ffffff80] w-full">
            <p className="text-sm md:text-lg">By {author}</p>
            <p className="text-sm md:text-lg">{year}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Details = () => {
  const controlsGroup1 = useAnimation();
  const controlsGroup2 = useAnimation();
  const refGroup1 = useRef(null);
  const refGroup2 = useRef(null);
  const inViewGroup1 = useInView(refGroup1, { once: true });
  const inViewGroup2 = useInView(refGroup2, { once: true });

  const headingControls = useAnimation();
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const fadeInControls = useAnimation(); // Controls for fading in the black div
  const fadeInRef = useRef(null);
  const fadeInView = useInView(fadeInRef, { once: true });

  useEffect(() => {
    if (headingInView) {
      headingControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [headingInView, headingControls]);

  useEffect(() => {
    if (inViewGroup1) {
      controlsGroup1.start((i) => ({
        y: 0,
        transition: { duration: 0.5, delay: i * 0.5 },
      }));
    }
  }, [inViewGroup1, controlsGroup1]);

  useEffect(() => {
    if (inViewGroup2) {
      controlsGroup2.start((i) => ({
        y: 0,
        transition: { duration: 0.5, delay: i * 0.5 },
      }));
    }
  }, [inViewGroup2, controlsGroup2]);

  useEffect(() => {
    if (fadeInView) {
      fadeInControls.start({
        opacity: 1,
        transition: { duration: 1 }, // Adjust the duration as per your need
      });
    }
  }, [fadeInView, fadeInControls]);

  return (
    <motion.div
      ref={fadeInRef} // Ref to trigger fade-in when in view
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={fadeInControls} // Animate opacity when in view
      className="min-h-screen bg-black text-white p-4 md:p-8"
    >
      {/* <motion.div className="min-h-screen bg-black text-white p-4 md:p-8"> */}
      <motion.h3
        ref={headingRef}
        initial={{ opacity: 0, y: 100 }}
        animate={headingControls}
        className="text-base md:text-lg lg:text-xl font-bold mb-6 lg:mt-20 mt-12"
      >
        COMPREHENSIVE INTERIOR DESIGN SERVICES
      </motion.h3>
      <motion.h1
        ref={headingRef}
        initial={{ opacity: 0, y: 100 }}
        animate={headingControls}
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
      >
        A Journey From Concept To Stunning Reality In Our Award-Winning Urban
        Oasis Project
      </motion.h1>

      {/* First row: Large image on the left, smaller image on the right */}
      <div
        ref={refGroup1}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            className={index === 0 ? "lg:col-span-2" : ""}
            custom={index}
            initial={{ y: 100 }}
            animate={controlsGroup1}
          >
            <Link key={project.id} to={`/project/detail/${project.id}`}>
              <ImageTextCard
                title={project.title}
                author={project.author}
                year={project.year}
                imgSrc={project.image}
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Second row: Smaller image on the left, large image on the right */}
      <div
        ref={refGroup2}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            key={project.id}
            className={index === 0 ? "lg:col-span-1" : "lg:col-span-2"}
            custom={index}
            initial={{ y: 100 }}
            animate={controlsGroup2}
          >
            <Link to={`/project/detail/${project.id}`}>
            <ImageTextCard
              title={project.title}
              author={project.author}
              year={project.year}
              imgSrc={project.firstImage} // Ensure you're using imgSrc here
            />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Details;