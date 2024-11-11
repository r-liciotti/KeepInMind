import { useMediaQuery } from "react-responsive";

const useIsMobile = (): boolean => {
  return useMediaQuery({ maxWidth: 1023 });
};

export default useIsMobile;
