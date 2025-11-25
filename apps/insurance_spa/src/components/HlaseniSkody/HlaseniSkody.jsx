import React from "react";
import { useNavigation } from "../../hooks/useNavigation";
import "./HlaseniSkody.css";

export default function HlaseniSkody() {
  const { goTo } = useNavigation();

  return (
    <section className="section">
      <div className="content hlaseniskody-content">
        <h2 onClick={() => goTo("/hlaseni-skody")}>Hlášení škody</h2>
        <p>
          Došlo k pojistné události? Nahlaste škodu jednoduše online. Vyplňte
          základní informace a my se o vše postaráme. Jsme tu pro Vás 24 hodin denně.
        </p>
        <button className="button hlaseniskody-button" onClick={() => goTo("/hlaseni-skody")}>
          Nahlásit škodu
        </button>
      </div>
    </section>
  );
}
