import axios from "axios";
import { Dispatch } from "redux";
import { STATUS } from "../../components/admin/ordersAdmin/orderAdminRow/OrderAdminRow";

import { TYPES_ADMIN } from "../interface";
// import interfaces from '....'
const URL = "/api";

export const getOrdersAdmin = (token: string) => {
  try {
    return async (dispatch: Dispatch) => {
      const allOrders = await axios.get(`${URL}/admin/orders`, {
        headers: {
          'auth-token': token
        }
      });
      console.log(allOrders.data.data);

      return dispatch({
        type: TYPES_ADMIN.GET_ORDERS,
        payload: allOrders.data.data,
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const resetOrdersAdmin = () => {
  try {
    return async (dispatch: Dispatch) => {
      return dispatch({
        type: TYPES_ADMIN.RESET_ORDERS,
        payload: [],
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const updateOrderStatus = (token: string, status: STATUS, id: string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}/admin/orders/state/${id}`, status, {
        headers: {
          'auth-token': token
        }
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const orderHistoryStatus = (value: string) => {
  try {
    return async (dispatch: Dispatch) => {
      return dispatch({
        type: TYPES_ADMIN.O_ORDERS,
        payload: value
      })
    }
  } catch (error) {
    console.log(error)
  }
}

