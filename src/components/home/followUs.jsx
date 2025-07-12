"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import ImageSlider from "./imageSlider";
import "./followUs.css";
import Footer from "../footer";
import MagneticFramer from "../../utils/magneticFramer";
import Magnetic from "../../utils/magnetic";
import StickyFooter from "../stickyFooter";
import MagneticForInstagram from "../../utils/magneticForInstagram";

function FollowUs() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const imageRefs = useRef([]);
  const container = useRef(null);
  let xPercent = 0;
  let animationFrame;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  useLayoutEffect(() => {
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }
    startAnimation();
    return () => cancelAnimationFrame(animationFrame); // Clean up the animation
  }, []);

  const startAnimation = () => {
    animationFrame = requestAnimationFrame(animate);
  };

  const animate = () => {
    if (xPercent > 0) xPercent = -100;

    // Ensure elements exist before calling gsap.set()
    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent });
      gsap.set(secondText.current, { xPercent });
    }

    xPercent += 0.1;
    animationFrame = requestAnimationFrame(animate);
  };

  const images = [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  return (
    <>
      <div ref={container} className="relative mb-[3rem]">
        {/* Header Section with Running Text */}
        <div
          className="relative w-[97%] mx-auto bg-cover bg-center rounded-lg 
           h-[64vh] sm:h-[60vh] md:h-[90vh] lg:h-[100vh]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
            {/* Running Text */}
            <div
              ref={slider}
              className="sliderContainer absolute bottom-10 w-full"
            >
              <div className="slider relative whitespace-nowrap overflow-hidden">
                <p
                  ref={firstText}
                  className="text-6xl sm:7xl md:text-9xl font-bold uppercase"
                >
                  Transform Your Space -
                </p>
                <p
                  ref={secondText}
                  className="text-6xl sm:7xl md:text-9xl font-bold uppercase"
                >
                  Transform Your Space -
                </p>
              </div>
            </div>

            {/* Regular Content */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-2 sm:mt-10 text-base max-w-[18rem] sm:max-w-lg"
            >
              Our expert designers provide personalized guidance to help bring
              your vision to life. We offer tailored design strategies,
              comprehensive planning, and professional advice.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded"
            >
              Contact Experts
            </motion.button>
          </div>
        </div>

        {/* <motion.div style={{ height }} className="circleContainer">
      <div className="circle"></div>
    </motion.div>
    <Footer /> */}

        {/* Consultation Section */}
        <div className="relative w-[93%] mx-auto bg-gray-50 pt-10 pb-6 px-4 rounded-lg border border-gray-300 -mt-16 z-10 sm:-mt-24 lg:-mt-16">
          <div className="bg-gray-50 p-0 md:p-5">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-[64%]">
                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Unlock Your Dream Home: Free Expert Consultation!
                </motion.h1>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  At Decor, we believe that every beautiful home starts with a
                  great conversation. That’s why we offer a complimentary first
                  consultation with our team of experienced interior design
                  experts. During this initial meeting, you’ll have the
                  opportunity to share your vision, preferences, and any
                  specific needs you have for your space.
                </motion.p>
              </div>
              <div className="md:w-1/3">
                <motion.h2
                  className="text-lg sm:text-lg font-semibold mb-4 heading-line"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  GET IN TOUCH
                </motion.h2>
                <form className="space-y-4">
                  <motion.button
                    className="w-full bg-black text-white py-2 px-4 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    SCHEDULE A CALL
                  </motion.button>
                  <motion.input
                    type="email"
                    placeholder="HEY.EXPERT@GMAIL.COM"
                    className="w-full border border-gray-300 p-2 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                  <motion.input
                    type="tel"
                    placeholder="+1 642 890 1519"
                    className="w-full border border-gray-300 p-2 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </form>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="mt-8 md:mt-20 mb-0 px-0 sm:px-0">
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
        </div>
      </div>
      <motion.div style={{ height }} className="circleContainer">
        <div className="circle"></div>
      </motion.div>
    </>
  );
}

export default FollowUs;
