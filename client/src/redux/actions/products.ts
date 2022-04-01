import axios from "axios";
import { Dispatch } from "redux";

import { AXIOSDATA, Product, TYPES_PRODUCT } from "../interface";
// import interfaces from '....'
const URL = "http://localhost:3001/api";

export const postProduct = (product: Product) => {
  try {

    return async (dispatch: Dispatch) => {
      //Ponemos el dispatch para tener mayor control del dispatch
      await axios.post(`${URL}/products`, product);
      alert("Product added successfully");
    };
  } catch (error) {
    alert(error)
  }
};

export const getProducts = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allProducts = await axios.get<AXIOSDATA>(`${URL}/products`);
      return dispatch({
        type: TYPES_PRODUCT.GET_PRODUCTS,
        payload: allProducts.data.data
      })
    }
  } catch (error) {
    alert(error)
  }
};


export const putProducts = (editProduct: Product, id: string | undefined) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}/products/${id}`, editProduct)
      alert('Product updated succesfully')
    }
  } catch (error) {
    alert(error)
  }
}

