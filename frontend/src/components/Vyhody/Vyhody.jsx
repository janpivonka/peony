import React from "react";
import { useNavigate } from "react-router-dom";
import { vyhodyData } from "./vyhodyData";
import VyhodaCard from "./VyhodaCard";
import "./VyhodyBase.css"
import "./VyhodyEffects.css"

export default function Vyhody() {
  const navigate = useNavigate();

  return (
    <section id="vyhody" className="section">
      <div className="content vyhody-content">
        <h2 onClick={() => navigate("/vyhody/detail")}>Výhody aplikace</h2>
      </div>
      <div className="container vyhody-container">
        {vyhodyData.slice(0, 4).map((item) => (
          <VyhodaCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/vyhody/detail/${item.slug}`)}
          />
        ))}
      </div>
      <div className="learn-more vyhody-learn-more">
        <a onClick={() => navigate("/vyhody/detail")}>Zjistit více →</a>
      </div>
    </section>
  );
}

