import React from "react";
import Marquee from "react-fast-marquee";
import "./automaticTextSlider.css";

const AutomaticTextSlider = () => {
  return (
    <div className="bg-white my-16">
      <Marquee
        speed={50}
        gradient={false}
        className="text-6xl sm:text-3xl md:text-8xl font-bold uppercase overflow-hidden"
      >
        <span className="hover-text" >
          Master Bedroom
        </span>
        <h2 className="mx-4 plus-signs">+</h2>
        <span className="hover-text" >
          Living Room
        </span>
        <h2 className="mx-4 plus-signs">+</h2>
        <span className="hover-text" >
          Kitchen
        </span>
        <h2 className="mx-4 plus-signs">+</h2>
      </Marquee>
    </div>
  );
};

export default AutomaticTextSlider;