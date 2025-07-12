import { useState, useEffect, useRef } from "react";
import Project from "../../utils/project";
import { motion } from "framer-motion";
import gsap from "gsap";

const projects = [
  {
    id: "01",
    title: "Modern Living Room",
    type: "Residential",
    project: "Smith Family",
    year: "2020",
    src: "https://www.lakdi.com/cdn/shop/articles/Low-Cost-Interior-Design-Ideas.jpg?v=1717847382",
    color: "#FF0000",
  },
  {
    id: "02",
    title: "Office Space Renovation",
    type: "Commercial",
    project: "Tech Corp",
    year: "2021",
    src: "https://static.vecteezy.com/system/resources/previews/029/093/870/non_2x/the-best-modern-living-room-furniture-pieces-for-small-spaces-3d-rendering-photo.jpg",
    color: "#00FF00",
  },
  {
    id: "03",
    title: "Luxury Kitchen",
    type: "Residential",
    project: "Johnson Family",
    year: "2022",
    src: "https://5.imimg.com/data5/ANDROID/Default/2021/5/FX/XJ/DA/124990434/fb-img-1618678195713-jpg-250x250.jpg",
    color: "#0000FF",
  },
  {
    id: "04",
    title: "Boutique Hotel Lobby",
    type: "Hospitality",
    project: "Boutique Hotel",
    year: "2023",
    src: "https://5.imimg.com/data5/ANDROID/Default/2021/5/FX/XJ/DA/124990434/fb-img-1618678195713-jpg-250x250.jpg",
    color: "#FFFF00",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const Awards = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const [hovered, setHovered] = useState(false); 
  const modalContainer = useRef(null);

  const cursor = useRef(null);
  const cursorLabel = useRef(null);


    let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);
  useEffect(() => {
    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    // Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    if (!hovered) { // Only move the cursor if not hovered
      xMoveCursor.current(x);
      yMoveCursor.current(y);
      xMoveCursorLabel.current(x);
      yMoveCursorLabel.current(y);
    }
  };


  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <section
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className="py-12 px-6 md:px-16 lg:px-24" // Added cursor-none to hide default cursor
    >
      <div className="flex flex-col lg:flex-row justify-between items-start mb-5 md:mb-24">
        <div className="mb-6 lg:mb-0">
          <h5 className="text-sm uppercase tracking-wider text-gray-600">
            Huge Honor
          </h5>
          <h1 className="text-4xl lg:text-6xl font-bold text-black">
            Our projects
          </h1>
        </div>
        <div className="text-gray-500 max-w-md mb-6 lg:mb-0">
          <p className="text-lg">
            Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur.
          </p>
        </div>
        <a
          href="#portfolio"
          className="text-black font-semibold inline-flex items-center space-x-2 hover:underline text-lg"
        >
          <span>Portfolio</span>
          <span className="ml-2">&rarr;</span>
        </a>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto">
          <thead className="hidden md:table-header-group">
            <tr className="text-left text-base lg:text-lg text-black font-semibold border-b border-black">
              <th className="pb-4 lg:pb-8">Project Name</th>
              <th className="pb-4 lg:pb-8">Category</th>
              <th className="pb-4 lg:pb-8">Client</th>
              <th className="pb-4 lg:pb-8">Year</th>
            </tr>
          </thead>
          <tbody className="text-sm lg:text-xl font-medium text-black">
            {projects.map((project, index) => (
              <Project
                index={index}
                id={project.id}
                title={project.title}
                type={project.type}
                project={project.project}
                year={project.year}
                manageModal={manageModal}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="h-[250px] w-[300px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-[3]"
        >
          <div
            style={{ top: index * -100 + "%" }}
            className="h-full w-full relative transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          >
            {projects.map((project, index) => {
              const { src } = project;
              return (
                <div
                  className="h-full w-full flex items-center justify-center"
                  key={`modal_${index}`}
                >
                  <img
                    src={src}
                    alt="hover project show"
                    className="w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
         <motion.div
              ref={cursor}
              className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed z-[3] flex items-center justify-center text-[14px] font-light pointer-events-none"
              variants={scaleAnimation}
              initial="initial"
              animate={active ? "enter" : "closed"}
            ></motion.div>

            <motion.div
              ref={cursorLabel}
              className="w-[80px] h-[80px] rounded-full fixed z-[3] flex items-center justify-center text-[14px] font-light pointer-events-none"
              variants={scaleAnimation}
              initial="initial"
              animate={active ? "enter" : "closed"}
            >
              View
            </motion.div>

        {!hovered && ( // Only show cursor when not hovering on a row
          <>
           
          </>
        )}
      </>
    </section>
  );
};

export default Awards;
