import axios from "axios";
import { Dispatch } from "redux";
import { Product, ProductForm, TYPES_ADMIN } from '../interface';

const URL = "http://localhost:3001/api/admin/products/";

export const postProduct = (product: ProductForm) => {
    try {
      return async (dispatch: Dispatch) => {
        await axios.post(URL, product);
      };
    } catch (error) {
      alert(error);
    }
  };

export const deleteProduct = (id: string | undefined) => {
    try {
      return async (dispatch: Dispatch) => {    
        await axios.delete(URL + id);
        return dispatch({
            type: TYPES_ADMIN.DELETE_PRODUCTS,
            payload: id,
          });
      };
    } catch (error) {
      alert(error);
    }
  };
  
  export const putProducts = (editProduct: ProductForm, id: string | undefined) => {
    try {
      return async (dispatch: Dispatch) => {
        await axios.put(`${URL}products/${id}`, editProduct);
        alert("Product updated succesfully");
      };
    } catch (error) {
      alert(error);
    }
  };