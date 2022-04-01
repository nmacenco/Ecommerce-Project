import styled from "styled-components";

export const ProductIMG = styled.img`
  max-height: 230px;
  padding: 1.2rem;
`;

export const CardComponent = styled.div`
  max-width: 16em;
  max-height: 26em;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export const CardFooter = styled.div`
  max-height: 60px;
`;
