import { useNavigate, useLocation } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
  };

  const getCurrentPath = () => location.pathname;

  return { goTo, getCurrentPath };
}
