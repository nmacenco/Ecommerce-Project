import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { getOrdersUser } from "../../../redux/actions/ordersUser";
import { Order } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import OrderRow from "./orderRow/OrderRow";
import { Container, Table } from "./OrdersHistoryStyle";

const OrdersHistory = (): JSX.Element => {
  const dispatch = useDispatch();
  const [userInStorage, setUserInStorage] = useLocalStorage("USER_LOGGED", "");
  const Orders = useSelector((state: State) => state.ordersUser.userOrders);
  const User = useSelector((state: State) => state.user)

  useEffect(() => {
    User && dispatch(getOrdersUser(userInStorage.token));
  }, []);

  const filteredOrders = Orders.filter(
    (order: Order) => order.status !== "PENDING"
  );   

  return (
    <Container>

    <div className="accordion w-75" id="accordionExample">
    <h3 className="text-center mt-5">Orders History</h3>
    { filteredOrders.length ?
      <Table className="table table-hover mt-5 ">
        <thead className="w-100">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">STATUS</th>
            <th scope="col">TOTAL</th>
            <th scope="col">ADDRESS</th>
          </tr>
        </thead>
        {filteredOrders.map(order => {
            return <OrderRow
              key={order.id}
              id={order.id}
              userId={order.userID}
              totalAmount={order.total_amount}
              status={order.status}
              billing_address={order.shipping_address}
              details={order.details}
            />
          }) }

        </Table>
                : <h5 className="text-center mt-5 pt-5">Not orders done yet.</h5> }
    </div >
    </Container>
  );
};

export default OrdersHistory;
