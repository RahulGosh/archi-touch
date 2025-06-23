import Home from "./pages/home";
import Navbar from "./components/home/navbar";
import AboutUs from "./pages/aboutUs";
import Projects from "./pages/projects"
import ContactUs from "./pages/contactUs"
import SingleProjectDetail from "./pages/singleProjectDetail"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/project/detail/:id" element={<SingleProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;