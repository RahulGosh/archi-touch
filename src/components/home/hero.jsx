import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

const images = [
  {
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fusing Creativity with",
    subtitle: "DESIGN",
    description:
      "believe that well-designed space can have a profound impact on quality life.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Creating Timeless",
    subtitle: "ART",
    description: "artistry that stands the test of time and trends.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Innovating Through",
    subtitle: "TECHNOLOGY",
    description: "leveraging the latest technology for innovative designs.",
  },
];

const Hero = memo(() => {
  const container = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  const changeImage = useCallback(
    (direction = 1) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setShowText(false);
      setCurrentImageIndex((prevIndex) => {
        const newIndex =
          (prevIndex + direction + images.length) % images.length;
        return newIndex;
      });
    },
    [isTransitioning]
  );

  useEffect(() => {
    let interval;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => changeImage(1), 10000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the interval if the document is visible
    if (!document.hidden) {
      interval = setInterval(() => changeImage(1), 10000);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [changeImage]);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 800);

    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // Match this with your transition duration

    return () => {
      clearTimeout(textTimer);
      clearTimeout(transitionTimer);
    };
  }, [currentImageIndex]);

  const handlePrev = () => changeImage(-1);
  const handleNext = () => changeImage(1);

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        delay: 1,
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      scale: 0.7,
      opacity: 0,
      z: -100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      z: 0,
      transition: {
        type: "tween",
        stiffness: 100,
        damping: 15,
        delay: 2.5,
      },
    },
  };

  const subtitleVariants = {
    hidden: { scale: 0.8, opacity: 0, x: -50 },
    visible: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 2.1,
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={container}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          style={{
            y,
            position: "absolute",
            height: "100%",
            width: "100%",
            willChange: "clip-path, transform",
          }}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          // transition={{ duration: 0.7, type: "tween", ease: "easeInOut" }}
        >
          <img
            src={images[currentImageIndex].image}
            alt={`${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ willChange: "transform" }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-white text-2xl md:text-4xl font-bold mb-1"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {images[currentImageIndex].title}
            </motion.div>
            <motion.div
              className="text-white text-4xl md:text-6xl font-bold "
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {images[currentImageIndex].subtitle}
            </motion.div>
            <motion.hr
              className="my-4 md:my-8 w-48 md:w-96 border-t-2 border-white"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.div
              className="text-white text-base md:text-lg max-w-md"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {images[currentImageIndex].description}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setCurrentImageIndex(index);
                setIsTransitioning(true);
                setShowText(false);
              }
            }}
            className={`w-4 h-1 rounded-full transition-all duration-300 ${
              currentImageIndex === index
                ? "bg-white"
                : "bg-white bg-opacity-50"
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
});

export default Hero;
