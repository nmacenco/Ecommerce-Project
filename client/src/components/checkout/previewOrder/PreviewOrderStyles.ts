
import styled from "styled-components";

export const Previewcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  width: 100vw;

`;

export const ColumnsContainer = styled.div `
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;

@media (max-width: 1200px) {
  /* border: solid red ; */
    flex-direction: column;
    align-items: center;
  }

`
export const ItemsTaxShipp = styled.div `
display: flex;
justify-content: space-between;
border-bottom: solid 1px;
margin: 10px 0;

`
export const AdminProductIMG = styled.img`
    width: 70px;
`;