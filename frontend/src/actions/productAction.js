import axios from 'axios'
import {productRequest,productSuccess,productFail} from '../slice/productSlice'

//we cannot call the reducer directly, we can able to call the reducer only in the component file, otherwise it will shows an error.
export const getproducts=id=>async(dispatch)=>{

    //to use the productRequest reducer in this file we need a dispatch function.
   try {
        dispatch(productRequest())
        const {data}=await axios.get(`products/getSingleProduct/${id}`)//{data} represent the product data mentioned in the destructuring format.
        dispatch(productSuccess(data))
   } catch (error) {
        dispatch(productFail(error.response.data.message))
   }
}
