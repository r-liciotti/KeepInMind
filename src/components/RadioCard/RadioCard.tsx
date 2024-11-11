interface RadioCardProps {
  titles: string[];
  descriptions: string[];
  typeData: "T" | "P"; // Stato ricevuto con i due possibili valori
  setTypeData: (type: "T" | "P") => void; // Funzione per aggiornare il tipo
}

function RadioCard({
  titles,
  descriptions,
  typeData,
  setTypeData,
}: RadioCardProps) {
  const titoloA = titles[0];
  const titoloB = titles[1];
  const descA = descriptions[0];
  const descB = descriptions[1];

  return (
    <div className="flex w-full items-start gap-3 flex-wrap sm:flex-nowrap">
      <label className="custom-label-option flex sm:w-1/2 flex-row items-start gap-3">
        <input
          type="radio"
          name="radio-18"
          className="radio radio-primary radio-sm"
          checked={typeData === "T"} // Seleziona se typeData è "temperature"
          onChange={() => setTypeData("T")} // Cambia lo stato in "temperature"
        />
        <div className="-mt-1 w-full text-start">
          <span className="label">
            <span className="label-text text-base">{titoloA}</span>
          </span>
          <span className="label">
            <span className="label-text-alt text-sm">{descA}</span>
          </span>
        </div>
      </label>
      <label className="custom-label-option flex sm:w-1/2 flex-row items-start gap-3">
        <input
          type="radio"
          name="radio-18"
          className="radio radio-primary radio-sm"
          checked={typeData === "P"} // Seleziona se typeData è "pollution"
          onChange={() => setTypeData("P")} // Cambia lo stato in "pollution"
        />
        <div className="-mt-1 w-full text-start">
          <span className="label">
            <span className="label-text text-base">{titoloB}</span>
          </span>
          <span className="label">
            <span className="label-text-alt text-sm">{descB}</span>
          </span>
        </div>
      </label>
    </div>
  );
}

export default RadioCard;
