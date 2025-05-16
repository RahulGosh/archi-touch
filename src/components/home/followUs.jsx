"use client";

import React, { useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import MagneticForInstagram from "../../utils/magneticForInstagram";

// Static data - moved outside component to prevent recreation
const IMAGES = [
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const HEADER_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Memoized sub-components to prevent unnecessary re-renders
const HeaderSection = React.memo(({ firstText, secondText }) => (
  <div
    className="relative w-[97%] mx-auto bg-cover bg-center rounded-lg h-[64vh] sm:h-[60vh] md:h-[90vh] lg:h-[100vh]"
    style={{ backgroundImage: `url('${HEADER_IMAGE}')` }}
  >
    <div className="absolute inset-0 bg-black opacity-50" />
    <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
      {/* Running Text */}
      <div className="sliderContainer absolute bottom-10 w-full overflow-hidden">
        <div className="slider relative whitespace-nowrap">
          <p
            ref={firstText}
            className="text-6xl sm:7xl md:text-9xl font-bold uppercase inline-block will-change-transform"
          >
            Transform Your Space -
          </p>
          <p
            ref={secondText}
            className="text-6xl sm:7xl md:text-9xl font-bold uppercase inline-block will-change-transform ml-4"
          >
            Transform Your Space -
          </p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "100px" }}
        className="max-w-[90%] sm:max-w-lg"
      >
        <p className="mt-2 sm:mt-10 text-base">
          Our expert designers provide personalized guidance to help bring
          your vision to life.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded will-change-transform"
        >
          Contact Experts
        </motion.button>
      </motion.div>
    </div>
  </div>
));

// Memoized Instagram image component
const InstagramImage = React.memo(({ src, index }) => {
  return (
    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
      <motion.div
        className="relative group cursor-pointer"
        initial={false}
        whileHover="hover"
        variants={{
          hover: { scale: 1.05, rotate: 3 }
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
      >
        <motion.img
          src={src}
          alt={`Interior design ${index + 1}`}
          className="w-full h-[150px] sm:h-[200px] object-cover rounded"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
        />
        <motion.div
          className="absolute inset-0 bg-black rounded"
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 0.4 }
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          variants={{
            hover: { opacity: 1, y: 0 }
          }}
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
  );
});

// Memoized consultation form section
const ConsultationSection = React.memo(() => (
  <div className="relative w-[93%] mx-auto bg-gray-50 pt-10 pb-6 px-4 rounded-lg border border-gray-300 -mt-16 z-10 sm:-mt-24 lg:-mt-16">
    <div className="bg-gray-50 p-0 md:p-5">
      <div className="flex flex-col md:flex-row gap-10">
        <motion.div 
          className="md:w-[64%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold mb-4">
            Unlock Your Dream Home: Free Expert Consultation!
          </h1>
          <p className="text-gray-600">
            At Decor, we believe that every beautiful home starts with a
            great conversation.
          </p>
        </motion.div>

        <motion.div
          className="md:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg sm:text-lg font-semibold mb-4 heading-line">
            GET IN TOUCH
          </h2>
          <form className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-2 px-4 rounded"
            >
              SCHEDULE A CALL
            </motion.button>
            <input
              type="email"
              placeholder="HEY.EXPERT@GMAIL.COM"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="tel"
              placeholder="+1 642 890 1519"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </form>
        </motion.div>
      </div>
    </div>
  </div>
));

function FollowUs() {
  // Refs
  const firstText = useRef(null);
  const secondText = useRef(null);
  const container = useRef(null);
  const animationRef = useRef(null);
  const xPercent = useRef(0);

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Define transform values outside of useMemo - hooks must be called at the top level
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  // Animation setup and cleanup with useCallback for better performance
  const setupAnimation = useCallback(() => {
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }

    const animate = () => {
      if (xPercent.current > 0) xPercent.current = -100;

      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
      }

      xPercent.current += 0.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Use useLayoutEffect to set up animations before paint
  useLayoutEffect(() => {
    const cleanup = setupAnimation();
    return cleanup;
  }, [setupAnimation]);

  // Memoize the Instagram images list to prevent rebuilding on every render
  const instagramImages = useMemo(() => (
    IMAGES.map((src, index) => (
      <InstagramImage key={`instagram-img-${index}`} src={src} index={index} />
    ))
  ), []);

  return (
    <div ref={container} className="relative mb-[3rem]">
      {/* Header Section */}
      <HeaderSection firstText={firstText} secondText={secondText} />

      {/* Consultation Section */}
      <ConsultationSection />

      {/* Instagram Section */}
      <motion.div
        className="mt-8 md:mt-20 mb-0 px-0 sm:px-0 bg-gray-50 p-0 md:p-5 mx-auto w-[93%] rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg sm:text-lg font-semibold mb-4 heading-line">
          Follow us on Instagram
        </h2>
        <div className="flex flex-wrap -mx-2">
          {instagramImages}
        </div>
      </motion.div>

      {/* Circle Animation */}
      <motion.div 
        style={{ height }} 
        className="circleContainer will-change-transform"
      >
        <div className="circle" />
      </motion.div>
    </div>
  );
}

export default React.memo(FollowUs);