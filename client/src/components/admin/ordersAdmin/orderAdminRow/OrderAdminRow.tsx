import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import { updateOrderStatus } from "../../../../redux/actions/ordersAdmin";
import { Img } from "../../../users/ordersHistory/OrdersHistoryStyle";
import { Select } from "./OrderAdminRowStyles";

interface Detail_Props {
  id: number;
  name: string;
  quantity: number;
  amount: number;
  image: string;
}

interface Props {
  id: number;
  status: string;
  total: number;
  billing_address: string;
  detail: Detail_Props[];
}

export interface STATUS {
  status: string
}

const statusArray: string[] = ['Corfirmed', 'Prosesing', 'Canceled', 'Dispatched', 'Completed']
const OrderAdminRow = ({ id, status, total, billing_address, detail }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
  const [statusOrder, setStatusOrder] = useState<STATUS>({
    status: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    setStatusOrder({
      ...statusOrder,
      status: e.target.value
    })

    if (status.length > 0) {
      console.log(statusOrder)
      dispatch(updateOrderStatus(userInStorage.token, statusOrder, id.toString()))
    }
  }
  return (
    // <tr>
    //   <th scope="row"> {id} </th>
    //   <td>
    // <Select
    //   defaultValue={`${status}`}
    //   className="form-select"
    //   onChange={(e) => handleChange(e)}
    // >
    //   {/* <option disabled hidden>
    //   {`${status}`}
    //   </option> */}
    //   {
    //     statusArray.map((s, i: number) => {
    //       return <option key={i} value={`${s}`} > {s} </option>
    //     })
    //   }

    // </Select>

    //   </td>
    //   <td> {total} </td>
    //   <td>
    //     <button className="btn btn-outline-primary">Detail</button>
    //   </td>
    // </tr>
    <tbody>
      <tr>
        <th scope="row">{id}</th>
        <td>
          <Select
            defaultValue={`${status}`}
            className="form-select"
            onChange={(e) => handleChange(e)}
          >
            {/* <option disabled hidden>
          {`${status}`}
          </option> */}
            {
              statusArray.map((s, i: number) => {
                return <option key={i} value={`${s}`} > {s} </option>
              })
            }

          </Select></td>
        <td>${total}</td>
        <td>{billing_address}</td>
        <td><button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls="collapse">Detail</button></td>
      </tr>
      {
        detail.map(product => {
          return <tr key={product.id} id={`collapse${id}`} className="accordion-collapse collapse align-items-center" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <td><Img src={product.image} /></td>
            <td><Link to={`/detail/${id}`}>{product.name}</Link></td>
            <td>${product.amount}</td>
            <td>Quantity: {product.quantity}</td>
            <td><Link to='/products' className="btn btn-primary btn-sm">
              Review
            </Link>
            </td>
          </tr>
        })
      }
    </tbody>
  );
};

export default OrderAdminRow;
