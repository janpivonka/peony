import { useNavigation } from "../../hooks/useNavigation";
import { headerIcons as iconsData, headerData as menuData } from "./headerData";
import { useSearchBar } from "../SearchBar/useSearchBar";

export function useHeader() {
  const { goTo, getCurrentPath } = useNavigation();
  const currentPath = getCurrentPath();

  const saveQuery = (text) => console.log("Uloženo:", text);
  const searchBar = useSearchBar("", saveQuery);

  const handleClick = (item) => {
    if (item.text === "Pojištění") {
      if (currentPath === "/pojisteni/detail") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (currentPath === "/") {
        const el = document.getElementById(item.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        goTo("/pojisteni/detail");
      }
      return;
    }

    if (item.path) {
      if (currentPath === item.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        goTo(item.path);
      }
    }
    else if (item.slug) {
      const targetPath = `/pojisteni/detail/${item.slug}`;
      if (currentPath === targetPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        goTo(targetPath);
      }
    }
    else if (item.scrollTo) {
      const el = document.getElementById(item.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleIconClick = (icon) => {
    if (icon.action === "toggleSearch") searchBar.toggleSearch();
    else if (icon.path) goTo(icon.path);
  };

  return { menuData, iconsData, handleClick, handleIconClick, searchBar };
}
