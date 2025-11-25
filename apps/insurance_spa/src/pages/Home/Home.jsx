import React from "react"
import Hero from "../../components/Hero/Hero.jsx";
import Aktuality from "../../components/Aktuality/Aktuality"
import Vyhody from "../../components/Vyhody/Vyhody"
import Pojisteni from "../../components/Pojisteni/Pojisteni"
import HlaseniSkody from "../../components/HlaseniSkody/HlaseniSkody"
import Cta from "../../components/CTA/CTA"
import BackToTop from "../../components/BackToTop/BackToTop.jsx";

export default function Home() {
  return (
    <div>
      <Hero />
      <Aktuality />
      <Vyhody />
      <Pojisteni />
      <HlaseniSkody />
      <Cta />
    </div>
  )
}
