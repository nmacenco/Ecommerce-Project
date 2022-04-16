import React from "react";

interface Props {
    id: number;
    totalAmount: number;
    status: string;
  }

const OrderRow  = ({id,totalAmount,status}: Props): JSX.Element => {
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{status}</td>
            <td>${totalAmount}</td>
            <td><button className="btn btn-outline-primary">Detail</button></td>
          </tr>
    )
}

export default OrderRow;