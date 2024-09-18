import { createSlice } from "@reduxjs/toolkit";

//createSlice is a default method from the the redux 
const productSlice=createSlice({
    name:'products',
    initialState:{
        loading:false,
        products: []
    },
    //reducers hold the function that we are going to use.what the reduces is returning is the current state.
    reducers:{
        productRequest(state){
            //here when we run the project, and it is loading to get the product at that time the loading spinner is visible.
            return{
                loading : true
            }
        },
        productSuccess(state,action){
            return{
                loading:false,
                product:action.payload.product
            }
        },
        productFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }
})

//creating the Action creator Reducer, so that the reducer will perform . the action creator function will create the Action object 
const {actions,reducer}=productSlice//here actions and reducer are the two properties.

//these are the action creators.
export const{productRequest, productSuccess,productFail}=actions

export default reducer
