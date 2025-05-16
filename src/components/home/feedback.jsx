import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Feedback = React.memo(() => {
  // Memoized feedback data
  const feedbacks = useRef([
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "SARAH MAIL",
      role: "CUSTOMER",
      image: "https://img.freepik.com/free-photo/business-concept-portrait-confident-young-businesswoman-keeping-arms-crossed-looking-camera-w_1258-104422.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid",
    },
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "SARAH MAIL",
      role: "CUSTOMER",
      image: "https://t3.ftcdn.net/jpg/03/21/67/72/360_F_321677228_PybtVjGqx90y34jQzbyeALHhOncLC8DR.jpg",
    },
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "SARAH MAIL",
      role: "CUSTOMER",
      image: "https://media.istockphoto.com/id/1950191674/photo/laughing-businesswoman-texting-over-smart-phone-and-looking-away-on-isolated-white-background.webp?b=1&s=170667a&w=0&k=20&c=cV7vg3ovhgCrsCdiyN1bVkXHPk_0eAcstXTZig17pNA=",
    },
  ]).current;

  const [currentFeedback, setCurrentFeedback] = useState(0);
  const intervalRef = useRef(null);
  const container = useRef();

  // Optimized scroll effect
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"], {
    clamp: false // Better performance than default clamping
  });

  // Memoized navigation functions
  const nextFeedback = useCallback(() => {
    setCurrentFeedback(prev => (prev + 1) % feedbacks.length);
  }, [feedbacks.length]);

  const prevFeedback = useCallback(() => {
    setCurrentFeedback(prev => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  }, [feedbacks.length]);

  // Optimized interval management
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextFeedback();
    }, 5000);
  }, [nextFeedback]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else {
        startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startInterval();

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startInterval]);

  // Preload images
  useEffect(() => {
    feedbacks.forEach(feedback => {
      const img = new Image();
      img.src = feedback.image;
    });
  }, [feedbacks]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ 
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        willChange: 'transform' // Optimize for GPU
      }}
    >
      {/* Background with optimized motion */}
      <motion.div
        style={{
          position: "fixed",
          top: "-10vh",
          left: "0",
          height: "120vh",
          width: "100%",
          zIndex: 0,
          willChange: 'transform' // Optimize for GPU
        }}
      >
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="parallax feedback"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            y,
            willChange: 'transform' // Optimize for GPU
          }}
          loading="lazy" // Lazy load background
          decoding="async" // Async decoding
        />
      </motion.div>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      
      <div className="relative z-10 p-4 text-center text-white max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeedback}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                mass: 0.5
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              transition: { duration: 0.3 } 
            }}
            style={{ willChange: 'transform, opacity' }} // Optimize for GPU
          >
            <div className="relative flex items-center justify-center mb-6">
              <div className="relative">
                <img
                  src={feedbacks[currentFeedback].image}
                  alt="Customer"
                  className="w-28 h-28 rounded-full object-cover text-purple-500"
                  loading="lazy" // Lazy load images
                  decoding="async" // Async decoding
                />
                <div className="absolute top-[-20px] left-[-60px]">
                  <img
                    src="https://www.pngall.com/wp-content/uploads/4/Quotation-Symbol-PNG.png"
                    alt="quotes"
                    className="w-28 h-auto"
                    loading="lazy" // Lazy load images
                    decoding="async" // Async decoding
                  />
                </div>
              </div>
            </div>
            <blockquote className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold">
              {feedbacks[currentFeedback].quote}
            </blockquote>
            <div className="flex items-center justify-center mt-8 text-lg font-semibold space-x-2 text-gray-300">
              <span>{feedbacks[currentFeedback].name} , </span>
              <span className="text-gray-300">{feedbacks[currentFeedback].role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default Feedback;