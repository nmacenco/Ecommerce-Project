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

  .item-borders {
    width: 100%;
    height: 100%;
    /* border-top: 1px solid black; */
    border-bottom: 1px solid gray;
  }

  .not-content {
    height: 300px;
  }
`;

export const WishGrid = styled.section`
  width: 100%;
  display: grid;
  border-top: 1px solid gray;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  grid-template-columns: repeat(5, minmax(80px, 1fr));
  grid-template-rows: 70px repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  justify-items: center;
  text-align: center;
  position: relative;

  h3 {
    position: absolute;
    transform: translate(10%, 50%);
  }

  span.title {
    background-color: #e2e2e2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid gray;
    font-weight: bold;
  }

  img {
    width: 80%;
    height: 80%;
  }
`;

export const DivButtons = styled.article`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;

  button {
    /* width: 150px; */
    height: 30px;
    border: none;
    border-radius: 3px;
    text-align: center;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
    letter-spacing: 2px;
  }
  button:nth-child(1) {
    background-color: #66a09c;
    margin-bottom: -30px;
  }
  button:nth-child(2) {
    background-color: #d17d7d;
    margin-top: -30px;
  }
  button:nth-child(1):focus {
    box-shadow: 0px 0px 0px 4px #b3dcd982;
  }
  button:nth-child(2):focus {
    box-shadow: 0px 0px 0px 4px #dea7a770;
  }
`;
