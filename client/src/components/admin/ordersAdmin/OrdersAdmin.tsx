import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrdersAdmin } from "../../../redux/actions/ordersAdmin";
import OrderAdminRow from "./orderAdminRow/OrderAdminRow";
import { Table } from "./OrderAdminStyles";


const ordenes = [
  {
    id: 1 ,
    total_amount: 125,
    email_address: 'prueba@hotmail.com' ,
    status: 'Confirmed' , 
    user: 'Prueba Pruebita' , 
    billing_address: 'Una calle me separa',
    detail: [ 
      
    ]

  },
  {
    id: 2 ,
    total_amount: 125,
    email_address: 'prueba@hotmail.com' ,
    status: 'Confirmed' , 
    user: 'Prueba Pruebita' , 
    billing_address: 'Una calle me separa',
    detail: [ 
      
    ]

  },
  {
    id: 3 ,
    total_amount: 125,
    email_address: 'prueba@hotmail.com' ,
    status: 'Confirmed' , 
    user: 'Prueba Pruebita' , 
    billing_address: 'Una calle me separa',
    detail: [ 
      
    ]

  },
  {
    id: 4 ,
    total_amount: 125,
    email_address: 'prueba@hotmail.com' ,
    status: 'Confirmed' , 
    user: 'Prueba Pruebita' , 
    billing_address: 'Una calle me separa',
    detail: [ 
      
    ]

  },
  {
    id: 5 ,
    total_amount: 125,
    email_address: 'prueba@hotmail.com' ,
    status: 'Confirmed' , 
    user: 'Prueba Pruebita' , 
    billing_address: 'Una calle me separa',
    detail: [ 
      
    ]

  },
]

const OrdersAdmin = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect (()=>{
        // dispatch(getOrdersAdmin())
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
            {
              ordenes && ordenes.map((order , i) => {
                return (
                  <OrderAdminRow 
                    key = {i} 
                    id = {order.id}
                    status = {order.status}
                    total = {order.total_amount}
                    detail = {order.detail}
                  />

                )

              })
            }

          </tbody>
        </Table>
      </div>
    );
  };
  
  export default OrdersAdmin;