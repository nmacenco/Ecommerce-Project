import React from "react";
import { ProductIMG } from "./CardStyles";

interface props {
  name: string;
  image: string;
  price: number;
}

const Cards = ({ name, image, price }: props) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="m-1">
            <ProductIMG
              src={image}
              alt={image}
              className="rounded float-start"
            ></ProductIMG>
            <div>
              <h4 className="card-title">{name}</h4>
              <h5>${price}</h5>
            </div>
          </div>
          <div className="d-grid d-md-flex justify-content-md-end">
            <button
              type="button"
              className="d-grid d-md-flex justify-content-md-end btn btn-outline-primary"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
