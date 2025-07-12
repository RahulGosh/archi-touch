import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./aboutUsOurTeamSection.css";

const TeamMemberCard = ({ image, name, title }) => {
  const [hovered, setHovered] = useState(false);

  // Animations for the card
  const cardRef = useRef(null);
  const cardControls = useAnimation();
  const isCardInView = useInView(cardRef, { once: true, amount: 0.1 });

  // Animations for the image
  const imageRef = useRef(null);
  const imageControls = useAnimation();
  const isImageInView = useInView(imageRef, { once: true, amount: 0.1 });

  // Card animation only when in view
  useEffect(() => {
    if (isCardInView) {
      cardControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [isCardInView, cardControls]);

  // Image animation only when the image is in view
  useEffect(() => {
    if (isImageInView) {
      imageControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
      });
    }
  }, [isImageInView, imageControls]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={cardControls}
      className="relative overflow-hidden group cursor-pointer h-[700px] custom-aboutUsOurTeamSection-md:h-[500px] flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        ref={imageRef}
        initial={{ opacity: 0, y: 30 }}
        animate={imageControls}
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 "
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-[#a5715f] transition-all duration-500 opacity-[0.7] ${
          hovered ? "translate-x-0" : "-translate-x-full"
        }`}
      ></div>

      {/* Text Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-white p-4 transition-all duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-sm">{title}</p>
      </div>
    </motion.div>
  );
};


const TeamSection = () => {
  const sectionRef = useRef(null);
  const sectionControls = useAnimation();
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isSectionInView) {
      sectionControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
    }
  }, [isSectionInView, sectionControls]);

  const teamMembers = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlcnRpY2FsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Alex Martinez",
      title: "Villa Architect",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517630800677-932d836ab680?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "John Doe",
      title: "Interior Designer",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={sectionControls}
      className="pt-10 pb-0 custom-aboutUsOurTeamSection-md:py-10"
    >
      <h2 className="text-3xl font-bold mb-8 text-start heading-line">
        Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 custom-aboutUsOurTeamSection-md:grid-cols-3 lg:grid-cols-3 gap-6 items-center">
        {/* First Team Member */}
        <TeamMemberCard
          image={teamMembers[0].image}
          name={teamMembers[0].name}
          title={teamMembers[0].title}
        />

        {/* Team Expertise Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionControls}
          className="flex items-center justify-center bg-gray-100 p-6 shadow-lg h-auto custom-aboutUsOurTeamSection-md:h-[500px] relative overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://example.com/interior-design.jpg')] opacity-30 bg-cover bg-center"></div>

          {/* Content */}
          <div className="text-center space-y-4 z-10">
            <h3 className="text-2xl custom-aboutUsOurTeamSection-md:text-lg font-bold mb-2 custom-aboutUsOurTeamSection-md:mb-4">
              Meet Our Team
            </h3>
            <p className="mb-2 custom-aboutUsOurTeamSection-md:mb-4 text-lg custom-aboutUsOurTeamSection-md:text-base">
              Our team of talented architects and designers brings a unique blend of creativity, expertise, and dedication to every project.
            </p>
            <p className="mb-2 custom-aboutUsOurTeamSection-md:mb-4 text-lg custom-aboutUsOurTeamSection-md:text-base">
              Whether it’s a modern villa or a cozy apartment, our team is here to bring your ideas to life with a passion for interior design that shows in every detail.
            </p>
            <button className="bg-[#a5715f] text-white py-2 px-4  hover:bg-[#8f5c4c] transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Second Team Member */}
        <TeamMemberCard
          image={teamMembers[1].image}
          name={teamMembers[1].name}
          title={teamMembers[1].title}
        />
      </div>
    </motion.section>
  );
};

export default TeamSection;