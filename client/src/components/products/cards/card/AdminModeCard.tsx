import React from "react";
import {  AdminProductIMG } from "./AdminModeCardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
}

const AdminModeCard = ({ name, image, price, id }: props) => {
  return (

     <tbody>

      <tr className="table-light">
        <th scope="row">           
          <AdminProductIMG
             src={image}
            alt={image}
            className="card-img-top"
          ></AdminProductIMG></th>
        <td>{name.length > 20 ? <p className="">{name.slice(0,20)}...</p> : <p className="card-title m-2">{name}</p>}</td>
        <td> $ {price} </td>
        <td>Column content</td>
      </tr>


    </tbody> 
    // <CardComponent className="">
    //   <div className="">
    //     <Link to={`/detail/${id}`} className="text-decoration-none">
    //       <ProductIMG
    //         src={image}
    //         alt={image}
    //         className="card-img-top"
    //       ></ProductIMG>
    //       {name.length > 40 ? <p className="card-title m-2">{name.slice(0,40)}...</p> : <p className="card-title m-2">{name}</p>}
    //     </Link>
    //   </div>
    //   <CardFooter className="card-footer d-flex align-items-end justify-content-between">
    //     <h5 className="m-3">${price}</h5>
    //     <button type="button" className="btn btn-primary h-100">
    //       <img src={cartIcon} alt=""></img>
    //     </button>
    //   </CardFooter>
    // </CardComponent>
  );
};

export default AdminModeCard;
