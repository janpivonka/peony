import "./global.css"
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Assistant from "../components/Assistant/Assistant";
import BackToTop from "../components/BackToTop/BackToTop";
import "./index.css"

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const firstSection = document.querySelector("section");
    if (firstSection) {
      firstSection.classList.add("first-section");

      setTimeout(() => {
        firstSection.classList.add("loaded");
      }, 50);
    }

  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Assistant />
      <BackToTop />
    </>
  );
};

export default Layout;

