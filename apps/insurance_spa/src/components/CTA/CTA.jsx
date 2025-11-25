import React from "react";
import { useNavigation } from "../../hooks/useNavigation";
import "./CTAbase.css";
import "./CTAeffects.css";

export default function CTA() {
  const { goTo } = useNavigation();

  return (
    <section className="section">
      <article className="content cta-content" onClick={() => goTo("/pojisteni/detail")}>
        <h2>Chraňte sebe i svůj majetek ještě dnes</h2>
        <p>Získejte jistotu díky našemu komplexnímu pojištění.</p>
        <button className="button cta-button">
          Sjednat pojištění
        </button>
      </article>
    </section>
  );
}
