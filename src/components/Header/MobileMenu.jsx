import React, { useEffect } from "react";
import HeaderSection from "./HeaderSection";

export default function MobileMenu({ menuData, onItemClick, isOpen, isMobile }) {
  // isMobile je true vždy pokud volá Header

  // Refresher pro submenu: když se zavře celé menu, smažeme všechny open třídy v submenu
  useEffect(() => {
    if (!isOpen) {
      const openSubmenus = document.querySelectorAll('.mobile-menu li.mobile.has-submenu.open');
      openSubmenus.forEach(li => li.classList.remove('open'));
    }
  }, [isOpen]);

  return (
    <nav
      className={`mobile-menu ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
      aria-label="Mobilní navigace"
    >
      <ul>
        {menuData.map((item, i) => (
          <HeaderSection
            key={`${i}-${item.text}`}
            item={item}
            onItemClick={onItemClick}
            isMobile={true}
            level={1}
          />
        ))}
      </ul>
    </nav>
  );
}



