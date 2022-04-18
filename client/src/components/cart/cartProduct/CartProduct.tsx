import React from "react";
import {
  ProductButton,
  CountContainer,
  NameContainer,
  ProductContainer,
  ProductIMG,
  Price,
} from "./CartProductStyle";
import minusIMG from "../../../icons/minus.png";
import plusIMG from "../../../icons/plus.png";
import trashIMG from "../../../icons/trash.png";
import { Product, ProductCart } from "../../../redux/interface";
import { Link } from "react-router-dom";

interface Props {
  productId?: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  updateQuantityHandler: any;
  removeProductHandler: any;
  product: ProductCart;
}

const CartProduct = ({
  productId,
  name,
  price,
  image,
  quantity,
  updateQuantityHandler,
  removeProductHandler,
  product,
}: Props): JSX.Element => {
  return (
    <ProductContainer className="mt-2 d-flex flex-column flex-md-row justify-content-md-between align-items-center">
      <Link
        to={`../detail/${productId}`}
        className="text-decoration-none d-flex align-items-center flex-column flex-md-row my-4 my-md-0 "
      >
        <ProductIMG src={image} alt="..."></ProductIMG>
        <NameContainer>{name}</NameContainer>
      </Link>
      <div className="d-flex align-items-center ">
        <CountContainer>
          <ProductButton
            onClick={() => updateQuantityHandler(product, product.quantity - 1,"remove")}
            disabled={product.quantity === 1}
          >
            <img src={minusIMG} alt="minus"></img>
          </ProductButton>
          <h5 className="mx-3 pt-2">{quantity}</h5>
          <ProductButton
            onClick={() => updateQuantityHandler(product, product.quantity + 1, "add")}
            disabled={product.quantity === product.stock}
          >
            <img src={plusIMG} alt="plus"></img>
          </ProductButton>
        </CountContainer>
        <Price>${price * quantity}</Price>
        <ProductButton onClick={(e) => removeProductHandler(product)}>
          <img src={trashIMG} alt="trash"></img>
        </ProductButton>
      </div>
    </ProductContainer>
  );
};

export default CartProduct;
