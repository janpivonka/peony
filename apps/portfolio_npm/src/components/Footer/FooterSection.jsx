import React from "react";
import { useFooterSection } from "./useFooterSection";

export default function FooterSection({ title, items, onItemClick, type, className }) {
  const { renderItems } = useFooterSection(onItemClick);

  return (
    <div className={className}>
      {title && <h3 className="footer-title">{title}</h3>}
      {renderItems(items, type === "social")}
    </div>
  );
}
