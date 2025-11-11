import React, { useEffect, useRef } from "react";

export default function VyhodaCard({ item, onClick }) {

  return (
    <div className="card vyhody-card" onClick={onClick}>
      <div className="icons vyhody-icons">
        <span>{item.icon}</span>
      </div>
      <h3 className="title vyhody-title">{item.title}</h3>
      <p className="description vyhody-description">{item.description}</p>
    </div>
  );
}
