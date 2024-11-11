import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";

export default function Navbar() {
  const [touch, setTouch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const liRef1 = useRef<HTMLLIElement>(null);
  const liRef2 = useRef<HTMLLIElement>(null);

  const handleInfoClick = () => {
    setSearchValue("");
    setTouch(!touch);
    navigate(`/info`);
  };

  const handleHomeClick = () => {
    setTouch(!touch);
    if (touch) {
      navigate("/");
      return;
    }
  };

  // Gestisci il clic al di fuori dei singoli li per chiudere il menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        liRef1.current &&
        !liRef1.current.contains(target) &&
        liRef2.current &&
        !liRef2.current.contains(target)
      ) {
        setTouch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul className="flex flex-col items-start fixed bottom-3 z-50 left-1/2 transform -translate-x-1/2 gap-3 w-[calc(100vw-1.5rem)] p-1">
      <li
        ref={liRef1}
        className={`ml-2 transform transition-all duration-500 ease-out ${
          touch ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          className="btn rounded-xl w-11 h-11 p-2"
          onClick={handleInfoClick}
        >
          <span className="icon-[solar--question-circle-linear] w-full h-full"></span>
        </button>
      </li>

      <li ref={liRef2} className="flex gap-4 items-center w-full">
        <button
          className="btn rounded-2xl w-15 h-15 p-2"
          onClick={handleHomeClick}
        >
          <span
            className={`w-full h-full ${
              touch
                ? "icon-[solar--home-angle-linear]"
                : "icon-[lets-icons--search-alt]"
            }`}
          ></span>
        </button>

        <ComboBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showOnTouch={touch}
        />
      </li>
    </ul>
  );
}
