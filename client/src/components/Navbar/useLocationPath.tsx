import React from "react";
import { withRouter } from "react-router-dom";

export function useLocationPath() {
  const [path, setPath] = React.useState(window.location.pathname);

  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
}
