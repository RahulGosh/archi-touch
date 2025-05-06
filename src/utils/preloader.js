import React from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  const loaderVariants = {
    animationOne: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 border-4 border-t-transparent border-black rounded-full"
        variants={loaderVariants}
        animate="animationOne"
      />
    </motion.div>
  );
};

export default Preloader;
