import Home from "./pages/home";
import Navbar from "./components/home/navbar";
import NavbarWithBackground from "./pages/navbarWithBackground";
import AboutUs from "./pages/aboutUs";
import Projects from "./pages/projects"
import ContactUs from "./pages/contactUs"
import SingleProjectDetail from "./pages/singleProjectDetail"
import Footer from "./components/footer"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

    const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // key={location.pathname}
        // initial={{ x: "100%", opacity: 0 }}  // Start off-screen to the right
        // animate={{ x: 0, opacity: 1 }}      // Slide in from the right
        // exit={{ x: "-100%", opacity: 0 }}    // Slide out to the left
        // transition={{ ease: "easeInOut", duration: 0.5 }}  // Adjust the transition duration
        // className="route-container"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/project/detail/:id" element={<SingleProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <AnimatedRoutes />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;