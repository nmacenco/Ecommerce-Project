


import React from "react";

const OrderAdminRow = (): JSX.Element => {
    return(
        <tr>
            <th scope="row">Order ID</th>
            <td>
                <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </td>
            <td>Total</td>
            <td><button className="btn btn-outline-primary">Detail</button></td>
          </tr>
    )
}

export default OrderAdminRow;