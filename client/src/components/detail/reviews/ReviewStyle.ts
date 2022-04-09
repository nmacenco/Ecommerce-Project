import styled from "styled-components";

export const RewiewContainer = styled.div`
  margin-top: 20px;
`;

export const RewieHeader = styled.header`
  /* height: 80px; */
  /* border: none; */
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;

  div.d-img-rewiew {
    width: calc(100% - 200px);
    height: 70px;
    margin: 15px 0px;
    /* border: 2px solid #f00; */
    display: flex;

    div:nth-child(1) {
      width: 70px;
      height: 70px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    div:nth-child(2) {
      //nombre del usuario
      margin-left: 15px;
      font-size: 1.4rem;
      font-weight: bold;
      margin-top: 10px;
    }
  }
`;

export const Rewiewstars = styled.div`
  width: 200px;
  /* border: 2px solid blue; */
  display: flex;
  direction: rtl;
  /* text-align: center; */

  input {
    display: none;
  }

  /* label::before {
    content: "★";
     color: lightgray; 
  } */

  

  label {
    display: block;
    cursor: pointer;
    width: 40px;
  }
  label:before {
    content: "★";
    position: relative;
    display: block;
    font-size: 50px;
    color: lightgray;
  }
  label:after {
    content: "★";
    position: absolute;
    display: block;
    font-size: 50px;
    color: gold;
    top: 0;
    opacity: 0;
    transition: 0.5s;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }

  label:hover:after,
  label:hover ~ label:after,
  input:checked ~ label:after {
    opacity: 1;
  }
`;


export const RewiewstarStatic = styled.article`
  width: 200px;
  /* border: 2px solid blue; */
  display: flex;
  margin-right: 10px;

  .dark-star:before {
    content: "★";
    position: relative;
    display: block;
    font-size: 50px;
    color: lightgray;
  }

  .rating:before {
    content: "★";
    position: relative;
    display: block;
    font-size: 50px;
    color: gold;
  }
`;
