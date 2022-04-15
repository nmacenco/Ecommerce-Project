import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { getOrdersUser } from "../../../redux/actions/ordersUser";
import { Order } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import OrderRow from "./orderRow/OrderRow";
import { Table } from "./OrdersHistoryStyle";

const OrdersHistory = (): JSX.Element => {
  const dispatch = useDispatch();
  const [userInStorage, /* setUserInStorage */] = useLocalStorage("USER_LOGGED", "");
  const Orders = useSelector((state: State) => state.ordersUser.userOrders);

  useEffect(() => {
    dispatch(getOrdersUser(userInStorage.token, userInStorage.token));
  }, []);

  const filteredOrders = Orders.filter(
    (order: Order) => order.status !== "PENDING"
  );

  return (
    <div className="container d-flex flex-column">
      <h3 className="text-center mt-5">Orders History</h3>
      {!filteredOrders.length ? (
        <h4 className="text-center mt-5 pt-5"> No orders done yet.</h4>
      ) : (
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
            {Orders.map((order: Order) => {
              order.status !== "PENDING" && (
                <OrderRow
                  id={order.id}
                  totalAmount={order.total_amount}
                  status={order.status}
                />
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdersHistory;
