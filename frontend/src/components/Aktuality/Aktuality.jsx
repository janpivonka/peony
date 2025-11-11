import React from "react";
import { useNavigate } from "react-router-dom";
import Aktualita from "./Aktualita";
import { aktualityData } from "./aktualityData";
import "./AktualityBase.css";
import "./AktualityEffects.css";

export default function Aktuality() {
  const navigate = useNavigate();

  return (
    <section className="section aktuality-section">
        <div className="content">
            <h2 onClick={() => navigate("/aktuality/detail")}>Aktuality</h2>
        </div>
      <div className="aktuality-container">
        {aktualityData.slice(0, 7).map((item) => (
          <Aktualita key={item.id} {...item} />
        ))}

        {aktualityData.length > 7 && (
          <div className="learn-more">
            <a onClick={() => navigate("/aktuality/detail")}>Číst dále...</a>
          </div>
        )}
      </div>
    </section>
  );
}
