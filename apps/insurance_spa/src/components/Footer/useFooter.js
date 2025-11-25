import { useNavigation } from "../../hooks/useNavigation";
import { footerActions } from "./footerActions";

export function useFooter() {
  const { goTo } = useNavigation();

  const handleClick = (item) => {
    if (item.action && footerActions[item.action]) footerActions[item.action]();
    else if (item.path) goTo(`/${item.path}`);
    else if (item.url) window.open(item.url, "_blank");
  };

  return { handleClick };
}
