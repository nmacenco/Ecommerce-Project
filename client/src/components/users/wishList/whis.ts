import styled from "styled-components";

export const WishContainer = styled.article`
  width: 100%;
  /* height: calc(100vh - 130px); */
  /* min-height: 100%; */
  /* border: 2px solid red; */
  /* display: ; */
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

  th,
  td {
    /* width: 86px; */
    /* border-left: 2px solid gray; */
  }
  td {
    height: 50px;
  }
  tr {
    border-top: 2px solid gray;
  }
  tr:nth-last-child(1) {
    border-bottom: 2px solid gray;
  }

  td:nth-child(1),
  th:nth-child(1) {
    border-left: 2px solid gray;
  }
  td:nth-child(5),
  th:nth-child(5) {
    border-right: 2px solid gray;
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

    button {
      border: none;
      border-radius: 3px;
      text-align: center;
      padding: 5px 10px;
      font-size: 0.9rem;
      font-weight: 500;
      color: white;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    button:nth-child(1) {
      background-color: #66a09c;
    }
    button:nth-child(2) {
      background-color: #d17d7d;
    }
    button:nth-child(1):focus {
      box-shadow: 0px 0px 0px 4px #b3dcd982;
    }
    button:nth-child(2):focus {
      box-shadow: 0px 0px 0px 4px #dea7a770;
    }
  }
`;
