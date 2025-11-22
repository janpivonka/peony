import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<AnimatedRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

