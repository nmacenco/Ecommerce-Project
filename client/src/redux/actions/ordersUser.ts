import axios from "axios";
import { Dispatch } from "redux";

import {  ProductCart, TYPES_ORDERS_USER } from "../interface";
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

export const createOrderUser = (token: string, cart: ProductCart[]) => {
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

// export const getActiveOrder = (token: string) => {
//   try {
//     return async (dispatch: Dispatch) => {
//       const activeOrder = await axios.get(`${URL}/`+token,{
//         headers: {
//           "auth-token": token,
//         },
//       });
//       return dispatch({
//         type: TYPES_ORDERS_USER.GET_ACTIVEORDER,
//         payload: activeOrder.data.data,
//       });
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };


export const updateOrderUser = (id: any, shipping_address : any, token : string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}/info/${id}`,shipping_address,{
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error); 
  }
};
