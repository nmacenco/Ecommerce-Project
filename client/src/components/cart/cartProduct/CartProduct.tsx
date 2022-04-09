import React from "react";
import {
  ProductButton,
  CountContainer,
  NameContainer,
  ProductContainer,
  ProductIMG,
} from "./CartProductStyle";
import minusIMG from "../../../icons/minus.png";
import plusIMG from "../../../icons/plus.png";
import trashIMG from "../../../icons/trash.png";
import { Product } from "../../../redux/interface";
import { Link } from "react-router-dom";

interface Props {
  id?: number ;
  name: string;
  price: number;
  image: string;
  count: number;
  updateCountHandler: any;
  removeProductHandler:any;
  product: Product;
}

const CartProduct = ({
  id,
  name,
  price,
  image,
  count,
  updateCountHandler,
  removeProductHandler,
  product,
}: Props): JSX.Element => {
  return (
    <ProductContainer className="mt-2 d-flex justify-content-between align-items-center">
      <Link to={`../detail/${id}`} className="text-decoration-none d-flex align-items-center">
        <ProductIMG src={image} alt="..."></ProductIMG>
        <NameContainer>{name}</NameContainer>
      </Link>
      <CountContainer>
        <ProductButton
          onClick={() => updateCountHandler(product, product.count - 1)}
          disabled={product.count === 1}
        >
          <img src={minusIMG} alt="minus"></img>
        </ProductButton>
        <h5 className="mx-3 pt-2">{count}</h5>
        <ProductButton
          onClick={() => updateCountHandler(product, product.count + 1)}
          disabled={product.count === product.stock}
        >
          <img src={plusIMG} alt="plus"></img>
        </ProductButton>
      </CountContainer>
      <h5>${price}</h5>
      <ProductButton onClick={(e) => removeProductHandler(product)}>
        <img src={trashIMG} alt="trash"></img>
      </ProductButton>
    </ProductContainer>
  );
};

export default CartProduct;
