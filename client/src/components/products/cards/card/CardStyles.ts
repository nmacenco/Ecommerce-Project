import styled from "styled-components";

export const ProductIMG = styled.img`
  height: 280px;
  padding: 2rem;
`;

export const CardComponent = styled.div`
  position: relative;
  /* width: 22em; */
  height: 420px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  /* pointer-events: none; */

  .corazon {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
    /* right: -90%; */
    z-index: 10;
    transform: rotate(45deg);
    background-color: #e5b6b6;
    cursor: pointer;
  }

  .corazon:before,
  .corazon:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background-color: #e5b6b6;
    cursor: pointer;
  }
  .corazon:before {
    top: 0;
    left: -50%;
  }
  .corazon:after {
    top: -50%;
    right: 0%;
  }

  .corazon:hover:after,
  .corazon:hover::before,
  .corazon:hover {
    background-color: red;
  }
  .corazon:active,
  .corazon:active:after,
  .corazon:active:before {
    background-color: goldenrod;
  }

  .red-heart {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
    /* right: -90%; */
    z-index: 10;
    transform: rotate(45deg);
    background-color: red;
    cursor: pointer;
  }
  .red-heart:before,
  .red-heart:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background-color: red;
    cursor: pointer;
  }
  .red-heart:before {
    top: 0;
    left: -50%;
  }
  .red-heart:after {
    top: -50%;
    right: 0%;
  }
`;

export const CardFooter = styled.div`
  // height: 60px;
  padding: 0 !important;
`;
