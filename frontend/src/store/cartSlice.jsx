import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart : null,
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state, action) => {
            if(state.cart === null){
                state.cart = [];
            }

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
        incrementItemBy : (state, action) => {
            if(state.cart === null){
                state.cart = [];
            }
            
            const item = state.cart.filter(item => item.id === action.payload.product.id)[0];
            if(item){
                item.quantity += action.payload.quantity;
            }
            else{
                state.cart.push({...action.payload.product, quantity : action.payload.quantity});
            }
            
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
        },
        fillCart : (state, action) => {
            if(action.payload){
                state.cart = action.payload;
            }
        },
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;