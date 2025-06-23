import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const IMAGES = [
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const HEADER_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HeaderSection = React.memo(({ firstText, secondText }) => (
  <div
    className="relative w-[97%] mx-auto bg-cover bg-center rounded-lg h-[64vh] sm:h-[60vh] md:h-[90vh] lg:h-[100vh]"
    style={{ backgroundImage: `url('${HEADER_IMAGE}')` }}
  >
    <div className="absolute inset-0 bg-black opacity-50" />
    <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
      <div className="sliderContainer absolute bottom-10 w-full overflow-hidden">
        <div className="slider relative whitespace-nowrap">
          <p
            ref={firstText}
            className="text-6xl sm:7xl md:text-9xl font-bold uppercase inline-block"
          >
            Transform Your Space -
          </p>
          <p
            ref={secondText}
            className="text-6xl sm:7xl md:text-9xl font-bold uppercase inline-block ml-4"
          >
            Transform Your Space -
          </p>
        </div>
      </div>

      <div className="max-w-[90%] sm:max-w-lg">
        <p className="mt-2 sm:mt-10 text-base">
          Our expert designers provide personalized guidance to help bring
          your vision to life.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded">
          Contact Experts
        </button>
      </div>
    </div>
  </div>
));

const InstagramImage = React.memo(({ src, index }) => {
  return (
    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
      <div className="relative group cursor-pointer">
        <img
          src={src}
          alt={`Interior design ${index + 1}`}
          className="w-full h-[150px] sm:h-[200px] object-cover rounded"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black rounded opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20 border border-white">
            <FaInstagram size={20} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
});

const ConsultationSection = React.memo(() => (
  <div className="relative w-[93%] mx-auto bg-gray-50 pt-10 pb-6 px-4 rounded-lg border border-gray-300 -mt-16 z-10 sm:-mt-24 lg:-mt-16">
    <div className="bg-gray-50 p-0 md:p-5">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-[64%]">
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold mb-4">
            Unlock Your Dream Home: Free Expert Consultation!
          </h1>
          <p className="text-gray-600">
            At Decor, we believe that every beautiful home starts with a
            great conversation.
          </p>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg sm:text-lg font-semibold mb-4 heading-line">
            GET IN TOUCH
          </h2>
          <form className="space-y-4">
            <button className="w-full bg-black text-white py-2 px-4 rounded">
              SCHEDULE A CALL
            </button>
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
        </div>
      </div>
    </div>
  </div>
));

function FollowUs() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const container = useRef(null);
  const animationRef = useRef(null);
  const xPercent = useRef(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  useEffect(() => {
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

  const instagramImages = useMemo(() => (
    IMAGES.map((src, index) => (
      <InstagramImage key={`instagram-img-${index}`} src={src} index={index} />
    ))
  ), []);

  return (
    <div ref={container} className="relative mb-[3rem]">
      <HeaderSection firstText={firstText} secondText={secondText} />
      <ConsultationSection />

      <div className="mt-8 md:mt-20 mb-0 px-0 sm:px-0 bg-gray-50 p-0 md:p-5 mx-auto w-[93%] rounded-lg">
        <h2 className="text-lg sm:text-lg font-semibold mb-4 heading-line">
          Follow us on Instagram
        </h2>
        <div className="flex flex-wrap -mx-2">
          {instagramImages}
        </div>
      </div>

      <motion.div style={{ height }} className="circleContainer">
        <div className="circle" />
      </motion.div>
    </div>
  );
}

export default React.memo(FollowUs);