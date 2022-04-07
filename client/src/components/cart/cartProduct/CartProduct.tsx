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

const CartProduct = (): JSX.Element => {
  return (
    <ProductContainer className="mt-2 d-flex justify-content-between align-items-center">
      <ProductIMG
        src="data:image/jpeg;base64,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"
        alt="..."
      ></ProductIMG>
      <NameContainer>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor{" "}
      </NameContainer>
      <CountContainer>
        <ProductButton>
          <img src={minusIMG} alt="minus"></img>
        </ProductButton>
        <h5 className="mx-3 pt-2">2</h5>
        <ProductButton>
          <img src={plusIMG} alt="plus"></img>
        </ProductButton>
      </CountContainer>
      <h5>$99999</h5>
      <ProductButton>
        <img src={trashIMG} alt="trash"></img>
      </ProductButton>
    </ProductContainer>
  );
};

export default CartProduct;