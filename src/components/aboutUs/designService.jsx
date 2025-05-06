import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

const DesignServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Ref for the section to trigger the animation
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Stagger the entrance of each child by 0.2 seconds
        delayChildren: 0.3,   // Delay the start of the animation by 0.3 seconds
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div ref={ref} className="py-0 sm:py-8 bg-white">
      <div className="max-w-[75rem] mx-auto px-0 sm:px-0">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between text-start lg:text-left mb-12 sm:mb-20">
          <div className="mb-4 lg:mb-0 max-w-2xl ml-4">
            <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-4">
              Comprehensive Interior Design Services
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug sm:leading-tight">
            Expert Design Consultation And Custom Furnishing For Every Room
            </p>
          </div>
          {/* 'All Services' Button */}
          <div className="mt-4 lg:mt-0">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="mr-2">ALL SERVICES</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v7.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Services Section */}
        <motion.div
          className="grid grid-cols-1 gap-12 sm:gap-20 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`hover:text-white relative overflow-hidden group flex flex-col items-left lg:items-start text-left lg:text-left px-4 py-4 cursor-pointer ${
                index === 2 ? "sm:col-span-2 lg:col-span-1 w-full" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              variants={itemVariants}
            >
              {/* Adjusted Animated Background */}
              <div className="absolute inset-0 bg-black transition-transform duration-500 ease-in-out transform -translate-x-[105%] group-hover:translate-x-0"></div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center w-full mb-4">
                <div className="text-base font-bold transition duration-300 ease-in-out">
                  {service.number}
                </div>
                <div className="mx-2 flex-grow border-t border-gray-300"></div>
                <div className="flex-shrink-0">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="h-10 w-10 transition duration-300 ease-in-out group-hover:filter group-hover:invert"
                  />
                </div>
              </div>
              <div className="relative overflow-hidden z-10 text-xl font-semibold mb-2 h-[2em]">
                <motion.h3
                  initial={{ y: 0 }}
                  animate={{ y: hoveredIndex === index ? "-100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-2xl text-black"
                >
                  {service.title}
                </motion.h3>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: hoveredIndex === index ? "0%" : "100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 font-bold text-2xl text-white"
                >
                  {service.title}
                </motion.h3>
              </div>
              <p className="relative z-10 text-sm text-gray-500">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const services = [
  {
    number: "01.",
    title: "Sketching",
    description:
      "Our planning service is the foundation of a successful interior design project. We start by understanding your vision, preferences, and requirements.",
    icon: "https://cdn.prod.website-files.com/66680ca683883f060b423408/666a9c2e1f7d288b926db177_2.png",
  },
  {
    number: "02.",
    title: "Planning",
    description:
      "Our planning service is the foundation of a successful interior design project. We start by understanding your vision, preferences, and requirements.",
    icon: "https://cdn.prod.website-files.com/66680ca683883f060b423408/666a9c31197e9120a7590608_3.png",
  },
  {
    number: "03.",
    title: "Creating",
    description:
      "Our planning service is the foundation of a successful interior design project. We start by understanding your vision, preferences, and requirements.",
    icon: "https://cdn.prod.website-files.com/66680ca683883f060b423408/666afa1eabe8d5bc91dbd0e6_sofa_13715300.svg",
  },
];

export default DesignServices;
