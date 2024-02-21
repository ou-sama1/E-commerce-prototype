import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    favorites : [],
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
            state.favorites = [];
        },
        addToFav(state, action){
            const exists = state.favorites.filter(item => item.id === action.payload.id)[0];
            if(exists){
                state.favorites = state.favorites.filter(item => item.id !== exists.id)
            }
            else{
                state.favorites.push(action.payload);
            }
        },
        fillFav(state, action){
            if(action.payload){
                state.favorites = action.payload;
            }
        }
    }
})

export default userSlice.reducer;
export const userActions = userSlice.actions;