import React, { useState, useEffect } from "react";
import { useHeader } from "./useHeader";
import HeaderSection from "./HeaderSection";
import logo from "../../assets/images/logo.png"
import "./HeaderBase.css";
import "./HeaderEffects.css";

export default function Header() {
  const { headerData, handleClick } = useHeader();

  return (
    <header className="header-section">
      <div className="brand" onClick={() => handleClick({ path: "/" })}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">Jan Pivoňka</span>
            <span className="brand-sub">Web Development</span>
          </div>
        </div>

        <nav className="nav">
          <ul className="main-menu">
            {headerData.map((item, i) => (
              <HeaderSection key={i} item={item} onItemClick={handleClick} />
            ))}
          </ul>
        </nav>
    </header>
  );
}

