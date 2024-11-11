interface AirQualityProps {
  AQI: number;
}

const legendaAQI = [
  { range: [0, 50], color: "#00af00", livello: "Buono" }, // Verde
  { range: [51, 100], color: "#ffd100", livello: "Discreto" }, // Giallo
  { range: [101, 150], color: "#FFA500", livello: "Moderato" }, // Arancione
  { range: [151, 200], color: "#cd1b1b", livello: "Scarso" }, // Rosso
  { range: [201, 300], color: "#ad05ad", livello: "Pessimo" }, // Viola
  { range: [300, 500], color: "#7e0023", livello: "Pericoloso" }, // Viola
];

function AirQuality({ AQI }: AirQualityProps) {
  // Funzione per ottenere il colore dall'AQI
  const getColorForAQI = (AQI: number) => {
    const legendItem = legendaAQI.find(
      (item) => AQI >= item.range[0] && AQI < item.range[1]
    );
    return legendItem;
  };

  // Colore dello sfondo in base al valore AQI
  const AQI_Obj = getColorForAQI(AQI);
  const padreStyle = { backgroundColor: `${AQI_Obj?.color}b5` }; // Opacità dimezzata
  const quadratoStyle = { backgroundColor: `${AQI_Obj?.color}` }; // Colore pieno

  return (
    <div
      style={padreStyle}
      className="flex gap-4 border rounded-xl w-full p-3 "
    >
      <div
        style={quadratoStyle}
        className="flex flex-col btn btn-square rounded-lg w-fit h-fit p-4 text-white"
      >
        <p className="text-sm text-left">EUR AQI</p>
        <p className="text-3xl">{Math.floor(AQI)}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="uppercase text-sm">Indice AQI in tempo reale</h2>
        <p className="text-3xl font-bold">{AQI_Obj?.livello}</p>
      </div>
    </div>
  );
}

export default AirQuality;
