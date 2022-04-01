import axios from "axios";
import { Dispatch } from "redux";
import { TYPES } from '../interface';

const URL = "http://localhost:3001/api/products/";

export const getProductDetail = (id: string | undefined) => {
  return async (dispatch: Dispatch) => {
    const product = await axios.get(URL + id);

    return dispatch(
      {
        type: TYPES.PRODUCT_DETAIL,
        payload: product.data.data
      }
    )

  };

};
export const deleteProductDetail = () => {
  return {
    type: TYPES.DELETE_PRODUCT_DETAIL,
    payload: {
      id: 0,
      subcategory_id: [],
      name: '',
      brand: '',
      image: '',
      price: 0,
      description: '',
      weigth: 0,
      stock: 0
    }
  }
};
