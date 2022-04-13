import styled from "styled-components";

export const ProductContainer = styled.div`
  border: 1px solid #e1e1e1;
  padding: 0.5rem 1rem;
`;

export const ProductIMG = styled.img`
  margin: 0.4rem;
  max-width: 100px;
  max-height: 100px;
  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 200px;
  }
`;

export const NameContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 20px;
`;

export const CountContainer = styled.div`
  padding: 0.5rem 0.7rem;
  border: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  width: 12%;
  min-width:136px;
  margin: 0 20px;
`;

export const ProductButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 5px;
  border-radius: 3px;
  &:hover {
    background-color: #e1e1e1;
  }
`;
// export const TrashButton = styled.button`
//     background-color: #fff;
//     border:none;
//     padd
//     &:hover{
//       background-color:#E1E1E1;
//     }
// `

export const Price = styled.h5`
  min-width:70px;
  margin: 0 20px;
`;
