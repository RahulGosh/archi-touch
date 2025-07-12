import React, { useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Footer from "../footer";

const ThreeImages = () => {
  //   const controls = useAnimation();
  //   const { ref, inView } = useInView({
  //     triggerOnce: true,
  //     threshold: 0.2,
  //   });

  //   if (inView) {
  //     controls.start({
  //       width: '100%',
  //       transition: { duration: 1 },
  //     });
  //   }

  const container = useRef(null);
  let xPercent = 0;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [80, 0]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-[10rem]">
        {[
          {
            title: "OUR TEAM",
            subtitle: "EXPLORE OUR EXPERTS",
            image:
              "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "PROJECTS",
            subtitle: "BE INSPIRED BY INTERIORS",
            image:
              "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "SUPPORT",
            subtitle: "JUST CHOOSE COMFORT",
            image:
              "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ].map((section, index) => (
          <motion.div className="relative w-full h-96 md:h-auto overflow-hidden">
            <img
              src={section.image}
              alt={section.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white">
              <h2 className="text-2xl md:text-4xl font-bold">
                {section.title}
              </h2>
              <p className="mt-2 text-sm md:text-lg">{section.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ height, position: "relative" }}
        className="circleContainer"
      >
        <div
          className="circle"
          style={{
            position: "absolute",
            height: "1550%",
            width: "100%",
            borderRadius: "0 0 50% 50%",
            backgroundColor: "white",
            zIndex: 1,
            boxShadow: " 0 60px 50px rgba(0, 0, 0, 0.748)",
          }}
        ></div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ThreeImages;
