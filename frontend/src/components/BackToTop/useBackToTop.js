import { useState, useEffect } from "react";

export const useBackToTop = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { visible, scrollToTop };
};
