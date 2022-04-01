import axios from "axios";
import { Dispatch } from "redux";
// import { IProduct_Create } from "../../components/form/Form";
// import interfaces from '....'

const URL = "expample.com";

export interface IProduct_Create {
  subcategory_id: string[];
  name: string;
  brand: string;
  image: string;
  price: number;
  description: string;
  weigth: number;
  stock: number;
}



export const postProduct = (product: IProduct_Create) => {
  return async (dispatch: Dispatch) => {
    //Ponemos el dispatch para tener mayor control del dispatch
    await axios.post(   URL);
    alert("Receta creada con exito");
  };
};
