import React from "react";
import Aktualita from "./Aktualita";
import { aktualityData } from "./aktualityData";
import { useNavigation } from "../../hooks/useNavigation";
import "./AktualityBase.css";
import "./AktualityEffects.css";

export default function Aktuality() {
  const { goTo } = useNavigation();

  return (
    <section className="section aktuality-section">
      <div className="content">
        <h2 onClick={() => goTo("/aktuality/detail")}>
          Aktuality
        </h2>
      </div>

      <div className="aktuality-container">
        {aktualityData.slice(0, 7).map((item) => (
          <Aktualita key={item.id} {...item} />
        ))}

        {aktualityData.length > 7 && (
          <div className="learn-more">
            <a onClick={() => goTo("/aktuality/detail")}>
              Číst dále...
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
