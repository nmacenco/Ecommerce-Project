import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import { updateOrderStatus } from "../../../../redux/actions/ordersAdmin";
import { Select } from "./OrderAdminRowStyles";
import swal from "sweetalert";
interface Props {
  id: number;
  status: string;
  total: number;
  email_address : string ;
  // detail: any[];
}

export interface STATUS {
  status: string
  email_address : string ;
}

const statusArray: string[] = ['BILLED', 'CANCELED', 'DISPATCHED', 'DISPATCHED', 'DELIVERED' ,'FINISHED']
// const OrderAdminRow = ({ id, status, total, detail }: Props): JSX.Element => {

const OrderAdminRow = ({ id, status, total, email_address }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
  const [statusOrder, setStatusOrder] = useState<STATUS>({
    status: "",
    email_address : `${email_address}` ,
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()

    statusOrder.status = e.target.value ; 
    
    swal({
      title: "Product created successfully",
      icon: "error",
      buttons: {
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        console.log(statusOrder)

        dispatch(updateOrderStatus(userInStorage.token, statusOrder, id.toString()))
      }
    })
    if (statusOrder.status.length > 0) {
    }
  }
  return (
    
    <tr>
      <th scope="row"> {id} </th>
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

        </Select>

      </td>
      <td> {email_address} </td>
      <td> {total} </td>
      <td>
        <button className="btn btn-outline-primary">Detail</button>
      </td>
    </tr>
  );
};

export default OrderAdminRow;
