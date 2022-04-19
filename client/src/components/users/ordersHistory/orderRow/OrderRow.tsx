import React from "react";
import { Link } from "react-router-dom";
import { Img } from "../OrdersHistoryStyle";

interface Detail_Props {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  amount: number;
  image: string;
}

interface Props {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  billing_address: string;
  details: Detail_Props[];
}

const OrderRow = ({ id, userId,totalAmount, status, billing_address, details }: Props): JSX.Element => {
  return (
    <tbody>
      <tr>
        <th scope="row">{id}</th>
        <td>{status}</td>
        <td>${totalAmount}</td>
        <td>{billing_address}</td>
        <td><button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls="collapse">Detail</button></td>
      </tr>
      {
        details.map(product => {
          return <tr key={product.productId} id={`collapse${id}`} className="accordion-collapse collapse align-items-center" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <td><Img src={product.image} /></td>
            <td><Link to={`/detail/${product.productId}`} className="text-decoration-none">{product.productName}</Link></td>
            <td>${product.amount}</td>
            <td>Quantity: {product.quantity}</td>
            <td><Link to={`/newReview/${userId}/${product.productId}`} className="btn btn-primary btn-sm">
              Review
            </Link>
            </td>
          </tr>
        })
      }
    </tbody>
  )
}

export default OrderRow;