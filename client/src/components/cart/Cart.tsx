import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Product } from "../../redux/interface";
import { State } from "../../redux/reducers";
import CartProduct from "./cartProduct/CartProduct";
import { CartContainer } from "./CartStyles";

const Cart = (): JSX.Element => {
  const productsCart = useSelector((state: State) => state.cart.cart);

  return (
    <CartContainer className="container-fluid">
      <h3 className="text-center pt-3">Cart</h3>
      {productsCart.length === 0 ? (
        <div className="text-center">
          <h4 className="mb-4 mt-5">No products in the cart.</h4>
          <Link to="/products">
            <button className="btn btn-primary">See products</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="mt-5">
            {productsCart.map((product: Product) => (
              <CartProduct
                key={product.id}
                name={product.name}
                image={product.image}
                count={product.count}
                price={product.price}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between mt-4 align-items-center">
            <h3>
              Total: $
              {productsCart.reduce((a: number, product: Product) => a + product.price * product.count,0)}
              ( {productsCart.reduce((a: number, product: Product) => a + product.count,0)} products )
            </h3>
            <div>
              <button className="btn btn-primary">Confirm order</button>
            </div>
          </div>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;
