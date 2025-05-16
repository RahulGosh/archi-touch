import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Cursor from "../../utils/cursor";
import useWindowSize from "../../utils/useWindowSize";
import { Link } from "react-router-dom";
import { singleProjectsData } from "../../data/singleProjectsData";

// Optimized ImageTextCard with React.memo and performance tweaks
const ImageTextCard = React.memo(({ title, author, year, imgSrc }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const size = useWindowSize();
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: "50px" });

  // Throttled hover handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleTitleEnter = useCallback(() => setIsHoveredTitle(true), []);
  const handleTitleLeave = useCallback(() => setIsHoveredTitle(false), []);

  useEffect(() => {
    if (inView) {
      controls.start({ 
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [inView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-black text-white overflow-hidden relative"
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Optimized image with decoding async */}
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-auto object-cover"
          decoding="async"
          loading="lazy"
        />
        {size.width > 768 && <Cursor isVisible={isHovered} />}
      </div>
      <div 
        className="p-4 flex justify-between items-start w-full"
        onMouseEnter={handleTitleEnter}
        onMouseLeave={handleTitleLeave}
      >
        <div className="flex flex-col justify-between w-full">
          <div className="relative overflow-hidden h-[3em]">
            {/* Optimized double text animation with will-change */}
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold absolute w-full"
              style={{
                transform: isHoveredTitle ? "translateY(-140%)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform"
              }}
            >
              {title}
            </h2>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold absolute w-full"
              style={{
                transform: isHoveredTitle ? "translateY(0)" : "translateY(140%)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform"
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
      </div>
    </motion.div>
  );
});

// Main Details component with optimized animations
const Details = React.memo(() => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });
  const controls = useAnimation();

  // Single animation controller for all elements
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 0.5
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="min-h-screen bg-black text-white p-4 md:p-8"
    >
      <motion.h3
        variants={headingVariants}
        className="text-base md:text-lg lg:text-xl font-bold mb-6 lg:mt-20 mt-12"
      >
        COMPREHENSIVE INTERIOR DESIGN SERVICES
      </motion.h3>
      
      <motion.h1
        variants={headingVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
      >
        A Journey From Concept To Stunning Reality In Our Award-Winning Urban
        Oasis Project
      </motion.h1>

      {/* First row */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            key={`first-${project.id}`}
            className={index === 0 ? "lg:col-span-2" : ""}
            variants={itemVariants}
            custom={index}
          >
            <Link to={`/project/detail/${project.id}`}>
              <ImageTextCard
                title={project.title}
                author={project.author}
                year={project.year}
                imgSrc={project.image}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Second row */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            key={`second-${project.id}`}
            className={index === 0 ? "lg:col-span-1" : "lg:col-span-2"}
            variants={itemVariants}
            custom={index}
          >
            <Link to={`/project/detail/${project.id}`}>
              <ImageTextCard
                title={project.title}
                author={project.author}
                year={project.year}
                imgSrc={project.firstImage}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

export default Details;