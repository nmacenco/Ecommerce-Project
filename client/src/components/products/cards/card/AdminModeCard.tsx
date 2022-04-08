import React, { useState, useEffect } from "react";
import { AdminProductIMG } from "./AdminModeCardStyles";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/actions/products";
import { ORDER } from "../Cards";
import { chargeFilter, resetFilterProducts } from "../../../../redux/actions/filterByCategory";
import { getProductDetail } from "../../../../redux/actions/productDetail";
import swal from "sweetalert";
import { State } from "../../../../redux/reducers";
import { Product } from "../../../../redux/interface";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
  AdmOrders: (typeorder: string) => void;
  page: (typeorder: number) => void;
}

const AdminModeCard = ({ name, image, price, id, AdmOrders, page }: props) => {
  const dispatch = useDispatch()
  const stringId = String(id)
  const navigate = useNavigate()
  const [userInStorage , setuserInStorage] = useLocalStorage('USER_LOGGED','')
  const allProducts = useSelector((state: State) => state.products.products)
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
        dispatch(deleteProduct(stringId , userInStorage.token));
        let deleted = allProducts.filter((e: Product) => String(e.id) !== stringId)
        dispatch(chargeFilter(deleted))
        page(1)
        AdmOrders(stringId)
        swal({
          text: "Product deleted",
          icon: "success"
        })
      }
    })

  }

  function handleClickEdit(e: React.MouseEvent<HTMLButtonElement>): void {
    dispatch(getProductDetail(stringId));
    setTimeout(function () {
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
            onClick={(e) => { deleteHandler(e) }}
            type="button"
            className="btn btn-danger btn-sm  "
          >
            Delete
          </button>
        </td>
        <td >
          <button onClick={(e) => handleClickEdit(e)} type="button" className="btn btn-warning btn-sm">
            Edit
          </button>
        </td>
      </tr>
    </tbody>

  );
};

export default AdminModeCard;
