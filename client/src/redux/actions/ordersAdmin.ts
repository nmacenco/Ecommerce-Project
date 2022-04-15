import axios from "axios";
import { Dispatch } from "redux";
import { STATUS } from "../../components/admin/ordersAdmin/orderAdminRow/OrderAdminRow";

import { TYPES_ADMIN } from "../interface";
// import interfaces from '....'
const URL = "http://localhost:3001/api";

export const getOrdersAdmin = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allOrders = await axios.get(`${URL}/admin/orders`);
      console.log(allOrders);

      return dispatch({
        type: TYPES_ADMIN.GET_ORDERS,
        payload: allOrders.data.data,
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const updateOrderStatus = (token: string, status: STATUS, id: string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}/admin/orders/${id}`, status, {
        headers: {
          'auth-token': token
        }
      });
    };
  } catch (error) {
    alert(error);
  }
};

