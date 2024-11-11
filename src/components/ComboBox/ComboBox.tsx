import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedState, setStorageKeys } from "../../Slices/stateSlice"; // Cambia il path se necessario
import SearchCityByName from "../../services/SearchCoutries";
import { State } from "../../interfaces/Country";

interface ComboBoxProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  showOnTouch: boolean;
}

function ComboBox({ searchValue, setSearchValue, showOnTouch }: ComboBoxProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<State[]>([]);

  const handleSearchClick = () => {
    if (!searchValue) return;
    const selectedOption = options.find(
      (option: State) => option.name.toLowerCase() === searchValue.toLowerCase() // Ignora maiuscole/minuscole
    );
    if (selectedOption) {
      dispatch(setSelectedState(selectedOption));
      dispatch(setStorageKeys(selectedOption.name));
      navigate(`/search/${searchValue}`);
      setSearchValue("");
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

  return (
    <div
      className={`form-control w-full join max-w-sm md:max-w-lg transform transition-all duration-500 ease-out ${
        showOnTouch ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      {isOpen && (
        <div
          id="comboBox"
          className="flex flex-col absolute bottom-15 z-10 bg-base-100 vertical-scrollbar rounded-scrollbar rounded-box max-h-44 w-full space-y-0.5 p-3 shadow-lg"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex rounded-lg bg-base-100 active:bg-base-200 p-2 text-sm cursor-pointer"
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
      <input
        type="text"
        placeholder="Cerca"
        className="input input-lg rounded-2xl grow w-full p-2 join-item"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="btn btn-lg rounded-2xl border-base-content/40 join-item bg-base-200 px-3 md:px-5"
        onClick={handleSearchClick}
      >
        <span className="icon-[lets-icons--search-alt] text-3xl bg-black/75"></span>
      </button>
    </div>
  );
}

export default ComboBox;
