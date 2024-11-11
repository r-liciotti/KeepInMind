import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarDesktop() {
  const navigate = useNavigate();

  const location = useLocation();

  const [activeButton, setActiveButton] = useState(0); // Indice del pulsante attivo

  const buttons = ["Home", "Search", "Info"];
  const positions = ["2", "36", "71"];
  const widths = ["34", "36", "27"];

  // Naviga in base al pulsante attivo
  useEffect(() => {
    if (buttons[activeButton] === "Home") {
      navigate("/");
    }
    if (buttons[activeButton] === "Search") {
      navigate("/search");
    }
    if (buttons[activeButton] === "Info") {
      navigate("/info");
    }
  }, [activeButton]);

  // Cambia l'overlay della navbar in base al pulsante attivo
  useEffect(() => {
    if (location.pathname.includes("search")) {
      setActiveButton(1);
      return;
    }
    if (location.pathname.includes("info")) {
      setActiveButton(2);
      return;
    }
    setActiveButton(0);
  }, [location]);

  return (
    <nav className="relative mt-7 flex w-fit gap-6 rounded-3xl bg-base-200 px-4 py-2 ring-1 ring-primary/50">
      <div
        id="overlay"
        className="absolute top-[5px] h-3/4 rounded-full bg-base-100 transition-all duration-300"
        style={{
          left: `${positions[activeButton]}%`,
          width: `${widths[activeButton]}%`,
        }} // Sposta l'overlay in base al pulsante attivo
      ></div>
      {buttons.map((label, index) => (
        <button key={index} onClick={() => setActiveButton(index)}>
          <p className={`relative z-10 text-xl`}>{label}</p>
        </button>
      ))}
    </nav>
  );
}
