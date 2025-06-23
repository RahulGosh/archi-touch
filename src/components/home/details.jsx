import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { singleProjectsData } from "../../data/singleProjectsData";

const ImageTextCard = React.memo(({ title, author, year, imgSrc }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: "50px" });

  useEffect(() => {
    if (inView) {
      controls.start({ 
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-black text-white overflow-hidden relative"
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex justify-between items-start w-full">
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {title}
          </h2>
          <div className="flex justify-between mt-0 md:mt-3 text-[#ffffff80] w-full">
            <p className="text-sm md:text-lg">By {author}</p>
            <p className="text-sm md:text-lg">{year}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Details = React.memo(() => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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
        variants={itemVariants}
        className="text-base md:text-lg lg:text-xl font-bold mb-6 lg:mt-20 mt-12"
      >
        COMPREHENSIVE INTERIOR DESIGN SERVICES
      </motion.h3>
      
      <motion.h1
        variants={itemVariants}
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
      >
        A Journey From Concept To Stunning Reality In Our Award-Winning Urban
        Oasis Project
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            key={`first-${project.id}`}
            className={index === 0 ? "lg:col-span-2" : ""}
            variants={itemVariants}
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

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
      >
        {singleProjectsData.slice(0, 2).map((project, index) => (
          <motion.div
            key={`second-${project.id}`}
            className={index === 0 ? "lg:col-span-1" : "lg:col-span-2"}
            variants={itemVariants}
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