import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Magnetic from "../utils/magnetic";
import "./footer.css";

// Texts that will cycle through
const textArray = [
  "Interior Design",
  "Amazing Residential",
  "City Marks",
  "NEW DESIGN?",
];

const BoxItem = ({ text, widths, heights }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="box-item-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`relative flex justify-center items-center overflow-hidden rounded-full border transition-all duration-500 ${
          isHovered
            ? "bg-white text-black border-black"
            : "bg-transparent text-white border-white"
        } ${widths} ${heights}`}
      >
        {/* First Text Animation */}
        <button
          className="absolute flex items-center justify-center text-base sm:text-base md:text-lg lg:text-lg transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
          }}
        >
          {text}
        </button>
        {/* Second Text Animation */}
        <button
          className="absolute flex items-center justify-center text-base sm:text-base md:text-lg lg:text-lg transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {text}
        </button>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Typing effect logic
    if (isTyping) {
      const currentText = textArray[currentIndex];
      const typingInterval = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length < currentText.length) {
            return currentText.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            return currentText;
          }
        });
      }, 100);

      return () => clearInterval(typingInterval);
    } else {
      const eraseInterval = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length > 0) {
            return prev.slice(0, prev.length - 1);
          } else {
            clearInterval(eraseInterval);
            setIsTyping(true);
            return "";
          }
        });
      }, 50);

      return () => clearInterval(eraseInterval);
    }
  }, [isTyping, currentIndex]);

  useEffect(() => {
    const changeTextInterval = setInterval(() => {
      setIsTyping(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 5000);

    return () => clearInterval(changeTextInterval);
  }, []);

  return (
    <footer className="relative bg-black text-white min-h-[60vh] md:min-h-[90vh]  sm:min-h-[70vh] sm:px-4 flex flex-col items-center">
      {/* Flex container for X icon and Social Media Links */}
      <div className="w-full flex justify-between items-center mt-4 flex-col sm:flex-row">
        {/* Top Left Icon */}
        <div className="flex justify-center items-center mb-4 sm:mb-0">
          <span className="text-white text-xl sm:text-2xl">✖</span>
        </div>

        {/* Top Right Social Media Links */}
        <div className="flex justify-center items-center space-x-2 text-xs text-gray-400 text-center sm:text-right">
          <Magnetic>
            <div>
              <a
                href="#"
                className="border border-white rounded-full px-2 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-xl inline-block hover:bg-white hover:text-black transition"
              >
                INSTAGRAM
              </a>
            </div>
          </Magnetic>
          <Magnetic>
            <div>
              <a
                href="#"
                className="border border-white rounded-full px-2 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-xl inline-block hover:bg-white hover:text-black transition"
              >
                FACEBOOK
              </a>
            </div>
          </Magnetic>
          <Magnetic>
            <div>
              <a
                href="#"
                className="border border-white rounded-full px-2 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-xl inline-block hover:bg-white hover:text-black transition"
              >
                TWITTER
              </a>
            </div>
          </Magnetic>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center mt-0">
        {/* <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
          Transform your space with Decor, where creativity meets functionality.
          Contact us today to start your journey towards a beautifully designed
          space that reflects your unique style and enhances your everyday
          living!
        </p> */}
        <div
          ref={ref}
          className="relative overflow-hidden mt-0 h-28 sm:h-56 w-full flex justify-center items-center"
        >
          <motion.h2
            className="text-[1.3rem] custom-footer-text-xl custom-footer-text-2-text-xs sm:text-3xl md:text-4xl lg:text-5xl font-bold absolute z-10"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            We’d love to cooperate to build
          </motion.h2>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold absolute z-10 mt-[5rem] sm:mt-[7rem] md:mt-[10rem]"
            initial={{ x: "100%" }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {displayText}
          </motion.h2>
        </div>

        <div className="mt-6 sm:mt-0 md:mt-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4">
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            Subscribe to our newsletter for the latest updates and design tips:
          </p>
          <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-1 rounded-full text-black text-xs sm:text-sm"
            />
            <button className="px-4 py-1 bg-white text-black rounded-full hover:bg-gray-300 transition text-xs sm:text-sm">
              SUBSCRIBE
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-x-[1rem] gap-y-3 mt-8 sm:items-center sm:gap-y-3">
          <BoxItem
            text="EXPERTS"
            widths="w-24 sm:w-28 md:w-28 lg:w-28"
            heights="h-8 sm:h-8 md:h-10 lg:h-10"
          />
          <BoxItem
            text="PRICING"
            widths="w-24 sm:w-28 md:w-28 lg:w-28"
            heights="h-8 sm:h-8 md:h-10 lg:h-10"
          />
          <BoxItem
            text="BEST SERVICE"
            widths="w-32 sm:w-32 md:w-36 lg:w-36"
            heights="h-8 sm:h-8 md:h-10 lg:h-10"
          />
          <div className="hidden sm:block">
            <BoxItem
              text="&#9650;"
              widths="w-12 sm:w-12 md:w-12 lg:w-12"
              heights="h-8 sm:h-8 md:h-10 lg:h-10"
            />
          </div>
        </div>
      </div>

      {/* Bottom Flex Container for X Icon and Disclaimer */}
      <div className="w-full flex justify-between items-center mt-8 sm:mt-8 mb-4 sm:mb-4 flex-col sm:flex-row">
        {/* Footer Bottom Text */}
        <div className="text-base text-gray-400 text-center sm:text-right mb-4 sm:mb-0">
          <p>&copy; Interior-Touch. All Rights Reserved. Licensing</p>
        </div>

        {/* Bottom Left Icon */}
        <div className="flex justify-center items-center">
          <span className="text-white text-xl sm:text-2xl">✖</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
