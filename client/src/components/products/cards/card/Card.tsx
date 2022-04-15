import React, { useState } from "react";
import { CardComponent, CardFooter, ProductIMG } from "./CardStyles";
import cartIcon from "../../../../icons/cart-icon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Product, User } from "../../../../redux/interface";
import { State } from "../../../../redux/reducers";
import { addProductCart, addProductOrder } from "../../../../redux/actions/cart";

interface props {
  name: string;
  image: string;
  price: number;
  id?: number;
  stock: number;
  product: Product;
}

const Card = ({ name, image, price, id, stock, product }: props) => {
  const dispatch = useDispatch();
  const productsCart = useSelector((state: State) => state.cart.cart);
  const user = useSelector((state: State) => state.user)
  const productInCart = productsCart.find((x: Product) => x.id === product.id);

  function addCartHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const productInCart = productsCart.find(
      (x: Product) => x.id === product.id
    );
    const quantity = productInCart ? productInCart.quantity + 1 : 1;
    if (Number(quantity) <= Number(stock)) {
      product.quantity = quantity;
      dispatch(addProductCart(product));
      user && id && dispatch(addProductOrder(user.token,id))
    }
  }

  return (
    <CardComponent className="card d-flex flex-column justify-content-between">
      <div className="d-flex flex-column">
        <Link to={`/detail/${id}`} className="text-decoration-none">
          {/* {<img src="/images/heartFit.svg" alt='add heart' />} */}
          <ProductIMG
            src={image}
            alt={image}
            className="card-img-top"
          ></ProductIMG>

          {name.length > 40 ? (
            <p className="card-title m-2">{name.slice(0, 40)}...</p>
          ) : (
            <p className="card-title m-2">{name}</p>
          )}
        </Link>
      </div>

      <CardFooter className="card-footer d-flex align-items-end justify-content-between">
        <h5 className="m-3">${price}</h5>
        {product.quantity === stock || productInCart && productInCart.quantity === stock ? (
          <button type="button" className="btn btn-primary h-100" disabled>
            <img src={cartIcon} alt=""></img>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary h-100"
            onClick={(e) => addCartHandler(e)}
          >
            <img src={cartIcon} alt=""></img>
          </button>
        )}

      </CardFooter>

    </CardComponent>
  );
};

export default Card;
