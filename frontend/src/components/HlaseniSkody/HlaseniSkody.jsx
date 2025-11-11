import React from "react";
import { useNavigate } from "react-router-dom";
import "./HlaseniSkody.css";

export default function HlaseniSkody() {
  const navigate = useNavigate();

  const handleClick = () => navigate("/hlaseni-skody");

  const handleButtonClick = (e) => {
    e.stopPropagation();
    navigate("/hlaseni-skody");
  };

  return (
    <section className="section">
      <div className="content hlaseniskody-content" onClick={handleClick}>
        <h2>Hlášení škody</h2>
        <p>
          Došlo k pojistné události? Nahlaste škodu jednoduše online. Vyplňte
          základní informace a my se o vše postaráme. Jsme tu pro Vás 24 hodin denně.
        </p>
        <button className="button hlaseniskody-button" onClick={handleButtonClick}>
          Nahlásit škodu
        </button>
      </div>
    </section>
  );
}
