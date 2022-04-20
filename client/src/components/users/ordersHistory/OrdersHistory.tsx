import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { getOrdersUser } from "../../../redux/actions/ordersUser";
import { Order } from "../../../redux/interface";
import { State } from "../../../redux/reducers";
import OrderRow from "./orderRow/OrderRow";
import { Accordion, Container, Table } from "./OrdersHistoryStyle";

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

    <Accordion className="accordion" id="accordionExample">
    <h3 className="text-center mt-5">Orders History</h3>
    { filteredOrders.length ?
      <Table className="table table-hover mt-5">
        <thead className="w-100">
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">STATUS</th>
            <th scope="col"></th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        {filteredOrders.map(order => {
            return <OrderRow
              key={order.id}
              id={order.id}
              userId={order.userID}
              totalAmount={order.total_amount}
              status={order.status}
              paidAt={order.paidAt}
              details={order.details}
            />
          }) }

        </Table>
                : <h5 className="text-center mt-5 pt-5">Not orders done yet.</h5> }
    </Accordion>
    </Container>
  );
};

export default OrdersHistory;
