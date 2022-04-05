import React, {useState , useEffect} from "react";
import { AdminProductIMG } from "./AdminModeCardStyles";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../redux/actions/admin";
import { useDispatch } from "react-redux";
import { getProducts} from "../../../../redux/actions/products";
import { ORDER } from "../Cards";
import { resetFilterProducts } from "../../../../redux/actions/filterByCategory";
import { getProductDetail } from "../../../../redux/actions/productDetail";
import swal from "sweetalert";
interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
  AdmOrders: (typeorder: string) => void;
  page: (typeorder: number) => void;
}

const AdminModeCard = ({ name, image, price, id ,  AdmOrders , page }: props ) => {
  const dispatch = useDispatch();
  const stringID = String(id);
  const navigate = useNavigate()

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true
      }
    }).then((value) => {
      if (value) {

        dispatch(deleteProduct(stringID));
        dispatch(resetFilterProducts())
        dispatch(getProducts())
        page(1)
        AdmOrders(stringID)

        swal({
          text: "Product deleted",
          icon: "success"
        })
      }
    })

  }

  function handleClickEdit (e: React.MouseEvent<HTMLButtonElement>) : void {
    dispatch(getProductDetail(stringID)) ;
    setTimeout(function(){
      navigate(`/editProduct/${id}`)
    }, 500);
  }

  return (
    <tbody >
      <tr className="table-light">
        <th scope="row">
          <AdminProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></AdminProductIMG>
        </th>
        <td >
          {name.length > 30 ? (
              <p className=""><Link to={`/detail/${id}`}>{name.slice(0, 30)}...</Link></p> 
          ) : (
            <p className="card-title m-2"><Link to={`s/detail/${id}`}>{name}</Link></p>
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
            <button onClick={(e)=> handleClickEdit(e)} type="button" className="btn btn-warning btn-sm">
              Edit
            </button>
        </td>
      </tr>
    </tbody>

  );
};

export default AdminModeCard;
