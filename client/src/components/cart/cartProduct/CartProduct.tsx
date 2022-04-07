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

interface Props {
  name:string;
  price:number;
  image:string;
  count:number;
}

const CartProduct = ({name,price,image,count}:Props): JSX.Element => {
  return (
    <ProductContainer className="mt-2 d-flex justify-content-between align-items-center">
      <ProductIMG
        src={image} alt="..."
      ></ProductIMG>
      <NameContainer>
        {name}
      </NameContainer>
      <CountContainer>
        <ProductButton>
          <img src={minusIMG} alt="minus"></img>
        </ProductButton>
        <h5 className="mx-3 pt-2">{count}</h5>
        <ProductButton>
          <img src={plusIMG} alt="plus"></img>
        </ProductButton>
      </CountContainer>
      <h5>${price}</h5>
      <ProductButton>
        <img src={trashIMG} alt="trash"></img>
      </ProductButton>
    </ProductContainer>
  );
};

export default CartProduct;
