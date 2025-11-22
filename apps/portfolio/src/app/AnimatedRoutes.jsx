import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initUniversalScrollAnimations } from "../functions/scrollAnimations";
import { ScrollRestoration } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Projects from "../pages/Projects/Projects";

const AnimatedRoutes = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    initUniversalScrollAnimations();
  }, [location.pathname]);

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
};

export default AnimatedRoutes;

