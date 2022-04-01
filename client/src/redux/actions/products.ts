import axios from "axios";
import { Dispatch } from "redux";
import { IProduct_Create } from "../../components/formCreate/FormCreate";
// import interfaces from '....'

const URL = "expample.com";

export const postProduct = (product: IProduct_Create) => {
  return async (dispatch: Dispatch) => {
    //Ponemos el dispatch para tener mayor control del dispatch
    await axios.post(   URL);
    alert("Producto creado.");
  };
};
