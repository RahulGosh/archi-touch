import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "./story.css";

const projects = [
  {
    id: 1,
    title: "LUXURY LIVING",
    description: "By Bjørn Andersen, Decor Group",
    image:
      "https://images.unsplash.com/photo-1572786258684-9b3d5671e7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 26, 2024",
  },
  {
    id: 2,
    title: "LUXURY LIVING",
    description: "By Bjørn Andersen, Decor Group",
    image:
      "https://images.unsplash.com/photo-1613082442324-62ef5249275e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 26, 2024",
  },
  {
    id: 3,
    title: "LUXURY LIVING",
    description: "By Bjørn Andersen, Decor Group",
    image:
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 26, 2024",
  },
  {
    id: 4,
    title: "LUXURY LIVING",
    description: "By Bjørn Andersen, Decor Group",
    image:
      "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 26, 2024",
  },
];

const StoryProjectCard = ({ title, description, image, date }) => {
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const [isHoveredArrow, setIsHoveredArrow] = useState(false);
  const [isHoveredImage, setIsHoveredImage] = useState(false);

  return (
    <div
      className="space-y-10 pb-0"
      onMouseEnter={() => {
        setIsHoveredTitle(true);
        setIsHoveredArrow(true);
        setIsHoveredImage(true);
      }}
      onMouseLeave={() => {
        setIsHoveredTitle(false);
        setIsHoveredArrow(false);
        setIsHoveredImage(false);
      }}
    >
      <div className="flex justify-between items-center border-t border-gray-300 pt-6 pb-0 mt-6">
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 w-full cursor-pointer">
          <motion.div className="w-full h-auto sm:w-[27rem] md:w-[32rem] lg:w-[30rem] sm:h-52 md:h-[13rem] lg:h-[13rem] rounded-lg shadow-lg border border-gray-300 overflow-hidden"
          >
            <motion.img
              src={image}
              alt="Project"
              animate={{ scale: isHoveredImage ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
          <div className="flex flex-col justify-between w-full py-1">
            <div>
              <div className="relative overflow-hidden h-[2.5em]">
                <motion.h3
                  initial={{ y: 0 }}
                  animate={{ y: isHoveredTitle ? "-100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-2xl text-gray-700"
                >
                  {title}
                </motion.h3>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: isHoveredTitle ? "0%" : "100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 font-bold text-2xl text-gray-700"
                >
                  {title}
                </motion.h3>
              </div>
              <p className="text-sm text-gray-500 mb-2">{description}</p>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <span className="text-gray-400 text-sm">{date}</span>
              <div className="relative overflow-hidden w-[1.2rem] h-[1.2rem] rounded-full">
                <motion.div
                  initial={{ backgroundColor: "#fff", color: "#000" }}
                  animate={{
                    backgroundColor: isHoveredArrow ? "#000" : "#fff",
                    color: isHoveredArrow ? "#fff" : "#000",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center rounded-full"
                >
                  <motion.svg
                    initial={{ x: 0 }}
                    animate={{ x: isHoveredArrow ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-[1rem] h-[1.1rem]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                  <motion.svg
                    initial={{ x: "-100%" }}
                    animate={{ x: isHoveredArrow ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-[1rem] h-[1.1rem]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add more project detail sections here if needed */}
    </div>
  );
};

const Story = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const exploreProjectsRef = useRef(null);
  const repeatedTextRef = useRef(null);

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
    // Get the current screen width
    const screenWidth = window.innerWidth;

    if (isRepeatedTextInView && screenWidth >= 935) { // Adjusted logic here
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
          title.classList.add("sticky");
        } else {
          title.classList.remove("sticky");
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

  return (
    <div
      className="container max-w-7xl mx-auto custom-md:max-w-6xl custom-md:mx-auto px-0 pb-0 bg-gray-100 flex items-center justify-center mt-[1.5rem] border border-gray-300 rounded-lg shadow-lg"
      ref={sectionRef}
    >
      <div className="flex flex-col custom-md:flex-row justify-between w-full">
        <motion.div
          className="w-full custom-md:w-1/2 flex flex-col justify-start px-4 pb-4"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          variants={textVariants}
        >
          <img
            src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Decor Image"
            className="w-full h-auto max-h-[25rem] sm:max-h-[28rem] custom-md:max-h-[36.7rem] lg:max-h-[36.7rem] object-cover rounded-lg shadow-lg"
            />
        </motion.div>

        <div className="w-full custom-md:w-1/2 mt-8 custom-md:mt-0 flex flex-col space-y-8 px-4 justify-center">
          <div className="max-w-md mx-auto text-center h-[30vh] sm:h-[40vh] custom-md:h-[72vh] flex flex-col justify-center">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              Unveiling the art of interior design
            </p>
            <h1 className="text-4xl sm:text-7xl font-bold mb-6">Our Story of Creativity</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              At Decor, we believe that exceptional design has the power to
              transform spaces and elevate everyday living.
            </p>
          </div>

          <motion.div
            className="my-12 text-center cursor-pointer"
            ref={exploreProjectsRef}
            initial={{ opacity: 1 }}
            animate={exploreProjectsControls}
          >
            <hr className="bg-black w-full h-[1px]" />
            <div className="flex align-center justify-between mt-6 mb-6">
              <div>
                <span className="text-lg">Explore Projects</span>
              </div>
              <div>
                <svg
                  className="w-8 h-8 p-[5px] border-1 border-black rounded-full ml-2 transform group-hover:rotate-90 transition-transform duration-300 text-xl align-center text-center"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:items-center mt-36">
            <div className="max-w-[30rem] sm:w-72 text-center sm:text-start text-gray-500">
              <span>
                We approach each project with a fresh perspective and inspiring
                spaces.
              </span>
            </div>

            <div>
              <button className="px-6 py-3 bg-black text-white font-semibold rounded-full">
                All Projects
              </button>
            </div>
          </div>

          {/* New Projects Detail Section */}
          <div className="pb-4" ref={repeatedTextRef}>
            <StoryProjectCard
              title="ppppppppp"
              description="ewqpoopdjqwpjwqd dwqd"
              date="June 25 2131"
              image="https://images.unsplash.com/photo-1572786258684-9b3d5671e7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <StoryProjectCard
              title="ppppppppp"
              description="ewqpoopdjqwpjwqd dwqd"
              date="June 25 2131"
              image="https://images.unsplash.com/photo-1572786258684-9b3d5671e7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <StoryProjectCard
              title="ppppppppp"
              description="ewqpoopdjqwpjwqd dwqd"
              date="June 25 2131"
              image="https://images.unsplash.com/photo-1572786258684-9b3d5671e7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <StoryProjectCard
              title="ppppppppp"
              description="ewqpoopdjqwpjwqd dwqd"
              date="June 25 2131"
              image="https://images.unsplash.com/photo-1572786258684-9b3d5671e7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
