import React, { useRef } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { handleCardMouseMove, handleCardMouseLeave } from "./aktualitaEffects";

export default function Aktualita({ slug, image, title, description }) {
  const { goTo } = useNavigation();
  const cardRef = useRef(null);

  const handleClick = () => {
    goTo(`/aktuality/detail/${slug}`);
  };

  return (
    <section
      ref={cardRef}
      className="card aktualita-card"
      onClick={handleClick}
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
