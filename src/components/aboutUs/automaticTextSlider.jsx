import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";
import "./automaticTextSlider.css";

// Memoize the text items to prevent unnecessary re-renders
const TEXT_ITEMS = [
  { id: 1, text: "Master Bedroom" },
  { id: 2, text: "Living Room" },
  { id: 3, text: "Kitchen" }
];

const TextItem = React.memo(({ text }) => {
  return (
    <span className="hover-text">
      {text}
    </span>
  );
});

const AutomaticTextSlider = () => {
  // Memoize the marquee content to prevent unnecessary re-renders
  const marqueeContent = useMemo(() => {
    return TEXT_ITEMS.flatMap((item, index) => [
      <TextItem key={`text-${item.id}`} text={item.text} />,
      <h2 key={`plus-${item.id}`} className="mx-4 plus-signs">+</h2>
    ]);
  }, []);

  return (
    <div className="bg-white my-16">
      <Marquee
        speed={50}
        gradient={false}
        className="text-6xl sm:text-3xl md:text-8xl font-bold uppercase overflow-hidden"
      >
        {marqueeContent}
      </Marquee>
    </div>
  );
};

export default React.memo(AutomaticTextSlider);