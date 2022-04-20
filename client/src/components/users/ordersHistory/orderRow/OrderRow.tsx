import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductDetail } from "../../../../redux/actions/productDetail";
import { Img } from "../OrdersHistoryStyle";
import { Fifth, First, Fourth, Second, Third } from "./OrderRowStyle";

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
  paidAt: string;
  details: Detail_Props[];
}

const OrderRow = ({ id, userId,totalAmount, status, paidAt, details }: Props): JSX.Element => { 

  return (
    <tbody >
      <tr>
        <First scope="row">{paidAt.substr(5, 5)}</First>
        <Second>{status}</Second>
        <Fifth></Fifth>
        <Third>${totalAmount}</Third>
        <Fourth><button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls="collapse">Detail</button></Fourth>

      </tr>
      {
        details.map(product => {
          return <tr key={product.productId} id={`collapse${id}`} className="accordion-collapse collapse align-items-center" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <td><Img src={product.image} /></td>
            <td><Link to={`/detail/${product.productId}`} className="text-decoration-none">{product.productName}</Link></td>
            {status === "FINISHED" &&
            <td><Link to={`/newReview/${userId}/${product.productId}`} className="btn btn-primary btn-sm">
              Review
            </Link>
            </td>}  
            <td>${product.amount}</td>
            <td>Quantity: {product.quantity}</td>
            
          </tr>
        })
      }
    </tbody>
  )
}

export default OrderRow;