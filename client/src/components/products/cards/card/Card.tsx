import React, { useState } from "react";
import { CardComponent, CardFooter, ProductIMG } from "./CardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
}

const Card = ({ name, image, price, id }: props) => {
  return (
    <CardComponent className="card d-flex flex-column justify-content-between">
      <div className="d-flex flex-column">
        <Link to={`/detail/${id}`} className="text-decoration-none">
          <ProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></ProductIMG>
          {name.length > 40 ? <p className="card-title m-2">{name.slice(0, 40)}...</p> : <p className="card-title m-2">{name}</p>}
        </Link>
      </div>
      <CardFooter className="card-footer d-flex align-items-end justify-content-between">
        <h5 className="m-3">${price}</h5>
        <button type="button" className="btn btn-primary h-100">
          <img src={cartIcon} alt="" ></img>
        </button>
      </CardFooter>
    </CardComponent>
  );
};

export default Card;
