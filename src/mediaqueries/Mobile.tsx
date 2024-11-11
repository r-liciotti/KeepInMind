import { useMediaQuery } from "react-responsive";
import React from "react";

interface MobileProps {
  children: React.ReactNode;
}

const Mobile: React.FC<MobileProps> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  return isMobile ? <>{children}</> : null;
};

export default Mobile;
