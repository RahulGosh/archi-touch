import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { singleProjectsData } from "../../data/singleProjectsData";
import "./feedbackForProjectDetail.css";
import MagneticForInstagram from "../../utils/magneticForInstagram";
import { FaInstagram } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    text: "Stylish, functional, and unique. Decor nailed it! Working with Decor was a delightful experience. Their innovative designs and professional approach resulted in a space that is both beautiful and practical.",
    name: "Caitlyn Morhes",
    role: "LOVELY CUSTOMER",
    imgSrc:
      "https://t3.ftcdn.net/jpg/03/21/67/72/360_F_321677228_PybtVjGqx90y34jQzbyeALHhOncLC8DR.jpg",
  },
  {
    id: 2,
    text: "Decor's professionalism and creativity blew us away. They transformed our space into something truly special, blending style with comfort. Highly recommended!",
    name: "John Doe",
    role: "SATISFIED CLIENT",
    imgSrc:
      "https://t3.ftcdn.net/jpg/02/57/85/04/360_F_257850491_FZ84qizC8SllzxZCHLGovKLpRZ7DlCaT.jpg",
  },
  {
    id: 3,
    text: "Working with Decor was amazing! Their designs are top-notch, and they really listened to our needs, resulting in a space that’s uniquely ours.",
    name: "Jane Smith",
    role: "HAPPY CUSTOMER",
    imgSrc:
      "https://t3.ftcdn.net/jpg/03/24/36/88/360_F_324368861_ez4TGbQxWp6QoM9FXycM3ZiEpscf7Tml.jpg",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextFeedback();
    }, 5000);
  };

  const nextFeedback = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else {
        resetInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the interval if the document is not hidden
    if (!document.hidden) {
      resetInterval();
    }

    // Cleanup function
    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Heading */}

        {/* Testimonial Sliding */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              className="relative"
              // Exit animation: zoom out and fade out
              exit={{ opacity: 0, scale: 0.8 }}
              // Enter animation: zoom in and fade in
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Testimonial Text */}
              <motion.h4
                className="text-[0.7rem] sm:text-[1rem] md:text-[1.2rem] font-semibold mb-6"
                // initial={{ y: 50, opacity: 0 }}
                // animate={{ y: 0, opacity: 1 }}
                // transition={{ duration: 0.8 }}
              >
                WHAT THEY SAY ABOUT US
              </motion.h4>
              <p
                className="text-[1rem] sm:text-[1rem] md:text-xl lg:text-3xl mb-8 italic"
                style={{ lineHeight: "1.8" }}
              >
                {testimonials[currentIndex].text}
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <motion.img
                  src={testimonials[currentIndex].imgSrc}
                  alt={testimonials[currentIndex].name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="text-left">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ image, category, title, designer }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
    className="border border-gray-300 rounded-lg overflow-hidden flex flex-col md:flex-row p-3 md:p-4 gap-4 md:gap-8 hover:cursor-pointer relative"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-5px", threshold: 1 }}  // Adjusted margin and threshold
    variants={cardVariants}
    >
      <motion.div
        className="absolute inset-0 bg-gray-200"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? 0 : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg relative z-10">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-evenly relative z-10 space-y-4 md:space-y-0">
        <div>
        <div className="relative overflow-hidden h-auto sm:h-[2em] md:h-auto lg:h-[2.5rem]">
            <motion.h3
              initial={{ y: 0 }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={{ duration: 0.5 }}
              className="font-bold text-xl md:text-2xl text-gray-700"
            >
              {title}
            </motion.h3>
            <motion.h3
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? "0%" : "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 font-bold text-xl md:text-2xl text-gray-700"
            >
              {title}
            </motion.h3>
          </div>
          <p className="text-gray-500 text-base md:text-lg mt-2">
            By {designer}, Decor Group
          </p>
        </div>
        <div className="inline-block">
          <button className="text-left text-[10px] sm:text-sm md:text-base relative mb-3 sm:mb-0">
            <span className="relative">
              PROJECT DETAIL
              <span className="absolute left-0 top-4 md:top-8 w-full h-0.5 bg-gray-400"></span>
              <motion.span
                className="absolute left-0 top-4 md:top-8 w-full h-0.5 bg-gray-700"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: isHovered ? 0.4 : 0, // Apply delay only when hovering
                }}
                style={{ originX: isHovered ? 0 : 1 }}
              />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

function FeedbackForProjectDetail() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const container = useRef(null);
  const imageRefs = useRef([]);

  let animationFrameId = useRef(null);
  let xPercent = useRef(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  const animate = useCallback(() => {
    xPercent.current = (xPercent.current + 0.1) % 100; // Prevent endless accumulation
    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animate(); // Start animation on mount
    return () => cancelAnimationFrame(animationFrameId.current); // Cleanup animation on unmount
  }, [animate]);

  const handleRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const getRandomProjects = (projects) => {
    return [...projects].sort(() => Math.random() - 0.5).slice(0, 4);
  };

  const randomProjects = getRandomProjects(singleProjectsData);

  const images = [
    "https://images.pexels.com/photos/5900806/pexels-photo-5900806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <>
      <div ref={container} className="relative mb-[3rem]">
        <div
          className="relative w-[97%] sm:w-[94%] md:w-[97%] lg:w-[92%] mx-auto bg-cover bg-center rounded-lg 
           h-[60vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh]"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src="/interiorVideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="absolute inset-0 bg-black opacity-70 rounded-xl"></div>
          <Testimonial />
        </div>

        <div className="relative w-[93%] sm:w-[90%] md:w-[92%] lg:w-[90%] mx-auto bg-white py-8 sm:py-10 px-4 sm:px-8 rounded-lg border border-gray-300 -mt-8 z-10 sm:-mt-[3rem] lg:-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {randomProjects.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                designer={project.designer}
                category={project.category}
              />
            ))}
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
    </>
  );
}

export default FeedbackForProjectDetail;
