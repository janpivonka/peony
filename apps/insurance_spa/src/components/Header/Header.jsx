import React from "react";
import { useHeader } from "./useHeader";
import HeaderSection from "./HeaderSection";
import SearchBar from "../SearchBar/SearchBar";
import "./HeaderBase.css"
import "./HeaderEffects.css"


export default function Header() {
  const { menuData, iconsData, handleClick, handleIconClick, searchBar } = useHeader();

  return (
    <header className="header-section">
        <div className="logo" onClick={() => handleClick({ path: "/" })}>
          PPV – Pojištění Pro Všechny
        </div>

        <nav className="nav">
          <ul className="main-menu">
            {menuData.map((item, i) => (
              <HeaderSection key={i} item={item} onItemClick={handleClick} />
            ))}
          </ul>
        </nav>

        <div className="icons header-icons">
          {iconsData.map((icon) => (
            <span key={icon.id} onClick={() => handleIconClick(icon)}>
              {icon.icon}
            </span>
          ))}

          <SearchBar {...searchBar} />
        </div>
    </header>
  );
}

