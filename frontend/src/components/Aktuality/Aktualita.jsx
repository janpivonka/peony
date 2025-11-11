import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleCardMouseMove, handleCardMouseLeave } from "./aktualitaEffects";

export default function Aktualita({ slug, image, title, description }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  return (
    <section
      ref={cardRef}
      className="card aktualita-card"
      onClick={() => navigate(`/aktuality/detail/${slug}`)}
      onMouseMove={(e) => handleCardMouseMove(cardRef, e)}
      onMouseLeave={() => handleCardMouseLeave(cardRef)}
    >
      <img src={image} alt={title} className="aktualita-image" />
      <h3 className="title aktualita-title">
        <span className="hover-target">{title}</span>
      </h3>
      <p className="description aktualita-description">{description}</p>
    </section>
  );
}
