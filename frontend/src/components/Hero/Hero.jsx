import { useHero } from "./useHeroBackground";
import { useNavigation } from "../../hooks/useNavigation";
import { useScrollTo } from "../../functions/useScrollTo";
import "./HeroBase.css";
import "./HeroEffects.css";

const Hero = () => {
  const { currentImage, nextImage, prevImage } = useHero();
  const { goTo } = useNavigation();
  const scrollTo = useScrollTo();

  const images = [
    "/images/insurance1.jpg",
    "/images/insurance2.jpg",
    "/images/insurance3.jpg",
  ];

  const heroButtons = [
    { text: "Zjistit více", action: () => scrollTo("pojisteni"), type: "primary" },
    { text: "Přihlásit se", action: () => goTo("/login"), type: "secondary" },
  ];

  return (
    <section className="hero-section">
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />

      <div className="content hero-content">
        <h1 onClick={() => scrollTo("vyhody")}>Pojištění Pro Všechny</h1>
        <p>
          Moderní online platforma pro správu, srovnání a sjednání všech druhů
          pojištění. Rychle, přehledně a bezpečně.
        </p>

        <div className="hero-buttons">
          {heroButtons.map((btn, idx) => (
            <button
              key={idx}
              className={`button btn-${btn.type}`}
              onClick={btn.action}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>

      <button className="arrow left" onClick={prevImage}>
        ‹
      </button>
      <button className="arrow right" onClick={nextImage}>
        ›
      </button>
    </section>
  );
};

export default Hero;
