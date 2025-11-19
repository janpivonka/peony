import { useNavigation } from "../../hooks/useNavigation";
import { headerData as menuData } from "./headerData";

export function useHeader() {
  const { goTo, getCurrentPath } = useNavigation();
  const currentPath = getCurrentPath();

  const handleClick = (item) => {
    if (!item) return;

    if (item.path) {
      if (currentPath === item.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        goTo(item.path);
      }
      return;
    }

    if (item.scrollTo) {
      const el = document.getElementById(item.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  };

  return { menuData, handleClick };
}
