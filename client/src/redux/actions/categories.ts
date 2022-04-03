import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_CATEGORIES } from "../interface";

const URL = "http://localhost:3001/api/";

export const getCategories = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allCategories = await axios.get(URL+"/categories");
      return dispatch({
        type: TYPES_CATEGORIES.GET_CATEGORIES,
        payload: allCategories.data.data,
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const getSubCategories = () => {
    try {
      return async (dispatch: Dispatch) => {
        const allSubCategories = await axios.get(URL+"/subcategories");
        return dispatch({
          type: TYPES_CATEGORIES.GET_SUBCATEGORIES,
          payload: allSubCategories.data.data,
        });
      };
    } catch (error) {
      alert(error);
    }
  };
