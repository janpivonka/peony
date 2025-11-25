import React from "react";
import { vyhodyData } from "./vyhodyData";
import VyhodaCard from "./VyhodaCard";
import { useNavigation } from "../../hooks/useNavigation";
import "./VyhodyBase.css";
import "./VyhodyEffects.css";

export default function Vyhody() {
  const { goTo } = useNavigation();

  return (
    <section id="vyhody" className="section">
      <div className="content vyhody-content">
        <h2 onClick={() => goTo("/vyhody/detail")}>
          Výhody aplikace
        </h2>
      </div>

      <div className="container vyhody-container">
        {vyhodyData.slice(0, 4).map((item) => (
          <VyhodaCard
            key={item.id}
            item={item}
            onClick={() => goTo(`/vyhody/detail/${item.slug}`)}
          />
        ))}
      </div>

      <div className="learn-more vyhody-learn-more">
        <a onClick={() => goTo("/vyhody/detail")}>
          Zjistit více →
        </a>
      </div>
    </section>
  );
}
