export const handleCardMouseMove = (cardRef, e) => {
  const card = cardRef.current;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateY = ((x - centerX) / centerX) * 35;
  const rotateX = ((centerY - y) / centerY) * 20;
  const shadowX = -(x - centerX) / 4;
  const shadowY = -(y - centerY) / 4;

  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.45), ${-shadowX/2}px ${-shadowY/2}px 20px rgba(0,0,0,0.2)`;
};

export const handleCardMouseLeave = (cardRef) => {
  const card = cardRef.current;
  if (!card) return;

  card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  card.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
};
