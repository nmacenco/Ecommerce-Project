
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
width: 80%;

  @media (max-width: 1100px) {
  /* border: solid red ; */
    flex-direction: column;
    align-items: center;
  }

`
export const TableContainer = styled.div `
flex: 3;
margin-right: 10px;

  @media (max-width: 1200px) {
    margin-bottom: 15px;
  }

`
export const OrderSumaryContainer = styled.div `
  flex: 1;
  margin-left: 10px;


`
export const OrderSumarySmallerContainer = styled.div `

    width: 300px;
    


`


export const ItemsTaxShipp = styled.div `
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px;
  margin: 10px 0;

  @media (max-width: 900px) {
  /* border: solid red ; */
    /* flex-direction: column;
    align-items: center; */
  }


`
export const AdminProductIMG = styled.img`
    width: 70px;
`;
export const Table = styled.table`
    width: 70px;
`;