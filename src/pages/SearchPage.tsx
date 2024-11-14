import { useParams } from "react-router-dom";
import RadioCard from "../components/RadioCard/RadioCard";
import { useState } from "react";
import GeocodingMap from "../components/GeocodingMap/GeocodingMap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TemperatureChart from "../components/Charts/TemperatureChart";
import PollutionChart from "../components/Charts/PollutionChart";

import ComboBoxDesktop from "../components/ComboBox/ComboBoxDesktop";
import useIsMobile from "../mediaqueries/useIsMobile";
import React from "react";

export default function SearchPage() {
  const { searchParam } = useParams();
  const [typeData, setTypeData] = useState<"T" | "P">("T"); // Stato limitato a due stringhe
  const selectedState = useSelector(
    (state: RootState) => state.stateSelection.selectedState,
  );

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="searchPage container mx-auto flex flex-col gap-4 bg-base-100 px-4 md:max-w-4xl">
      <h1 className="mt-2 p-1 text-4xl font-semibold capitalize text-base-content">
        {searchParam}
      </h1>
      {!useIsMobile() && (
        <ComboBoxDesktop
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}
      <RadioCard
        titles={["Storico Temperature", "Inquinamento"]}
        descriptions={[
          "Storico Dati delle Temperature",
          "Dati sull'Inquinamento (PM10-PM2.3-NO2-CO2-Polveri)",
        ]}
        typeData={typeData} // Passa lo stato attuale
        setTypeData={setTypeData} // Passa la funzione per aggiornare lo stato
      />
      {selectedState && searchParam && (
        <React.Fragment>
          <GeocodingMap
            lat={parseFloat(selectedState.latitude)}
            long={parseFloat(selectedState.longitude)}
          />
          {typeData === "T" ? <TemperatureChart state={selectedState} /> : null}
          {typeData === "P" ? <PollutionChart state={selectedState} /> : null}
        </React.Fragment>
      )}
    </div>
  );
}
