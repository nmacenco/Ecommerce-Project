import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin, resetOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import OrderAdminRow from "./orderAdminRow/OrderAdminRow";
import { Container, Table } from "./OrderAdminStyles";
import { State } from "../../../redux/reducers";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

const OrdersAdmin = (): JSX.Element => {
  const dispatch = useDispatch()
  const [userInStorage , setuserInStorage] = useLocalStorage('USER_LOGGED','')
  const orders = useSelector((state: State) => state.ordersAdmin.orders);
  useEffect(() => {
    dispatch(getOrdersAdmin(userInStorage!.token))

    return ( ) => {
      dispatch(resetOrdersAdmin())
    }
  }, [])

  return (
    <Container>
    <div className="accordion w-75" id="accordionExample">
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
        { orders.length > 0 &&
          orders.map(order => {
            return <OrderAdminRow
              key={order.id}
              id={order.id}
              total={order.total_amount}
              email_address = {order.email_address}
              status={order.status}
              detail={order.details}
              billing_address={order.shipping_address}
            />
          })
        }
      </Table>
    </div>

    </Container>
  );
};

export default OrdersAdmin;
