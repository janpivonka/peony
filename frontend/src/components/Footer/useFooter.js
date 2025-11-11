import { useNavigate } from "react-router-dom";
import { footerActions } from "./footerActions";

export function useFooter() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.action && footerActions[item.action]) footerActions[item.action]();
    else if (item.path) navigate(`/${item.path}`);
    else if (item.url) window.open(item.url, "_blank");
  };

  return { handleClick };
}
