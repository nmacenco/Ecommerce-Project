import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import OrderAdminRow from "./orderAdminRow/OrderAdminRow";
import { Table } from "./OrderAdminStyles";


const orders = [
  
]

const OrdersAdmin = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect (()=>{
        dispatch(getOrdersAdmin())
    } , [])

    return (
      <div className="container d-flex flex-column">
        <h3 className="text-center mt-5">Orders History</h3>
        <Table className="table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">STATUS</th>
              <th scope="col">TOTAL</th>
              <th scope="col">DETAIL</th>
            </tr>
          </thead>
          <tbody>
            <OrderAdminRow />
            <OrderAdminRow />
            <OrderAdminRow />
          </tbody>
        </Table>
      </div>
    );
  };
  
  export default OrdersAdmin;