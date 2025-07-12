import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Magnetic from "../utils/magnetic";
import MagneticForInstagram from "../utils/magneticForInstagram";
import { FaInstagram } from "react-icons/fa";
import StickyFooter from "../components/stickyFooter";
import PlusSignCursor from "../utils/plusSignCursor";
import "./projects.css";
import { singleProjectsData } from "../data/singleProjectsData";
import { Link } from "react-router-dom";

const newProjects = [
  {
    id: 1,
    title: "Urban City Life",
    category: "Digital Design",
    image:
      "https://imgs.search.brave.com/OOMJsKZVrXWnzq1rLQreKmGT3NdH978BoLhwBtXkmLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/Njk1MTkzMy9waG90/by8zZC1yZW5kZXJp/bmctb24tbHV4dXJp/b3VzLWFwYXJ0bWVu/dC1pbnRlcmlvci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/MnFHSDRVOVRMLW1D/dExRLWVOTFdNWmJq/ejJ1NGh6YXpESWR1/NUdBdFFaUT0",
    span: "row-span-1",
  },
  {
    id: 2,
    title: "Case Study",
    category: "Digital Design",
    image:
      "https://imgs.search.brave.com/4xatqmigm5GeYoYib1cl1DbnYC-ZjdDaimz67kiTd7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9yZWdh/bi1iYWtlci1kZXNp/Z24taGJ4MTEwMTE5/amliZG9vcnMtMDAz/LXBoLXNhcmFoLWhl/YmVuc3RyZWl0LTY2/OWZiY2FlZTIwNjMu/anBnP2Nyb3A9MS4w/MHh3OjAuNjcyeGg7/MCwwLjIwN3hoJnJl/c2l6ZT0zNjA6Kg",
    span: "row-span-2",
  },
  {
    id: 3,
    title: "Modern Architecture",
    category: "Branding",
    image:
      "https://imgs.search.brave.com/RWiXQbvJ4Qp_yVi5Avc6ADww_1gNOO3Yr-k7uDgTuzo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbnRlcmlvci1k/ZXNpZ24tY296eS1s/aXZpbmctcm9vbS13/aXRoLXN0eWxpc2gt/YWktZ2VuZXJhdGl2/ZV8yMTA4NS0yNDc0/My5qcGc_c2l6ZT02/MjYmZXh0PWpwZw",
    span: "row-span-1",
  },
  {
    id: 4,
    title: "Prestigious Penthouse",
    category: "Ecommerce",
    image:
      "https://imgs.search.brave.com/4xatqmigm5GeYoYib1cl1DbnYC-ZjdDaimz67kiTd7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9yZWdh/bi1iYWtlci1kZXNp/Z24taGJ4MTEwMTE5/amliZG9vcnMtMDAz/LXBoLXNhcmFoLWhl/YmVuc3RyZWl0LTY2/OWZiY2FlZTIwNjMu/anBnP2Nyb3A9MS4w/MHh3OjAuNjcyeGg7/MCwwLjIwN3hoJnJl/c2l6ZT0zNjA6Kg",
    span: "row-span-2",
  },
  {
    id: 5,
    title: "Refined Elegance",
    category: "Branding",
    image:
      "https://imgs.search.brave.com/8_5GVwhWnqMzEDy51KhkYeRiIedqrtD7aJRAqcuu8-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/MTE3NzAxNS9waG90/by9tb2Rlcm4tbGl2/aW5nLXJvb20taW4t/bmF0dXJhbC1ib3Rh/bmljYWwtc3R5bGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWg1b05DZEVTX1I2/OFpiSWZBOGV6NlBE/WklCekpKUFR1bGdY/R0Y2V0pFSUU9",
    span: "row-span-1",
  },
  {
    id: 6,
    title: "House Renovation",
    category: "Branding",
    image:
      "https://imgs.search.brave.com/4xatqmigm5GeYoYib1cl1DbnYC-ZjdDaimz67kiTd7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9yZWdh/bi1iYWtlci1kZXNp/Z24taGJ4MTEwMTE5/amliZG9vcnMtMDAz/LXBoLXNhcmFoLWhl/YmVuc3RyZWl0LTY2/OWZiY2FlZTIwNjMu/anBnP2Nyb3A9MS4w/MHh3OjAuNjcyeGg7/MCwwLjIwN3hoJnJl/c2l6ZT0zNjA6Kg",
  },
];

const images = [
  "https://images.pexels.com/photos/5900806/pexels-photo-5900806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const categories = [
  "All",
  "Branding",
  "Custom Print",
  "Digital Design",
  "Ecommerce",
  "Masonry",
  "Portfolio Single",
];

const Projects = () => {
  const imageRefs = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(singleProjectsData);
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [10, 0]);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(singleProjectsData);
    } else {
      const filtered = singleProjectsData.filter(
        (project) => project.category === activeFilter
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);

  const handleRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  // Update cursor position on hover
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stickyElement = useRef(null);

  return (
    <>
      <div>
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
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{
                        duration: 0.5, // Adjust duration for smoothness
                        ease: "easeInOut", // Smoother easing
                      }}
                      className={`${project.span}`} // Apply span classes here
                    >
                      <Link to={`/project/detail/${project.id}`}>
                        <motion.div
                          className={`relative overflow-hidden rounded-lg cursor-pointer w-full h-full`}
                          onMouseEnter={() => setHoveredProject(project.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onMouseMove={handleMouseMove}
                          animate={{
                            y: hoveredProject === project.id ? -4 : 0,
                          }}
                        >
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            animate={{
                              scale: hoveredProject === project.id ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />

                          <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoveredProject === project.id ? 0.9 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                          {hoveredProject === project.id && (
                            <motion.div
                              initial={{ x: "-20px", opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: "-20px", opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <motion.div
                                className="text-white text-6xl font-bold"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                exit={{ x: -10 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                              >
                                →
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Title - Place it below the image */}
                        <h2 className="text-lg font-semibold text-left">{project.title}</h2>

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
            viewport={{ once: true }}
          >
            Follow us on Instagram
          </motion.h2>

          <div className="flex flex-wrap -mx-2">
            {images.map((src, index) => (
              <div
                key={index}
                className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
              >
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.img
                    ref={handleRef}
                    src={src}
                    alt={`Interior ${index + 1}`}
                    className="w-full h-[150px] sm:h-[200px] object-cover rounded transition-transform duration-700 ease-in-out"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out rounded"></div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <MagneticForInstagram>
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20  border border-white">
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
      <motion.div style={{ height }} className="circleContainers">
        <div className="circles"></div>
      </motion.div>
      <StickyFooter />
    </>
  );
};

export default Projects;
