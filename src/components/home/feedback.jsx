import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Feedback = React.memo(() => {
  const feedbacks = [
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "SARAH MAIL",
      role: "CUSTOMER",
      image: "https://img.freepik.com/free-photo/business-concept-portrait-confident-young-businesswoman-keeping-arms-crossed-looking-camera-w_1258-104422.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid",
    },
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "JOHN DOE",
      role: "CUSTOMER",
      image: "https://t3.ftcdn.net/jpg/03/21/67/72/360_F_321677228_PybtVjGqx90y34jQzbyeALHhOncLC8DR.jpg",
    },
    {
      quote: "Working with Archi-touch was an absolute pleasure. Archi-touch turned our house into a dream home. Exceptional work!",
      name: "JANE SMITH",
      role: "CUSTOMER",
      image: "https://media.istockphoto.com/id/1950191674/photo/laughing-businesswoman-texting-over-smart-phone-and-looking-away-on-isolated-white-background.webp?b=1&s=170667a&w=0&k=20&c=cV7vg3ovhgCrsCdiyN1bVkXHPk_0eAcstXTZig17pNA=",
    },
  ];

  const [currentFeedback, setCurrentFeedback] = useState(0);
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

  const nextFeedback = () => {
    setCurrentFeedback(prev => (prev + 1) % feedbacks.length);
  };

  useEffect(() => {
    const interval = setInterval(nextFeedback, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <motion.div
        style={{
          position: "fixed",
          top: "-10vh",
          left: "0",
          height: "120vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="parallax feedback"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ y }}
          loading="lazy"
        />
      </motion.div>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      
      <div className="relative z-10 p-4 text-center text-white max-w-xl mx-auto">
        <div className="relative flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={feedbacks[currentFeedback].image}
              alt="Customer"
              className="w-28 h-28 rounded-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-[-20px] left-[-60px]">
              <img
                src="https://www.pngall.com/wp-content/uploads/4/Quotation-Symbol-PNG.png"
                alt="quotes"
                className="w-28 h-auto"
                loading="lazy"
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
      </div>
    </div>
  );
});

export default Feedback;