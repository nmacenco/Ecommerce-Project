import React from "react";
import { FooterContainer } from "./FooterStyles";

const Footer = (): JSX.Element => {
  return (
    <FooterContainer className=" bg-primary text-white fixed-bottom ">
      <div className="text-center p-4">
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Ecommerce.com
        </a>
      </div>
    </FooterContainer>
  );
};

export default Footer;
