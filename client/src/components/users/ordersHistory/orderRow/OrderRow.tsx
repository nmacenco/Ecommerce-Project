import React from "react";

interface Props {
    id: number;
    total: number;
    status: string;
  }

const OrderRow = ({id,total,status}: Props): JSX.Element => {
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{status}</td>
            <td>${total}</td>
            <td><button className="btn btn-outline-primary">Detail</button></td>
          </tr>
    )
}

export default OrderRow;