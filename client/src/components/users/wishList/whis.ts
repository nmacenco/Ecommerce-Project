import styled from "styled-components";

export const WishContainer = styled.article`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 60px 1fr;
  text-align: center;

  .title {
    padding: 10px 0px;
    i {
      font-weight: 700;
    }
  }

  td {
    height: 50px;
  }
  tr {
    border-bottom: 1px solid gray;
  }


  header {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 10px;
    font-size: 1.3rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .not-content {
    height: 300px;
  }
`;

export const WishGrid = styled.table`
  width: 100%;
  position: relative;

  h3 {
    position: absolute;
    transform: translate(10%, 50%);
  }

  img {
    width: 80%;
    height: 80%;
  }
  .anchor-wish {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .items-buttons {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
`;

export const WishImg = styled.img`
height:100px !important;
width:120px !important;
margin: 10px 0;
`

