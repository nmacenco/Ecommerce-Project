import React from "react";
import { Select } from "./OrderAdminRowStyles";
interface Props {
  id: number;
  status: string;
  total: number;
  detail: any[];
}
const statusArray: string[] = [ 'Corfirmed' , 'Prosesing' , 'Canceled' , 'Dispatched' , 'Completed']
const OrderAdminRow = ({ id, status, total, detail }: Props): JSX.Element => {
  return (
    <tr>
      <th scope="row"> {id} </th>
      <td>
        <Select
          defaultValue={`${status}`}
          className="form-select"
        //   onChange={(e) => handleSort(e)}
        >
          {/* <option disabled hidden>
          {`${status}`}
          </option> */}
        {
            statusArray.map ( s => {
                    return <option value = {`${s}`} > {s} </option>
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
