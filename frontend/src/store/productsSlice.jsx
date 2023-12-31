import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products : [
        {id : 0, title : "Jordans", image : "https://static-01.daraz.com.bd/p/81922308e0ba3814358e8f7b2b405738.jpg_750x750.jpg_.webp", description : "good sneakers trust me.", price : 340.00},
        {id : 1, title : "sneakers", image : "https://assets.ajio.com/medias/sys_master/root/20230228/z0n6/63fe1f06aeb26924e3993594/-473Wx593H-469435738-white-MODEL.jpg", description : "good sneakers trust me.", price : 120.00},
        {id : 2, title : "air force", image : "https://www.commeuncamion.com/content/uploads/2020/08/histoire-nike-air-force-1.jpg", description : "good air force trust me.", price : 200.00},
    ],
    cart : []
}

const productsSlice = createSlice({
    name : "products",
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

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;