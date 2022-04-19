import axios from "axios";
import { Dispatch } from "redux";
import swal from "sweetalert";

import { Product, ProductCart, TYPES_ORDERS_USER , TYPES_CART} from "../interface";
// import { ProductCart, TYPES_ORDERS_USER } from "../interface";
const URL = "http://localhost:3001/api/auth/orders";

export const getOrdersUser = (token: string) => {
  try {
    return async (dispatch: Dispatch) => {
      const userOrders = await axios.get(`${URL}/user`, {
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

export const createOrderUser = (token: string, allProductsOrder: ProductCart[]) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.post(URL, allProductsOrder, {
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error); 
  }
};

export const getcurrentOrder = (token: string) => {
  try {
    return async (dispatch: Dispatch) => {
      const activeOrder = await axios.get(`${URL}`,{
        headers: {
          "auth-token": token,
        },
      });
      return dispatch({
        type: TYPES_ORDERS_USER.GET_ORDER,
        payload: activeOrder.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const resetCurrentOrder = () => {
  try {
    return async (dispatch: Dispatch) => {

      return dispatch({
        type: TYPES_ORDERS_USER.RESET_ORDER,
        payload: {},
      });
    };
  } catch (error) {
    console.log(error);
  }
};



export const updateOrderUser = (
  id: any,
  shipping_address: any,
  token: string
) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}/info/${id}`, shipping_address, {
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error);
  }
};
  export const updatePayPal = (id: any, info : any, token : string) => {
    try {
      console.log('paso por aca');
      
      return async (dispatch: Dispatch) => {
        await axios.put(`${URL}/pay/${id}`,info,{
          headers: {
            "auth-token": token,
          },
        });
      };
      
      
    } catch (error) {
      swal({
        title: "Wrong",
        text: "Something went wrong with the payment",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
      console.log(error); 
    }
  };
