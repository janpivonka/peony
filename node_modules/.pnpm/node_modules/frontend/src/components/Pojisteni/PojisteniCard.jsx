import React from "react";

export default function PojisteniCard({ icon, title, description, slug, onClick }) {
  return (
    <article className="card pojisteni-card" onClick={() => onClick(slug)}>
      {icon && <div className="icons pojisteni-icons"><span>{icon}</span></div>}
      <div><h3 className="title pojisteni-title">{title}</h3></div>
      <div><p className="description pojisteni-description">{description}</p></div>
    </article>
  );
}
