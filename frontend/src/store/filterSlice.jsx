import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category : "",
    gender : "",
    price : "",
}

const filterSlice = createSlice({
    name : "filter",
    initialState,
    reducers : {
        setCategory : (state, action) => {
            state.category = action.payload;
        },
        setGender : (state, action) => {
            state.gender = action.payload;
        },
        setPrice : (state, action) => {
            state.price = action.payload;
        },
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;