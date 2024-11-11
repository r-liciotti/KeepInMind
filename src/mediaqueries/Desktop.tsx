import { useMediaQuery } from "react-responsive";
import React from "react";

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? <>{children}</> : null;
};

export default Desktop;
