import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./Slices/stateSlice"; // Cambia il path se necessario

export const store = configureStore({
    reducer: {
        stateSelection: stateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
