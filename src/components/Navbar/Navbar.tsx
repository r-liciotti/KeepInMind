import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";

export default function Navbar() {
  const [touch, setTouch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const liRefThemeController = useRef<HTMLLIElement>(null);
  const liRefInfoPage = useRef<HTMLLIElement>(null);
  const liRefHomeAndSearch = useRef<HTMLLIElement>(null);

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
        liRefThemeController.current &&
        !liRefThemeController.current.contains(target) &&
        liRefInfoPage.current &&
        !liRefInfoPage.current.contains(target) &&
        liRefHomeAndSearch.current &&
        !liRefHomeAndSearch.current.contains(target)
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
    <ul className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100vw-1.5rem)] -translate-x-1/2 transform flex-col items-start gap-3 p-1">
      <li
        ref={liRefThemeController}
        className={`ml-2 transform transition-all duration-500 ease-out ${
          touch ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <label className="btn swap swap-rotate h-11 w-11 rounded-xl p-2">
          <input
            type="checkbox"
            defaultValue="dark"
            className="theme-controller"
          />
          <span className="icon-[tabler--sun] swap-off size-7" />
          <span className="icon-[tabler--moon] swap-on size-7" />
        </label>
      </li>

      <li
        ref={liRefInfoPage}
        className={`ml-2 transform transition-all duration-500 ease-out ${
          touch ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          className="btn h-11 w-11 rounded-xl p-2"
          onClick={handleInfoClick}
        >
          <span className="icon-[solar--question-circle-linear] h-full w-full">
            info
          </span>
        </button>
      </li>

      <li ref={liRefHomeAndSearch} className="flex w-full items-center gap-4">
        <button
          className="btn h-15 w-15 rounded-2xl p-2"
          onClick={handleHomeClick}
        >
          <span
            className={`h-full w-full ${
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
