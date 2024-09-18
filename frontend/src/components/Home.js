import { Fragment, useEffect } from "react";
import MetaData from "./layouts/metaData";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../actions/productsActions";
import Loader from "./layouts/loader";
import Products from "./products/products";
import {toast} from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';

export default function Home(){
    const dispatch=useDispatch()    
    //to get the data from the the state we have to use the selector hook.
    const {product,loading,error}=useSelector((state)=>state.productsState)

    //this useEffect will call once the component get loded.we creating to get the data for one time.
    useEffect(()=>{
        if(error){
            return toast.error(error,{
                position:'bottom-center'
            })  
        }
        dispatch(getproducts)
    },[error])//we use the [] for running the callback for one time.

    return(
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                <MetaData title={'Best Products'}/>
                    <section id="products" className="container mt-5">
                        <div className="row"> 
                            {product && product.map(product=>(
                                <Products product={product}/>
                            ))}
                            </div>
                    </section> 
                </Fragment>
             }
                
        </Fragment>         
    )
}