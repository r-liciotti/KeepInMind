import { Outlet } from "react-router-dom";
import Mobile from "../mediaqueries/Mobile.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import Footer from "./Footer.tsx";
import Desktop from "../mediaqueries/Desktop.tsx";
import NavbarDesktop from "../components/Navbar/NavbarDesktop.tsx";

function AppLayout() {
  return (
    <>
      <Mobile>
        <Navbar />
      </Mobile>

      <Desktop>
        <NavbarDesktop />
      </Desktop>

      <Outlet />

      <Mobile>
        <Footer />
      </Mobile>
    </>
  );
}

export default AppLayout;
