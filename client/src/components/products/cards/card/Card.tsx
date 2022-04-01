import React from "react";
import { CardComponent, CardFooter, ProductIMG } from "./CardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
}

const Card = ({ name, image, price, id }: props) => {
  return (
    <CardComponent className="card">
      <div className="d-flex flex-column">
        <Link to={`/detail/${id}`} className="text-decoration-none">
          <ProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></ProductIMG>
          <p className="card-title m-2">{name}</p>
        </Link>
      </div>

      <CardFooter className="card-footer d-flex align-items-end justify-content-between">
        <h5 className="m-2">${price}</h5>
        <button type="button" className="btn btn-primary">
          <img src={cartIcon} alt=""></img>
        </button>
      </CardFooter>
    </CardComponent>
  );
};

export default Card;
