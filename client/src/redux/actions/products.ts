import axios from "axios";
import { Dispatch } from "redux";
<<<<<<< HEAD
import { IProduct_Create } from "../../components/formCreate/FormCreate";
=======
import { IProduct_Create } from "../../components/form/FormCreate";
>>>>>>> adeb277297a4f01e49b75268e575704325308ae1
// import interfaces from '....'

const URL = "expample.com";

export const postProduct = (product: IProduct_Create) => {
  return async (dispatch: Dispatch) => {
    //Ponemos el dispatch para tener mayor control del dispatch
    await axios.post(   URL);
    alert("Producto creado.");
  };
};
