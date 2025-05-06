import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from "./magnetic"

const RoundedButton = ({ children, backgroundColor = "#455CE9", ...attributes }) => {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 7 }, "exit");
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div 
        className="relative flex items-center justify-center rounded-full border border-gray-500 cursor-pointer overflow-hidden py-4 px-16"
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        <div className="relative z-10 transition-colors duration-400">{children}</div>
        <div ref={circle} style={{ backgroundColor }} className="absolute w-full h-[150%] rounded-full top-[100%]"></div>
      </div>
    </Magnetic>
  );
}


export default RoundedButton;