import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initUniversalScrollAnimations } from "../functions/scrollAnimations";
import { ScrollRestoration } from "react-router-dom";

import Home from "../pages/Home/Home";
import Onas from "../pages/Onas/Onas";
import Kontakt from "../pages/Kontakt/Kontakt";
import Zivotni from "../pages/Zivotni/Zivotni";
import Nezivotni from "../pages/Nezivotni/Nezivotni";
import Firemni from "../pages/Firemni/Firemni";
import Cestovni from "../pages/Cestovni/Cestovni";
import Majetkove from "../pages/Majetkove/Majetkove";
import Vozidla from "../pages/Vozidla/Vozidla";
import Odpovednost from "../pages/Odpovednost/Odpovednost";
import Vice from "../pages/Vice/Vice";
import Ucet from "../pages/Ucet/Ucet";
import AktualityDetail from "../pages/AktualityDetail/AktualityDetail";
import AktualitaDetail from "../pages/AktualitaDetail/AktualitaDetail";
import VyhodyDetail from "../pages/VyhodyDetail/VyhodyDetail";
import VyhodaCard from "../pages/VyhodaCard/VyhodaCard";
import PojisteniAll from "../pages/PojisteniAll/PojisteniAll";
import PojisteniDetail from "../pages/PojisteniDetail/PojisteniDetail";
import HlaseniSkody from "../pages/HlaseniSkody/HlaseniSkody";
import Gdpr from "../pages/GDPR/GDPR";
import Podminky from "../pages/Podminky/Podminky";
import Login from "../pages/Auth/Login";

const AnimatedRoutes = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    initUniversalScrollAnimations();
  }, [location.pathname]);

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/o-nas" element={<Onas />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/pojisteni/detail" element={<PojisteniAll />} />
      <Route path="/pojisteni/detail/*" element={<PojisteniDetail />} />
      <Route path="/pojisteni/vice" element={<Vice />} />
      <Route path="/profil" element={<Ucet />} />
      <Route path="/aktuality/detail" element={<AktualityDetail />} />
      <Route path="/aktuality/detail/:slug" element={<AktualitaDetail />} />
      <Route path="/vyhody/detail" element={<VyhodyDetail />} />
      <Route path="/vyhody/detail/:slug" element={<VyhodaCard />} />
      <Route path="/hlaseni-skody" element={<HlaseniSkody />} />
      <Route path="/podminky" element={<Podminky />} />
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AnimatedRoutes;

