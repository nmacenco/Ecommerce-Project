import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_DETAIL } from '../interface';

const URL = "http://localhost:3001/api/products/";
const URL_BLOCKS = "http://localhost:3001/api/";

export const getProductDetail = (id: string | undefined) => {
  return async (dispatch: Dispatch) => {
    const product = await axios.get(URL + id);

    return dispatch(
      {
        type: TYPES_DETAIL.PRODUCT_DETAIL,
        payload: product.data.data
      }
    )

  };

};
export const deleteProductDetail = () => {
  return {
    type: TYPES_DETAIL.DELETE_PRODUCT_DETAIL,
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


export const createQuestion=(title:string,description:string,ProductId:number)=>{

  return async(dispatch:Dispatch)=>{

    try {

      const response = await axios.post(URL_BLOCKS + "questions", {
        title,
        description,
        ProductId,
      });

      if(response.data.errorMsg){

        throw new Error("ERROR EN CREATE QUESTION");
      

      }
        console.log(response.data);
        dispatch({
          type: TYPES_DETAIL.CREATE_QUESTION,
          payload: { question: response.data.data },
        });

      

    } catch (error) {
      console.log("error en create Question!");
    }

  }

}

export const createRewie = (
  title: string,
  description: string,
  ProductId: number,
  UserId:number,
  stars:number
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_BLOCKS + "", {
        ProductId,
        UserId,
        title,
        description,
        stars,
      });

      if (response.status == 200) {
        dispatch({
          type: TYPES_DETAIL.CREATE_REWIE,
          payload: response.data,
        });
      } else {
        console.log("ERROR: ", response.data);
      }
    } catch (error) {
      console.log("error en create Question!");
    }
  };
};