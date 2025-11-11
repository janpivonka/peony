import { useState, useEffect } from "react";

export const useHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const imagesLength = 3;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imagesLength);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);
    return () => clearInterval(interval);
  }, []);

  return { currentImage, nextImage, prevImage };
};

