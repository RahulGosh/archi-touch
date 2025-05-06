import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import useCountUp from "../utils/useCountUp";
import Magnetic from "../utils/magnetic";
import ContactForm from "../components/contactUs/contactForm";
import StickyFooter from "../components/stickyFooter";
import MagneticForInstagram from "../utils/magneticForInstagram";
import { FaInstagram } from "react-icons/fa";

const images = [
  "https://images.pexels.com/photos/5900806/pexels-photo-5900806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            ? "bg-black text-white border-black"
            : "bg-black text-white border-black"
        } ${widths} ${heights}`}
      >
        {/* First Text Animation */}
        <button
          className="absolute flex items-center justify-center text-[1rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(-140%)" : "translateY(0)",
          }}
        >
          {text}
        </button>
        {/* Second Text Animation */}
        <button
          className="absolute flex items-center justify-center text-base sm:text-base md:text-lg lg:text-lg transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(140%)",
          }}
        >
          {text}
        </button>
      </div>
    </motion.div>
  );
};

const ContactUs = () => {
  const container = useRef(null)
  const imageRefs = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stats500Ref = useRef(null);
  const stats98Ref = useRef(null);
  const stats85KRef = useRef(null);
  const stats115Ref = useRef(null);

  const controls = useAnimation();
  const stats500Controls = useAnimation();
  const stats98Controls = useAnimation();
  const stats85KControls = useAnimation();
  const stats115Controls = useAnimation();

  const isSectionInView = useInView(sectionRef, { once: true });
  const is500InView = useInView(stats500Ref, { once: true });
  const is98InView = useInView(stats98Ref, { once: true });
  const is85KInView = useInView(stats85KRef, { once: true });
  const is115InView = useInView(stats115Ref, { once: true });

  const count500 = useCountUp(is500InView ? 500 : 0, 2000);
  const count98 = useCountUp(is98InView ? 98 : 0, 2000);
  const count85K = useCountUp(is85KInView ? 85000 : 0, 2000); // Slow counting for 85K
  const count115 = useCountUp(is115InView ? 115 : 0, 2000);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [10, 0]);

  const handleRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  useEffect(() => {
    if (is500InView) {
      stats500Controls.start("visible");
    }
  }, [is500InView, stats500Controls]);

  useEffect(() => {
    if (is98InView) {
      stats98Controls.start("visible");
    }
  }, [is98InView, stats98Controls]);

  useEffect(() => {
    if (is85KInView) {
      stats85KControls.start("visible");
    }
  }, [is85KInView, stats85KControls]);

  useEffect(() => {
    if (is115InView) {
      stats115Controls.start("visible");
    }
  }, [is115InView, stats115Controls]);

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
      { threshold: 1, rootMargin: `-${title.offsetHeight}px 0px 0px 0px` }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.3 },
    }),
  };

  return (
    <>
    <div className="flex flex-col items-center py-8 px-4 lg:px-8">
      {/* Header Section */}
      <div className="relative w-full max-w-[76rem] mb-16">
        <img
          src="https://cdn.prod.website-files.com/66680ca683883f060b423408/6675aa6a58898eb868eb6294_Banner-11.webp" // Replace with your image path
          alt="Interior"
          className="w-full h-64 md:h-80 lg:h-[28rem] object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-in-out rounded"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold">
            GET IN TOUCH
          </h1>
        </div>
      </div>

      <div
        className="container max-w-7xl mx-auto custom-md:max-w-5xl custom-md:mx-auto px-0 pt-16 pb-0 mb-0"
        ref={sectionRef}
      >
        <div className="flex flex-col custom-md:flex-row justify-between w-full">
          {/* Left Side - "Why Choose Us?" Heading */}
          <motion.div
            className="w-full custom-md:w-1/2 flex flex-col justify-start px-4"
            initial="hidden"
            ref={titleRef}
            animate={controls}
            variants={textVariants}
          >
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 mb-4">
              DISCOVER THE POSSIBILITIES
            </h2>
            <h3 className="text-6xl font-bold text-gray-800 mb-4">
              Let’s Create!
            </h3>
          </motion.div>

          {/* Right Side - Long Description and Statistics */}
          <div className="w-full custom-md:w-1/2 mt-8 custom-md:mt-0 flex flex-col space-y-8 px-4">
            <motion.p
              className="text-gray-600 text-base custom-md:text-base leading-relaxed"
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              At Decor, we take pride in transforming spaces into stunning,
              functional works of art. Over the years, we've completed over 500
              projects, consistently exceeding our clients' expectations.
            </motion.p>
            <motion.p
              className="text-gray-600 text-base custom-md:text-base leading-relaxed"
              initial="hidden"
              animate={controls}
              variants={textVariants}
            >
              Our success is built on the satisfaction of our clients, who trust
              us to bring their visions to life with creativity and precision.
            </motion.p>

            <div className="flex flex-wrap justify-start md:justify-center gap-x-[1rem] gap-y-3 mt-8 sm:items-start sm:gap-y-3">
              <BoxItem
                text="MINIMALISM"
                widths="w-32 sm:w-36 md:w-36 lg:w-36"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
              <BoxItem
                text="ART DECO"
                widths="w-28 sm:w-30 md:w-30 lg:w-30"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
              <BoxItem
                text="BRUTALISM"
                widths="w-28 sm:w-32 md:w-32 lg:w-32"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
              <BoxItem
                text="MODERN"
                widths="w-28 sm:w-28 md:w-28 lg:w-28"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
              <BoxItem
                text="INDUSTRIAL"
                widths="w-32 sm:w-32 md:w-36 lg:w-36"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
              <BoxItem
                text="RUSTIC"
                widths="w-28 sm:w-28 md:w-28 lg:w-28"
                heights="h-12 sm:h-12 md:h-12 lg:h-12"
              />
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
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

export default ContactUs;
