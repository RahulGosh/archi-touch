import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import "./carousel.css";

const images = [
  {
    default:
      "https://cdn.prod.website-files.com/66680ca683883f060b42340f/666b020f220fe752de0a1c74_Banner-22.jpg",
    hover:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "The Art of Simplifying Interior",
    subtitle: "Decor Inspiration",
  },
  {
    default:
      "https://imgs.search.brave.com/8_5GVwhWnqMzEDy51KhkYeRiIedqrtD7aJRAqcuu8-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/MTE3NzAxNS9waG90/by9tb2Rlcm4tbGl2/aW5nLXJvb20taW4t/bmF0dXJhbC1ib3Rh/bmljYWwtc3R5bGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWg1b05DZEVTX1I2/OFpiSWZBOGV6NlBE/WklCekpKUFR1bGdY/R0Y2V0pFSUU9",
    hover:
      "https://imgs.search.brave.com/aPkrRlab45EI3c-s8hyGxECBnxqxbs4AXOHaTBL463s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9p/bnRlcmlvci1kZXNp/Z24td2l0aC1waG90/b2ZyYW1lcy1jb3Vj/aF8yMy0yMTQ5Mzg1/NDM1LmpwZz9zaXpl/PTYyNiZleHQ9anBn",
    title: "The Art of Simplifying Interior And Another Interior Design",
    subtitle: "Decor",
  },
  {
    default:
      "https://imgs.search.brave.com/_rydaByWNpGD9nOTTW3qZDD4m3SKyeJGEe5S1E4RMRA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9p/bnRlcmlvci1zcGFj/ZS1kZWNvcmF0ZWQt/Ym9oby1zdHlsZV8y/My0yMTUwNzcxNTc1/LmpwZz9zaXplPTYy/NiZleHQ9anBn",
    hover:
      "https://imgs.search.brave.com/34I4tGA26CM5U4K_tX3NhHZb6qxXdd9gKR2gdiHk8WM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM3/MjY4MjYzNy9waG90/by92ZXJ0aWNhbC1n/cmVlbi13YWxsLWlu/LWEtbGl2aW5nLXJv/b20taW50ZXJpb3It/M2QtcmVuZGVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz05/eXUySUVKdF9Ra1dS/aXlZUmFtWWRISW9G/c3Jnd1FjdFJaR1NH/WmtkZmFNPQ",
    title: "The Art of Simplifying Interior",
    subtitle: "Decor Inspiration",
  },
];

function MultipleItems() {
  const sliderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.12,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "4.5%",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2.12,
          slidesToScroll: 1,
          centerPadding: "4.5%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Keep centerMode true to maintain normal width
          centerPadding: "10%", // Add padding to ensure it's not taking the full width
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0%", // Take full width on 480px and below
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto p-4 sm:p-6 md:p-4 lg:px-10 lg-pt-10 lg-pb-0 xl:p-12 bg-white">
      <div className="mb-12 sm:mb-24 text-left px-4">
        <p className="text-sm sm:text-base md:text-lg text-gray-500 font-semibold mb-4">
          Transform Your Space: Expert Tips & Ideas
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.8rem] text-gray-800 font-bold leading-tight">
          Transform Your Home with Expert Advice:
          <br className="" />
          Discover Innovative Ideas and Practical Tips
        </h1>
      </div>
      <div className="relative overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 px-1 sm:px-2 md:px-3"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? "h-auto" : "custom-height"
                }`}
                style={{ height: "23rem" }}
              >
                <motion.img
                  src={image.default}
                  srcSet={`${image.default}?w=300 300w, ${image.default}?w=600 600w, ${image.default}?w=1200 1200w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                  initial={{ scale: 1, translateY: 0 }}
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    translateY: hoveredIndex === index ? -10 : 0,
                  }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
                <motion.img
                  src={image.hover}
                  alt={`Slide ${index}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                  initial={{ scale: 0, translateY: "100%" }}
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    translateY: hoveredIndex === index ? "0%" : "100%",
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10 bg-gradient-to-t from-black/50 to-transparent rounded-lg text-white max-w-full">
                  <p className="text-sm sm:text-lg md:text-xl font-semibold mb-[1.5rem] border-b-2 border-white inline-block w-max">
                    {image.subtitle}
                  </p>
                  <div className="relative overflow-hidden z-10 text-lg sm:text-xl md:text-2xl font-semibold mb-2 h-[25px] sm:h-auto">
                    <motion.h3
                      initial={{ y: 0 }}
                      animate={{ y: hoveredIndex === index ? "-100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                      className="font-bold text-lg sm:text-xl md:text-2xl text-white"
                    >
                      {image.title}
                    </motion.h3>
                    <motion.h3
                      initial={{ y: "100%" }}
                      animate={{
                        y: hoveredIndex === index ? "0%" : "100%",
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 font-bold text-lg sm:text-xl md:text-2xl text-white"
                    >
                      {image.title}
                    </motion.h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* Custom Arrow */}
        <div className="flex mt-4 space-x-4">
          <ArrowButton
            direction="left"
            onClick={() => sliderRef.current.slickPrev()}
          />
          <ArrowButton
            direction="right"
            onClick={() => sliderRef.current.slickNext()}
          />
        </div>
      </div>
    </div>
  );
}

export default MultipleItems;

const ArrowButton = ({ direction, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const arrow =
    direction === "left" ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <button
      className="bg-white text-black border border-gray-300 p-2 sm:p-3 md:p-4 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center relative overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="block"
        initial={{ x: 0, scale: 1 }}
        animate={{
          x: isHovered ? (direction === "right" ? 49 : -49) : 0,
          scale: isHovered ? 0.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {arrow}
      </motion.span>
      <motion.span
        className="absolute"
        initial={{ x: direction === "right" ? -49 : 49, scale: 0.1 }}
        animate={{
          x: isHovered ? 0 : direction === "right" ? -49 : 49,
          scale: isHovered ? 1 : 0.1,
        }}
        transition={{ duration: 0.4 }}
      >
        {arrow}
      </motion.span>
    </button>
  );
};
