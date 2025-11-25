import React from "react";
import { useBackToTop } from "./useBackToTop";
import "./BackToTopBase.css";
import "./BackToTopEffects.css";

export default function BackToTop() {
  const { visible, scrollToTop } = useBackToTop();

  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}



