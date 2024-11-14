import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedState, setStorageKeys } from "../../Slices/stateSlice"; // Cambia il path se necessario
import SearchCityByName from "../../services/SearchCoutries";
import { State } from "../../interfaces/Country";
import { useNavigate } from "react-router-dom";

interface ComboBoxDesktopProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

function ComboBoxDesktop({
  searchValue,
  setSearchValue,
}: ComboBoxDesktopProps) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<State[]>([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!searchValue) return;
    const selectedOption = options.find(
      (option: State) =>
        option.name.toLowerCase() === searchValue.toLowerCase(), // Ignora maiuscole/minuscole
    );
    if (selectedOption) {
      dispatch(setSelectedState(selectedOption));
      dispatch(setStorageKeys(selectedOption.name));
      navigate(`/search/${searchValue}`);
      setSearchValue("");

      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (searchValue === undefined) {
      return;
    }
    if (
      searchValue.length >= 3 &&
      !options.some((option) => option.name === searchValue)
    ) {
      setOptions(SearchCityByName(searchValue));

      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div
      className={`form-control join w-full max-w-sm transform transition-all duration-500 ease-out md:max-w-lg`}
    >
      <input
        type="text"
        placeholder="Cerca la Citta"
        className="input input-lg join-item w-full grow rounded-2xl p-2"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown} // Aggiunto il gestore di eventi per 'Enter'
      />
      {isOpen && (
        <div
          id="comboBox"
          className="vertical-scrollbar rounded-scrollbar absolute top-15 z-10 flex max-h-44 w-full flex-col space-y-0.5 rounded-box bg-base-100 p-3 shadow-lg"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex cursor-pointer rounded-lg bg-base-100 p-2 text-sm active:bg-base-200"
              onClick={() => {
                setSearchValue(option.name);
                setIsOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
      <button
        className="btn join-item btn-lg rounded-2xl border-base-content/40 bg-base-200 px-3 md:px-5"
        onClick={handleSearchClick}
      >
        <span className="icon-[lets-icons--search-alt] bg-base-content/75 text-3xl"></span>
      </button>
    </div>
  );
}

export default ComboBoxDesktop;
