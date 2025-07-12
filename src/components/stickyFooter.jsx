import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Magnetic from "../utils/magnetic";
import Content from "./content";

const StickyFooter = () => {
  return (
    <>
    <div 
    className='relative h-[500px] sm:h-[650px]'
    style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
  >
    <div className='fixed bottom-0 h-[500px] sm:h-[650px] w-full'>
      <Content />
    </div>
  </div>
    </>
  );
};

export default StickyFooter;
