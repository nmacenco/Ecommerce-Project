import styled from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;

  .wish {
    margin-top: 10px;
    cursor: pointer;
  }
`;

export const Box = styled.div`
  margin-top: 60px;
  width: 90%;
  max-width: 900px;
`;

export const ImgPriceContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 5;
`;

export const Price = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  @media (min-width: 800px) {
    margin-top: 0px;
  }
`;

export const DeleteEditButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  width: 40%;
`;
