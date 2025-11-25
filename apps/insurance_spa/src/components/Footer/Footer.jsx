import React from "react";
import FooterSection from "./FooterSection";
import { footerData } from "./footerData";
import { useFooter } from "./useFooter";
import "./FooterBase.css"
import "./FooterEffects.css"

export default function Footer() {
  const { handleClick } = useFooter();

  return (
    <footer id="footer" className="footer-section section">
      <div className="footer-container">
        {footerData.map((section) => (
          <FooterSection
            key={section.type}
            title={section.title}
            items={section.items}
            onItemClick={handleClick}
            type={section.type}
            className={section.class}
          />
        ))}
      </div>

      <div className="bottom">
        <p>© {new Date().getFullYear()} Pojištění Pro Všechny. Veškerá práva vyhrazena.</p>
      </div>
    </footer>
  );
}
