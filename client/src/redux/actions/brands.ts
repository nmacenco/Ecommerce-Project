import axios from "axios";
import { Dispatch } from "redux";

import { TYPES_BRANDS } from "../interface";

const URL = "/api/brands";

export function getBrands() {
  return async function(dispatch: Dispatch) {
    const brands = await axios.get(URL);

    return dispatch({
      type: TYPES_BRANDS.GET_BRANDS,
      payload: brands.data.data,
    });
  };
}