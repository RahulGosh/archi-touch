import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import MagneticForInstagram from "../utils/magneticForInstagram";
import PlusSignCursor from "../utils/plusSignCursor";
import StickyFooter from "../components/stickyFooter";
import { singleProjectsData } from "../data/singleProjectsData";
import "./projects.css";

// Memoized data
const categories = [
  "All",
  "Branding",
  "Custom Print",
  "Digital Design",
  "Ecommerce",
  "Masonry",
  "Portfolio Single",
];

const images = [
  "https://images.pexels.com/photos/5900806/pexels-photo-5900806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // ... other image URLs
];

const Projects = React.memo(() => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(singleProjectsData);
  
  const container = useRef(null);
  const imageRefs = useRef([]);

  // Optimized scroll effects
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [10, 0]);

  // Memoized filter function
  const filterProjects = useCallback(() => {
    if (activeFilter === "All") {
      setFilteredProjects(singleProjectsData);
    } else {
      setFilteredProjects(
        singleProjectsData.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Shared animation variants
  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5
      }
    },
    exit: { opacity: 0, y: -50 }
  };

  const hoverVariants = {
    hover: { 
      y: -4,
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    initial: { y: 0, scale: 1 }
  };

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      singleProjectsData.forEach(project => {
        const img = new Image();
        img.src = project.image;
      });
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  return (
    <>
      <div ref={container}>
        {/* Portfolio Section */}
        <div className="min-h-screen flex items-center justify-center pt-28 pb-8">
          {hoveredProject && <PlusSignCursor x={cursorPos.x} y={cursorPos.y} />}

          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white p-[0.5rem] sm:p-8">
              <div className="mb-8">
                <span className="bg-black text-white px-[0.5rem] sm:px-4 py-2 rounded-full text-sm font-bold">
                  OUR WORKS
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif italic mb-4">
                Recent
              </h1>
              <h1 className="text-5xl md:text-8xl font-sans font-bold mb-8">
                Projects
              </h1>

              {/* Category Filter */}
              <div className="mt-20 sm:mt-28 mb-12">
                <p className="text-lg mb-4">Filter by</p>
                <div className="flex flex-wrap gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`text-gray-600 hover:text-black transition duration-300 ${
                        activeFilter === category ? "font-bold" : ""
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 auto-rows-[200px]"
                layout
              >
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      variants={projectVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`${project.span || ""}`}
                    >
                      <Link to={`/project/detail/${project.id}`}>
                        <motion.div
                          className="relative overflow-hidden rounded-lg cursor-pointer w-full h-full"
                          onMouseEnter={() => setHoveredProject(project.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onMouseMove={handleMouseMove}
                          variants={hoverVariants}
                          animate={hoveredProject === project.id ? "hover" : "initial"}
                        >
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />

                          <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoveredProject === project.id ? 0.9 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <AnimatePresence>
                            {hoveredProject === project.id && (
                              <motion.div
                                initial={{ x: "-20px", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-20px", opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <motion.span className="text-white text-6xl font-bold">
                                  →
                                </motion.span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <h2 className="text-lg font-semibold text-left mt-2">
                          {project.title}
                        </h2>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Instagram Section */}
        <div className="mt-8 md:mt-20 mb-8 md:mb-20 px-4 sm:px-8">
          <motion.h2
            className="text-lg sm:text-lg font-semibold mb-4 heading-line"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "100px" }}
          >
            Follow us on Instagram
          </motion.h2>

          <div className="flex flex-wrap -mx-2">
            {images.map((src, index) => (
              <div
                key={`insta-${index}`}
                className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
              >
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.img
                    src={src}
                    alt={`Interior ${index + 1}`}
                    className="w-full h-[150px] sm:h-[200px] object-cover rounded"
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded"></div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MagneticForInstagram>
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20 border border-white">
                        <FaInstagram size={20} color="white" />
                      </div>
                    </MagneticForInstagram>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <motion.div 
        style={{ height }} 
        className="circleContainers"
      />
      
      <StickyFooter />
    </>
  );
});

export default Projects;