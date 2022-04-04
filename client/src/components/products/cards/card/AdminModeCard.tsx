import React, {useState , useEffect} from "react";
import { AdminProductIMG } from "./AdminModeCardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../../redux/actions/admin";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions/products";
import { ORDER } from "../Cards";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
  AdmOrders: (typeorder: string) => void;
}

const AdminModeCard = ({ name, image, price, id ,  AdmOrders }: props ) => {
  const dispatch = useDispatch();
  const stringID = String(id);


  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    dispatch(deleteProduct(stringID));
    AdmOrders(stringID)
  }

  // useEffect(()=> {
  // }, [render])
  return (
    <tbody >
      <tr className="table-light   ">
        <th scope="row">
          <AdminProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></AdminProductIMG>
        </th>
        <td >
          {name.length > 20 ? (
              <p className=""><Link to={`/detail/${id}`}>{name.slice(0, 20)}...</Link></p> 
          ) : (
            <p className="card-title m-2"><Link to={`/detail/${id}`}>{name}</Link></p>
          )}
        </td>
        <td > $ {price} </td>
        <td >
          <button
            onClick={(e)=> {deleteHandler(e)}}
            type="button"
            className="btn btn-danger btn-sm  "
          >
            Delete
          </button>
        </td>
        <td >
          <Link to={`/editProduct/${id}`}>
            <button type="button" className="btn btn-warning btn-sm">
              Edit
            </button>
          </Link>
        </td>
      </tr>
    </tbody>

  );
};

export default AdminModeCard;
