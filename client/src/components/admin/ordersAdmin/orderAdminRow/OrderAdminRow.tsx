import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import { updateOrderStatus } from "../../../../redux/actions/ordersAdmin";
import { Img } from "../../../users/ordersHistory/OrdersHistoryStyle";
import { Select } from "./OrderAdminRowStyles";
import swal from "sweetalert";

interface Detail_Props {
  id: number;
  productName: string;
  quantity: number;
  amount: number;
  image: string;
}

interface Props {
  id: number;
  status: string;
  total: number;
  email_address: string;
  // detail: any[];
  billing_address: string;
  details: Detail_Props[];
}

export interface STATUS {
  status: string
  email_address: string;
}

const statusArray: string[] = ['BILLED', 'CANCELED', 'DISPATCHED', 'DELIVERED', 'FINISHED']
// const OrderAdminRow = ({ id, status, total, detail }: Props): JSX.Element => {


const OrderAdminRow = ({ id, status, total, billing_address, details, email_address }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const [update, setUpdate] = useState<boolean>(false)
  const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
  const [statusOrder, setStatusOrder] = useState<STATUS>({
    status: "",
    email_address: `${email_address}`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()

    statusOrder.status = e.target.value;

    swal({
      title: "Order status changed",
      icon: "success",
      buttons: {
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        dispatch(updateOrderStatus(userInStorage.token, statusOrder, id.toString()))
        setUpdate(!update)
      }
    })
    if (statusOrder.status.length > 0) {
    }
  }
  return (

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
        details.map((product: Detail_Props, i: number) => {
          return <tr key={i} id={`collapse${id}`} className="accordion-collapse collapse align-items-center" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <td><Img src={product.image} /></td>
            <td><Link to={`/detail/${id}`}>{product.productName}</Link></td>
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
