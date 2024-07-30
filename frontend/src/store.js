//this file defines the redux setup.
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"

//the reducer function will helps to change the state.
//we will create the reducer seperately for user, products.. and call here. 
//the thunk middleware execute the functions asynchronously.

const reducer=combineReducers({

})  
const store=configureStore({
    reducer,
    middleware: [thunk]
})

export default store