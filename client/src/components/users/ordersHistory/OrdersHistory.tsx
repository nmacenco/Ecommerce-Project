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
  const [userInStorage, /* setUserInStorage */] = useLocalStorage("USER_LOGGED", "");
  const Orders = useSelector((state: State) => state.ordersUser.userOrders);

  useEffect(() => {
    dispatch(getOrdersUser(userInStorage.token, userInStorage.token));
  }, []);

  const filteredOrders = Orders.filter(
    (order: Order) => order.status !== "PENDING"
  );


  const objOrder = [
    {
      id: 1,
      total_amount: 125,
      email_address: 'prueba@hotmail.com',
      status: 'Confirmed',
      user: 'Prueba Pruebita',
      billing_address: 'Una calle me separa',
      detail: [{
        id: 2,
        name: "Notebook",
        quantity: 3,
        amount: 500,
        image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
      }, {
        id: 4,
        name: "PC",
        quantity: 1,
        amount: 2900,
        image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
      }]

    },
    {
      id: 2,
      total_amount: 125,
      email_address: 'prueba@hotmail.com',
      status: 'Confirmed',
      user: 'Prueba Pruebita',
      billing_address: 'Una calle me separa',
      detail: [

      ]

    },
    {
      id: 3,
      total_amount: 125,
      email_address: 'prueba@hotmail.com',
      status: 'Confirmed',
      user: 'Prueba Pruebita',
      billing_address: 'Una calle me separa',
      detail: [

      ]

    },
    {
      id: 4,
      total_amount: 125,
      email_address: 'prueba@hotmail.com',
      status: 'Confirmed',
      user: 'Prueba Pruebita',
      billing_address: 'Una calle me separa',
      detail: [

      ]

    },
    {
      id: 5,
      total_amount: 125,
      email_address: 'prueba@hotmail.com',
      status: 'Confirmed',
      user: 'Prueba Pruebita',
      billing_address: 'Una calle me separa',
      detail: [{
        id: 2,
        name: "Notebook",
        quantity: 3,
        amount: 500,
        image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
      }, {
        id: 4,
        name: "PC",
        quantity: 1,
        amount: 2900,
        image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
      }]

    },
  ]

  return (
    <Container>

    <div className="accordion w-75" id="accordionExample">
    <h3 className="text-center mt-5">Orders History</h3>
      <Table className="table table-hover mt-5 ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">STATUS</th>
            <th scope="col">TOTAL</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">DETAIL</th>
          </tr>
        </thead>
        {
          objOrder.map(order => {
            return <OrderRow
              key={order.id}
              id={order.id}
              totalAmount={order.total_amount}
              status={order.status}
              billing_address={order.billing_address}
              detail={order.detail}
            />
          })
        }

      </Table>
    </div >
    </Container>
  );
};

export default OrdersHistory;
