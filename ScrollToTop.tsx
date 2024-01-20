import * as React from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const history = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.pathname]);
  return null;
};
export default ScrollToTop;
