import React from "react";
import { useNavigate } from "react-router-dom";
import { pojisteniData } from "./pojisteniData";
import PojisteniCard from "./PojisteniCard";
import "./PojisteniBase.css";
import "./PojisteniEffects.css";

export default function Pojisteni() {
  const navigate = useNavigate();
  const handleCardClick = (slug) => navigate(`/pojisteni/detail/${slug}`);
  const handleLearnMore = () => navigate("/pojisteni/detail");

  return (
    <section id="pojisteni" className="section">
      <div className="content pojisteni-content">
        <h2 onClick={handleLearnMore}>Druhy pojištění</h2>
      </div>

      <div className="container pojisteni-container">
        {pojisteniData.slice(0, 5).map((item) => (
          <PojisteniCard
            key={item.id}
            {...item}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <div className="learn-more pojisteni-learn-more">
        <a onClick={handleLearnMore}>Zjistit více →</a>
      </div>
    </section>
  );
}

