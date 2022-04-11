import styled from "styled-components";

export const SearchForm = styled.form`
  align-items: center;
  img {
    height: 1em;
  }
  input {
    width: 250px;
  }
  position: relative;
  article {
    position: absolute;
    margin-top: 40px;
    bottom: 0;
    width: 100%;
    min-height: 0px;
    transform: translate(0px, 90%);
    background-color: white;
    border-radius: 2px;
    display: grid;
    grid-template-rows: auto(auto-fit, minmax(40px, 1fr));
    justify-items: start;
    text-transform: lowercase;

    span {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 25px;
      cursor: pointer;
      width: 100%;
    }
    span:hover {
      background-color: #e3e2e2;
    }
  }

  div.desplegable {
    position: relative;
  }
`;
