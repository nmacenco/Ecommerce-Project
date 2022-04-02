import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/products";
import { State } from "../../redux/reducers";

const Home = () => {

    const dispatch=useDispatch();
    const products=useSelector((state:State)=>state.products.products);

    useEffect(()=>{

        // if(!products.length){
        //     console.log('Se trane todos los productos');
        //     dispatch(getProducts());
        // }
        

    },[])
    return (
        <>
            Soy home
        </>
    );
};

export default Home;
