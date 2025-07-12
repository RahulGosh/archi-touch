import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SliderButton from "../../utils/sliderButton";

const Details2 = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const rooms = [
    {
      name: "Living room",
      image:
        "https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Bedroom",
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Bathroom",
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmF0aHJvb218ZW58MHx8MHx8fDA%3D",
    },
  ];

  const { x, y } = mousePosition;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Left Section: Living Room Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1723221788171-751662d867bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt="Living Room"
          className="w-full h-full md:h-[calc(70vh+4rem)] object-cover rounded-md"
        />
      </div>

      {/* Right Section: Small Furniture Images and Links */}
      <div className="w-1/2 md:w-1/2 flex flex-col justify-between p-2">
        <div className="flex flex-col sm:flex-row md:flex-row gap-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
            alt="Furniture 1"
            className="w-full md:w-1/2 h-64 md:h-[35vh] object-cover rounded-md"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
            alt="Furniture 2"
            className="w-full md:w-1/2 h-64 md:h-[35vh] object-cover rounded-md"
          />
        </div>

        <div className="mt-4 flex flex-col">
          {rooms.map(({ name }, i) => (
            <p
              onMouseEnter={() => setHoveredProject(rooms[i])}
              onMouseLeave={() => setHoveredProject(null)}
              key={`p${i}`}
              className="text-xl md:text-2xl uppercase cursor-default m-0 mb-2 border-b-2 py-2"
            >
              {name}
            </p>
          ))}
        </div>
      </div>

      {/* Hover Preview Image */}
      {hoveredProject && (
        <motion.div
          className="fixed top-0 left-0 w-40 h-40 rounded-2xl overflow-hidden pointer-events-none z-50"
          style={{ x, y }}
        >
          <img
            src={hoveredProject.image}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </motion.div>
      )}

      {/* Slider Button */}
      <SliderButton
        isVisible={hoveredProject !== null}
        image={hoveredProject ? hoveredProject.image : ""}
      />
    </div>
  );
};

export default Details2;
