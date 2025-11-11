import { useNavigate, useLocation } from "react-router-dom";
import { headerIcons as iconsData, headerData as menuData } from "./headerData";
import { useSearchBar } from "../SearchBar/useSearchBar";

export function useHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const saveQuery = (text) => console.log("Uloženo:", text);
  const searchBar = useSearchBar("", saveQuery);

  const handleClick = (item) => {
    if (item.text === "Pojištění") {
      if (location.pathname === "/pojisteni/detail") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (location.pathname === "/") {
        const el = document.getElementById(item.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/pojisteni/detail");
      }
      return;
    }

    if (item.path) {
      if (location.pathname === item.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(item.path);
      }
    }
    else if (item.slug) {
      const targetPath = `/pojisteni/detail/${item.slug}`;
      if (location.pathname === targetPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(targetPath);
      }
    }
    else if (item.scrollTo) {
      const el = document.getElementById(item.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleIconClick = (icon) => {
    if (icon.action === "toggleSearch") searchBar.toggleSearch();
    else if (icon.path) navigate(icon.path);
  };

  return { menuData, iconsData, handleClick, handleIconClick, searchBar };
}

