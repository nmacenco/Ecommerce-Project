import axios from "axios";
import { Dispatch } from "redux";

import { Product, TYPES_ORDERS_USER } from "../interface";
const URL = "http://localhost:3001/api/auth/orders";

export const getOrdersUser = (id: string, token: string) => {
  try {
    return async (dispatch: Dispatch) => {
      const userOrders = await axios.get(`${URL}/user/`,{
        headers: {
          "auth-token": token,
        },
      });

      return dispatch({
        type: TYPES_ORDERS_USER.GET_ORDERS,
        payload: userOrders.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const createOrderUser = (token: string, cart: Product[]) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.post(URL,cart,{
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error); 
  }
};

