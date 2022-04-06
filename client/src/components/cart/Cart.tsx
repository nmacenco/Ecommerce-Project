import React from "react";
import { Link } from "react-router-dom";
import CartProduct from "./cartProduct/CartProduct";
import { CartContainer } from "./CartStyles";

const Cart = (): JSX.Element => {
  return (
    <CartContainer className="container-fluid">
      <h3 className="text-center pt-3">Cart</h3>
      <div className="mt-5">
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </div>
      <div className="d-flex justify-content-between mt-4 align-items-center">
        <h3>Total: $999</h3>
        <div>
          <button className="btn btn-primary">Confirm order</button>
        </div>
      </div>
      {/* <div className="text-center">
        <h4 className="mb-4 mt-5">No products in the cart.</h4>
        <Link to="/products" >
          <button className="btn btn-primary">See products</button>
        </Link>
      </div> */}
    </CartContainer>
  );
};

export default Cart;
