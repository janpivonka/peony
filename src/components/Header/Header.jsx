import React, { useState, useEffect } from "react";
import { useHeader } from "./useHeader";
import HeaderSection from "./HeaderSection";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/images/logo.png"

import "./HeaderBase.css";
import "./HeaderEffects.css";
import "./MobileMenu.css";

export default function Header() {
  const { menuData, handleClick } = useHeader();

  // Detekce mobilu - čistě reaktivně (bez window při SSR)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 700 : false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Zavře menu a předá kliknutí navenek
  const handleItemClick = (item) => {
    handleClick(item);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <header className="header-section">
      <div className="brand" onClick={() => handleClick({ path: "/" })}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">Jan Pivoňka</span>
            <span className="brand-sub">Web Development</span>
          </div>
        </div>

      {/* Hamburger (only mobile) */}
      {isMobile && (
        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setMobileOpen((s) => !s)}
        >
          <span className={`bar ${mobileOpen ? "open" : ""}`} />
          <span className={`bar ${mobileOpen ? "open" : ""}`} />
          <span className={`bar ${mobileOpen ? "open" : ""}`} />
        </button>
      )}

      {/* Desktop menu */}
      {!isMobile && (
        <nav className="nav desktop-menu" aria-label="Hlavní navigace">
          <ul className="main-menu">
            {menuData.map((item, i) => (
              <HeaderSection
                key={`${i}-${item.text}`}
                item={item}
                onItemClick={handleItemClick}
                isMobile={false}
                level={1}
              />
            ))}
          </ul>
        </nav>
      )}

      {/* Mobile menu (component) */}
      {isMobile && (
        <MobileMenu
          menuData={menuData}
          isOpen={mobileOpen}
          onItemClick={handleItemClick}
          isMobile={true}
        />
      )}
    </header>
  );
}
