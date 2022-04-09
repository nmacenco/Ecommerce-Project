import styled from "styled-components";

export const ProductContainer = styled.div`
border:1px solid #E1E1E1;
padding:0.5rem 1rem
`

export const ProductIMG = styled.img`
margin:0.4rem;
  max-width: 100px;
  max-height: 100px;
`;

export const NameContainer = styled.div`
max-width: 480px;
margin-left:20px;
// max-width: 320px;`

export const CountContainer = styled.div`
padding:0.5rem 0.7rem;
border:1px solid #E1E1E1;
display: flex;
align-items: center;
// justify-content:between;
`

export const ProductButton = styled.button`
    background-color: #fff;
    border:none;
    padding:5px;
    border-radius:3px;
    &:hover{
      background-color:#E1E1E1;
    }
`
// export const TrashButton = styled.button`
//     background-color: #fff;
//     border:none;
//     padd
//     &:hover{
//       background-color:#E1E1E1;
//     }
// `