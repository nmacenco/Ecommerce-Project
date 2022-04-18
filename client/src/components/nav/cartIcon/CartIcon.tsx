import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../../redux/reducers";
import { CartIMG } from "./CartIconStyles";
import cartIcon from "../../../icons/cart-icon.png";
import { ProductCart } from "../../../redux/interface";

const CartIcon = () => {
  const productsCart = useSelector((state: State) => state.cart.cart);

  return (
    <Link className="nav-item" to={"/cart"}>
      <CartIMG src={cartIcon} />
      <span className="badge rounded-pill bg-light text-dark fs-5">
        {productsCart.reduce(
          (a: number, product: ProductCart) => a + product.quantity,
          0
        )}
      </span>
    </Link>
  );
};

export default CartIcon;
