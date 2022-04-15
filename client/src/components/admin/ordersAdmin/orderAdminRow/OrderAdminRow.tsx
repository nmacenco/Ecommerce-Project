import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import { updateOrderStatus } from "../../../../redux/actions/ordersAdmin";
import { Select } from "./OrderAdminRowStyles";
interface Props {
  id: number;
  status: string;
  total: number;
  detail: any[];
}

export interface STATUS {
  status: string
}

const statusArray: string[] = ['Corfirmed', 'Prosesing', 'Canceled', 'Dispatched', 'Completed']
const OrderAdminRow = ({ id, status, total, detail }: Props): JSX.Element => {
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
      <td> {total} </td>
      <td>
        <button className="btn btn-outline-primary">Detail</button>
      </td>
    </tr>
  );
};

export default OrderAdminRow;
