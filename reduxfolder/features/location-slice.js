import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hey: "hello I'm initialState",
    selectedCity: []
}

export const location = createSlice({
    name: "location",
    initialState,
    reducers:{
        setLocation: (state, action) => {
          state.selectedCity = [...state.selectedCity, action.payload]
            console.log ("ben secildim: " + JSON.stringify(state.selectedCity))
        }
    }

})

export const {setLocation} = location.actions;
export default location.reducer;