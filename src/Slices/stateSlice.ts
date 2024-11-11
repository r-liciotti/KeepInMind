// stateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../interfaces/Country";

interface StateSelection {
    selectedState: State | null;
    WeatherStorageKey: string; // Mantieni WeatherStorageKeys come stringa
    PollutionStorageKey: string;
}

const initialState: StateSelection = {
    selectedState: null,
    WeatherStorageKey: "", // Inizializza WeatherStorageKeys come stringa vuota
    PollutionStorageKey: "",
};

const stateSlice = createSlice({
    name: "stateSelection",
    initialState,
    reducers: {
        setSelectedState: (state, action: PayloadAction<State>) => {
            state.selectedState = action.payload;

            if (state.selectedState.latitudeNumber === undefined && state.selectedState.latitude) {
                state.selectedState.latitudeNumber = parseFloat(
                    state.selectedState.latitude
                );
            }
            if (state.selectedState.longitudeNumber === undefined && state.selectedState.longitude) {
                state.selectedState.longitudeNumber = parseFloat(
                    state.selectedState.longitude
                );
            }


        },
        setStorageKeys: (state, action: PayloadAction<string>) => {
            state.WeatherStorageKey = "weatherData_" + action.payload; // Imposta PollutionStorageKey
            state.PollutionStorageKey = "pollutionData_" + action.payload;
        }


    },
});

export const { setSelectedState, setStorageKeys } = stateSlice.actions;
export default stateSlice.reducer;

