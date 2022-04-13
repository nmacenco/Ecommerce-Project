import styled from "styled-components";

export const RewiewContainer = styled.div`
  margin-top: 20px;
`;

export const RewieHeader = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
`;

export const Rewiewstars = styled.div`
  width: 200px;
  display: flex;
  direction: rtl;

  input {
    display: none;
  }

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
