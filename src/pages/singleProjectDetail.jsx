import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Facebook, Twitter } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { singleProjectsData } from "../data/singleProjectsData";
import LeftSideStick from "../components/projectDetail/leftSideStick";
import FollowUs from "../components/home/followUs";
import FeedbackForProjectDetail from "../components/projectDetail/FeedbackForProjectDetail";
import Footer from "../components/footer";
import StickyFooter from "../components/stickyFooter";
import AutomaticTextSlider from "../components/aboutUs/automaticTextSlider";
import "./singleProjectDetail.css";

const SingleProjectDetail = () => {
  const { id } = useParams(); // Get project ID from the URL
  const [project, setProject] = useState(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const [randomProject, setRandomProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the index of the selected image

  const closeLightbox = () => setSelectedIndex(null); // Function to close the lightbox

  const container = useRef(null);
  const textRef = useRef(null);
  const textControls = useAnimation();

  const isTextInView = useInView(textRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (isTextInView) {
      textControls.start("show");
    } else {
      textControls.start("hidden");
    }
  }, [textControls, isTextInView]);

  const text = "Our Gallery";

  useEffect(() => {
    // Simulate API call by finding the project based on ID
    const foundProject = singleProjectsData.find((p) => p.id === parseInt(id));
    setProject(foundProject);

    // Get a random project that is not the current one
    const availableProjects = singleProjectsData.filter(
      (p) => p.id !== foundProject.id
    );
    const randomIndex = Math.floor(Math.random() * availableProjects.length);
    setRandomProject(availableProjects[randomIndex]);
  }, [id]);

  useEffect(() => {
    // Find the project based on the current ID
    const foundProject = singleProjectsData.find((p) => p.id === parseInt(id));
    setProject(foundProject);

    // Get a random project that is not the current one
    const availableProjects = singleProjectsData.filter(
      (p) => p.id !== foundProject.id
    );
    const randomIndex = Math.floor(Math.random() * availableProjects.length);
    setRandomProject(availableProjects[randomIndex]);
  }, [id]);

  const showNextImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === project?.galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPreviousImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? project?.galleryImages.length - 1 : prevIndex - 1
    );
  };

  const wordAnimation = {
    hidden: {},
    show: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      x: -30,
      transition: {
        type: "spring",
        duration: 2, // Set the duration to make it slower
        damping: 80, // Increased damping for a slower and smoother effect
        stiffness: 20, // Reduced stiffness for slower movement
      },
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        duration: 2, // Set the duration to make it slower
        damping: 15, // Increased damping for a slower and smoother effect
        stiffness: 80, // Reduced stiffness for slower movement
      },
    },
  };

  return (
    <div>
      <div className="relative mb-[3rem]">
        <div
          className="relative w-full mx-auto h-[50vh] sm:[150vh] md:h-[60vh] lg:h-[85vh] bg-cover bg-bottom"
          style={{
            backgroundImage: `url(${project?.mainHeaderImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Consultation Section */}
        <div className="relative w-[95%] lg:w-[90%] mx-auto bg-white py-10 px-4 sm:px-2 rounded-lg border border-gray-300 -mt-20 z-10 sm:-mt-40 lg:-mt-40 custom-singleProjectDetail-rightImage:w-[85%]">
          <div className="px-0 py-0 md:px-6 md:py-2">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left content */}
              <div className="lg:w-2/3 flex flex-col justify-between h-full">
                {/* Top: ART DECO and Date */}
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-base font-semibold text-gray-500">
                      INTERIOR
                    </span>
                    <span className="mx-6 text-gray-300">———</span>
                    <span className="text-base text-gray-500">
                      {/* APRIL 15, 2022 */}
                      {project?.date}
                    </span>
                  </div>

                  {/* Title and content */}
                  <motion.h1
                    className="text-[2rem] sm:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {project?.title}
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {project?.description}
                  </motion.p>
                </div>

                {/* Bottom: Share Section */}
                <div className="flex justify-between items-center mt-4 sm:mt-12">
                  <span className="font-semibold text-base">SHARE ON:</span>
                  <div className="flex space-x-4">
                    <motion.button
                      className="p-2 bg-black rounded-full"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Facebook size={25} color="white" />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-black rounded-full"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Twitter size={25} color="white" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Side Image and "You May Also Like" section */}
              <div
                className="lg:w-[53.333333%] flex flex-col"
                onMouseEnter={() => setIsHoveredTitle(true)}
                onMouseLeave={() => setIsHoveredTitle(false)}
              >
                <div className="flex-grow relative h-full overflow-hidden hover:cursor-pointer">
                  {/* Image */}
                  <motion.img
                    src="https://cdn.prod.website-files.com/66680ca683883f060b42340f/666ff036c42c74da3f142332_Banner-9.jpg"
                    alt="Modern Elegance"
                    className="w-full h-[300px] sm:h-[500px] lg:h-full object-cover rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 50 }} // Start hidden
                    whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                    viewport={{ once: true }} // Animate only once
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  />

                  {/* Overlay Box with Text */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
                    <div className="w-full">
                      <span className="text-xs text-gray-500 font-semibold block">
                        YOU MAY ALSO LIKE IT
                      </span>

                      <div className="relative overflow-hidden h-[30px] w-full">
                        {/* Title - First instance */}
                        <h2
                          className="text-xl md:text-xl lg:text-xl font-bold absolute w-full text-left transition-transform duration-500 ease-in-out"
                          style={{
                            transform: isHoveredTitle
                              ? "translateY(-140%)"
                              : "translateY(0)",
                          }}
                        >
                          {randomProject?.title}
                        </h2>

                        {/* Title - Second instance */}
                        <h2
                          className="text-xl md:text-xl lg:text-xl font-bold absolute w-full text-left transition-transform duration-500 ease-in-out"
                          style={{
                            transform: isHoveredTitle
                              ? "translateY(0)"
                              : "translateY(140%)",
                          }}
                        >
                          {randomProject?.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-10">
          <LeftSideStick project={project} />
        </div>

        <div className="mt-5 sm:mt-16 px-4">
          {/* <h2 className="text-3xl font-bold mb-10 text-center">Our Gallery</h2> */}
          <motion.h1
            className="text-4xl font-bold mb-10 text-center"
            ref={textRef}
            variants={wordAnimation}
            initial="hidden"
            animate={textControls}
            transition={{
              delayChildren: 0.2,
              staggerChildren: 0.2,
            }}
          >
            {text.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={characterAnimation}
                className="inline-block mr-2" // Add a small margin-right to handle spaces
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project?.galleryImages.map((image, index) => (
              <AnimatedImage
                key={index}
                src={image.src}
                animationType={image.animationType}
                direction={image.direction}
                onClick={() => setSelectedIndex(index)} // Open lightbox with the clicked image
              />
            ))}
          </div>

          {selectedIndex !== null && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={closeLightbox}
                aria-label="Close"
              >
                &times;
              </button>

              {/* Previous Button */}
              <button
                className="absolute left-4 sm:left-2 text-white font-bold bg-black bg-opacity-50 rounded-full z-10
                 px-2 py-0 text-xl sm:text-lg sm:px-4 sm:py-2"
                onClick={showPreviousImage}
              >
                &#10094;
              </button>

              <div className="relative max-w-4xl w-full max-h-screen p-4">
                <div className="overflow-auto h-full">
                  <img
                    src={project?.galleryImages[selectedIndex].src}
                    alt={`Image ${selectedIndex + 1}`}
                    className="w-full h-auto object-contain cursor-zoom-in"
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                className="absolute right-4 sm:right-2 text-white font-bold bg-black bg-opacity-50 rounded-full z-10
                 px-2 py-0 text-xl sm:text-lg sm:px-4 sm:py-2"
                onClick={showNextImage}
              >
                &#10095;
              </button>
            </div>
          )}
        </div>

        <section>
          <AutomaticTextSlider />
        </section>

        <div className="mt-16 mb-0 sm:mt-20">
          <FeedbackForProjectDetail />
        </div>

        {/* <motion.div style={{ height }} className="circleContainers">
        <div className="circles"></div>
      </motion.div> */}
      </div>
      <StickyFooter />
    </div>
  );
};

const AnimatedImage = ({
  src,
  animationType,
  direction = "topToBottom",
  onClick,
}) => {
  const ref = React.useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getVariants = () => {
    if (animationType === "height") {
      return {
        hidden: {
          clipPath:
            direction === "bottomToTop"
              ? "inset(100% 0 0 0)"
              : "inset(0 0 100% 0)",
        },
        visible: {
          clipPath: "inset(0 0 0 0)",
          transition: { duration: 1, ease: "easeInOut" },
        },
      };
    } else if (animationType === "leftToRight") {
      return {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: {
          clipPath: "inset(0 0 0 0)",
          transition: { duration: 1, ease: "easeInOut" },
        },
      };
    } else if (animationType === "rightToLeft") {
      return {
        hidden: { clipPath: "inset(0 0 0 100%)" },
        visible: {
          clipPath: "inset(0 0 0 0)",
          transition: { duration: 1, ease: "easeInOut" },
        },
      };
    }
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full rounded-lg shadow-lg cursor-pointer"
      onClick={() => onClick(src)}
    >
      <motion.div
        animate={controls}
        initial="hidden"
        variants={getVariants()}
        className="h-full"
      >
        <img
          src={src}
          alt="Gallery"
          className="w-full object-cover h-[300px] md:h-[400px] lg:h-[360px] xl:h-[450px]"
        />
      </motion.div>
    </div>
  );
};

export default SingleProjectDetail;
