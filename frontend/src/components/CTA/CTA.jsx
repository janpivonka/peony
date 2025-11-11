import React from "react";
import { useNavigate } from "react-router-dom";
import "./CTAbase.css";
import "./CTAeffects.css";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <article className="content cta-content" onClick={() => navigate("/pojisteni/detail")}>
        <h2>Chraňte sebe i svůj majetek ještě dnes</h2>
        <p>Získejte jistotu díky našemu komplexnímu pojištění.</p>
        <button className="button cta-button">
          Sjednat pojištění
        </button>
      </article>
    </section>
  );
}
