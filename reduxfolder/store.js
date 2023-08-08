import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/location-slice"

export const store = configureStore({
    reducer: {
        currentLocation: locationReducer
    }
})