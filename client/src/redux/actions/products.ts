import axios from "axios";
import { Dispatch } from "redux";
import { GET_PRODUCTS, Product, TYPES_PRODUCT } from "../interface";
// import interfaces from '....'

const URL = "http://localhost:3001/api/products";

export const postProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    //Ponemos el dispatch para tener mayor control del dispatch
    await axios.post(URL);
    alert("Receta creada con exito");
  };
};

export const getProducts=()=>{
    return async(dispatch:Dispatch)=>{

      try{
        const {data}=await axios.get(URL);
        console.log(data.data);

        dispatch<GET_PRODUCTS>({
          type:TYPES_PRODUCT.GET_PRODUCTS,
          payload:data.data
        })

      }catch(error){
        console.log('Error en postProduct: ',error);
      }

    }


}
