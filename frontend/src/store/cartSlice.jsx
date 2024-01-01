import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart : []
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state, action) => {
            const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if(itemIndex >= 0){
                state.cart[itemIndex].quantity ++;
            }
            else{
                state.cart.push({...action.payload, quantity : 1});
            }
        },
        incrementItem : (state, action) => {
            const item = state.cart.filter(item => item.id === action.payload);
            item[0].quantity++;
        },
        decrementItem : (state, action) => {
            const item = state.cart.filter(item => item.id === action.payload);
            if(item[0].quantity === 1){
                state.cart = state.cart.filter(item => item.id !== action.payload);
            }
            else item[0].quantity--;
        },
        deleteItem : (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;