import React, { useState, useEffect, useRef } from "react";

export default function HeaderSection({
  item,
  onItemClick,
  level = 1,
  isMobile = false,
}) {
  const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const liRef = useRef(null);

  // Pokud se přepne z mobile->desktop nebo naopak, zavřeme submenu
  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  // Klávesnice (Enter / Space) pro přístupnost
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = () => {
    if (hasSubmenu) {
      // Na mobilu toggle, na desktopu hover
      if (isMobile) {
        setIsOpen((s) => !s);
      }
      return;
    }

    // Efekt kliknutí pro položky bez submenu
    if (item.path || item.scrollTo) {
      const link = liRef.current.querySelector(".menu-link");
      link.classList.add("clicked");
      setTimeout(() => link.classList.remove("clicked"), 200); // efekt trvá 0.2s

      onItemClick(item);
    }
  };

  return (
    <li
      ref={liRef}
      className={`${hasSubmenu ? "has-submenu" : ""} ${isOpen ? "open" : ""} ${
        isMobile ? "mobile" : "desktop"
      } level-${level}`}
    >
      <span
        className="menu-link"
        role={hasSubmenu ? "button" : "link"}
        tabIndex={0}
        aria-haspopup={hasSubmenu ? "true" : undefined}
        aria-expanded={hasSubmenu ? isOpen : undefined}
        onKeyDown={handleKey}
        onClick={handleClick}
      >
        <span className="menu-text">{item.text}</span>
      </span>

      {hasSubmenu && (
        <ul className={`submenu ${isOpen ? "open" : ""}`}>
          {item.submenu.map((subItem, i) => (
            <HeaderSection
              key={`${level}-${i}-${subItem.text}`}
              item={subItem}
              onItemClick={onItemClick}
              isMobile={isMobile}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

