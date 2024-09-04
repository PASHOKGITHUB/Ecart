import axios from 'axios'
import {productsRequest,productsSuccess,productsFail} from '../slice/productsSlice'

//we cannot call the reducer directly, we can able to call the reducer only in the component file, otherwise it will shows an error.
export const getproducts=async(dispatch)=>{

    //to use the productRequest reducer in this file we need a dispatch function.
   try {
        dispatch(productsRequest())
        const {data}=await axios.get('products/getproducts')//{data} represent the product data mentioned in the destructuring format.
        dispatch(productsSuccess(data))
   } catch (error) {
        dispatch(productsFail(error.response.data.message))
   }
}