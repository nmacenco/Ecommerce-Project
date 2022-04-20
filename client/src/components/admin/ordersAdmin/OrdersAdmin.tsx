import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin, orderHistoryStatus, resetOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import OrderAdminRow from "./orderAdminRow/OrderAdminRow";
import { Container, Table } from "./OrderAdminStyles";
import { State } from "../../../redux/reducers";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

// const ordenes = [
//   {
//     id: 1,
//     total_amount: 125,
//     email_address: 'prueba@hotmail.com',
//     status: 'Confirmed',
//     user: 'Prueba Pruebita',
//     billing_address: 'Una calle me separa',
//     detail: [{
//       id: 2,
//       name: "Notebook",
//       quantity: 3,
//       amount: 500,
//       image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
//     }, {
//       id: 4,
//       name: "PC",
//       quantity: 1,
//       amount: 2900,
//       image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
//     }]

//   },
//   {
//     id: 2,
//     total_amount: 125,
//     email_address: 'prueba@hotmail.com',
//     status: 'Confirmed',
//     user: 'Prueba Pruebita',
//     billing_address: 'Una calle me separa',
//     detail: [

//     ]

//   },
//   {
//     id: 3,
//     total_amount: 125,
//     email_address: 'prueba@hotmail.com',
//     status: 'Confirmed',
//     user: 'Prueba Pruebita',
//     billing_address: 'Una calle me separa',
//     detail: [

//     ]

//   },
//   {
//     id: 4,
//     total_amount: 125,
//     email_address: 'prueba@hotmail.com',
//     status: 'Confirmed',
//     user: 'Prueba Pruebita',
//     billing_address: 'Una calle me separa',
//     detail: [

//     ]

//   },
//   {
//     id: 5,
//     total_amount: 125,
//     email_address: 'prueba@hotmail.com',
//     status: 'Confirmed',
//     user: 'Prueba Pruebita',
//     billing_address: 'Una calle me separa',
//     detail: [

//     ]

//   },
// ]
const statusArray: string[] = ['BILLED', 'CANCELED', 'DISPATCHED', 'FINISHED']


const OrdersAdmin = (): JSX.Element => {
  const dispatch = useDispatch()
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const orders = useSelector((state: State) => state.ordersAdmin.orders);

  useEffect(() => {
    dispatch(getOrdersAdmin(userInStorage!.token))
    return () => {
      dispatch(resetOrdersAdmin())
    }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    dispatch(orderHistoryStatus(e.target.value))
  }

  return (
    <Container>
      {/* <div className="container d-flex flex-column"> */}
      <div className="accordion w-75" id="accordionExample">
        <h3 className="text-center mt-5">Admin Orders</h3>
        <div className="d-flex">
          <label className="input-group-text">Status: </label>
          <select
            className="custom-select"
            onChange={handleChange}
          >STATUS
            {
              statusArray.map((status: string, i: number) => {
                return <option key={i} value={status}>{status}</option>
              })
            }
          </select>
        </div>
        <Table className="table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">STATUS</th>
              <th scope="col">TOTAL</th>
              <th scope="col">DETAIL</th>
            </tr>
          </thead>
          {orders.length > 0 &&
            orders.map(order => {
              return <OrderAdminRow
                key={order.id}
                id={order.id}
                total={order.total_amount}
                email_address={order.email_address}
                status={order.status}
                details={order.details}
                billing_address={order.billing_address}
              />
            })
          }
        </Table>
      </div>

    </Container>
  );
};

export default OrdersAdmin;
