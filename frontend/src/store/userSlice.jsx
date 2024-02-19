import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        userAutenticated(state, action){
            state.user = action.payload;
        },
        userLoggedOut(state, action){
            state.user = null;
        }
    }
})

export default userSlice.reducer;
export const userActions = userSlice.actions;