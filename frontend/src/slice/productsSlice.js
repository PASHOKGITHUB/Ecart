import { createSlice } from "@reduxjs/toolkit";

//createSlice is a default method from the the redux 
const productsSlice=createSlice({
    name:'products',
    initialState:{
        loading:false,
        products: []
    },
    //reducers hold the function that we are going to use.what the reduces is returning is the current state.
    reducers:{
        productsRequest(state){
            //here when we run the project, and it is loading to get the product at that time the loading spinner is visible.
            return{
                loading : true
            }
        },
        productsSuccess(state,action){
            return{
                loading:false,
                product:action.payload.product
            }
        },
        productsFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }
})

//creating the Action creator Reducer, so that the reducer will perform . the action creator function will create the Action object 
const {actions,reducer}=productsSlice//here actions and reducer are the two properties.

//these are the action creators.
export const{productsRequest, productsSuccess,productsFail}=actions

export default reducer



// import { createSlice } from '@reduxjs/toolkit';

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     productsRequest(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     productsSuccess(state, action) {
//       state.loading = false;
//       state.products = action.payload;
//     },
//     productsFail(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { productsRequest, productsSuccess, productsFail } = productsSlice.actions;
// export default productsSlice.reducer;
