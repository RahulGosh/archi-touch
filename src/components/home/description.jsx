import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Description = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const isTextInView = useInView(textRef, { once: true, amount: 0.1 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.1 });

  const textControls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    if (isTextInView) {
      textControls.start("show");
    }
  }, [textControls, isTextInView]);

  useEffect(() => {
    if (isImageInView) {
      imageControls.start("visible");
    }
  }, [imageControls, isImageInView]);

  const wordAnimation = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const characterAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const text = "Start your healthy life today with us";

  return (
    <div className="flex justify-center items-center p-[15px] lg:p-[30px] h-auto lg:h-[500px]">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-[35%] mb-8 lg:mb-0">
            <div className="text-yellow-500 font-semibold mb-4 text-center lg:text-left">WHAT WE DO</div>
            <motion.h1
              className="text-2xl lg:text-4xl font-bold mb-4 flex flex-wrap justify-center lg:justify-start"
              ref={textRef}
              variants={wordAnimation}
              initial="hidden"
              animate={textControls}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={characterAnimation}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <p className="text-gray-600 mb-8">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even.
            </p>
            <ul>
              <li className="flex items-center pb-2">
                <span className="text-lg font-semibold">01.</span>
                <span className="ml-2 text-lg">Branches Across The World 25+</span>
              </li>
              <hr className="border-t border-[rgba(64, 50, 38)] m-[8px]" />
              <li className="flex items-center pt-2">
                <span className="text-lg font-semibold">02.</span>
                <span className="ml-2 text-lg">2.9K+ Parcel Delivered By Team</span>
              </li>
            </ul>
            <div className="flex justify-center sm:justify-start">
              <button className="mt-10 flex items-center text-center px-4 py-2 bg-transparent text-yellow-500 border border-yellow-500 rounded-full transition duration-300 relative group mr-7">
                <span>More About</span>
                <div className="ml-4 flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-center ml-0 md:ml-28">
            <motion.div
              className="relative"
              ref={imageRef}
              initial="hidden"
              animate={imageControls}
              variants={imageVariants}
            >
              <img
                src="https://images.unsplash.com/photo-1722343879466-7dcda68a48cc?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Decorative"
                className="rounded-lg shadow-lg object-cover w-full mb-0 mr-0 max-w-2xl lg:max-w-[45rem] md:max-w-xl lg:mb-0 lg:mr-0"
              />
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team"
                className="absolute rounded-lg shadow-lg w-[50%] h-[75%] lg:bottom-[-10%] lg:left-[-20%] lg:translate-x-[-50%] bottom-0 left-[-20%] translate-x-[-50%] hidden md:block"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;