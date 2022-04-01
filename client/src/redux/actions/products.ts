import axios from "axios";
import { Dispatch } from "redux";
import { Product } from "../interface";
// import interfaces from '....'

const URL = "expample.com";

export const postProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    //Ponemos el dispatch para tener mayor control del dispatch
    await axios.post(URL);
    alert("Receta creada con exito");
  };
};
