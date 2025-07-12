"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const ImageParallax1 = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <h1
        style={{
          position: "absolute",
          zIndex: 1,
          color: "white",
          fontSize: "3.5vw",
          textAlign: "center",
          padding: "0 10px",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
        dolorem dolore fuga obcaecati perferendis aspernatur.
      </h1>
      <div
        style={{
          position: "fixed",
          top: "-10vh",
          left: "0",
          height: "120vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <motion.div
          style={{ y, position: "relative", width: "100%", height: "100%" }}
        >
          <img
            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="parallax"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageParallax1;
