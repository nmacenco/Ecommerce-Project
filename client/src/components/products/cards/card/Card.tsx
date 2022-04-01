import React from "react";
import { CardComponent, ProductIMG } from "./CardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
}

const Cards = ({ name, image, price, id }: props) => {
  return (
    <CardComponent className="card mx-auto">
      <ProductIMG src={image} alt={image} className="card-img-top"></ProductIMG>
      <Link to={`/detail/${id}`} className='text-decoration-none'><p className="card-body">{name}</p></Link>
      <div className="d-flex justify-content-between">
        <h5 className="m-2">${price}</h5>
        <button type="button" className="btn btn-primary">
          <img src={cartIcon} alt=""></img>
        </button>
      </div>
    </CardComponent>
  );
};

export default Cards;
