import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const images = [
  {
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fusing Creativity with",
    subtitle: "DESIGN",
    description: "believe that well-designed space can have a profound impact on quality life.",
  },
  {
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Creating Timeless",
    subtitle: "ART",
    description: "artistry that stands the test of time and trends.",
  },
  {
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Innovating Through",
    subtitle: "TECHNOLOGY",
    description: "leveraging the latest technology for innovative designs.",
  },
];

const Hero = memo(() => {
  const container = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);

  const changeImage = useCallback((direction = 1) => {
    setShowText(false);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + images.length) % images.length;
      return newIndex;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => changeImage(1), 8000);
    return () => clearInterval(interval);
  }, [changeImage]);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={container}>
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <img
          src={images[currentImageIndex].image}
          alt={`${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </motion.div>
      
      {showText && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center p-4 md:p-8">
          <div className="text-white text-2xl md:text-4xl font-bold mb-1">
            {images[currentImageIndex].title}
          </div>
          <div className="text-white text-4xl md:text-6xl font-bold">
            {images[currentImageIndex].subtitle}
          </div>
          <hr className="my-4 md:my-8 w-48 md:w-96 border-t-2 border-white" />
          <div className="text-white text-base md:text-lg max-w-md">
            {images[currentImageIndex].description}
          </div>
        </div>
      )}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-1 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

export default Hero;