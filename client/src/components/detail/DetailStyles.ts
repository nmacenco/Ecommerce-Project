import styled from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  margin-top:128px;
`;

export const Box = styled.div`
  margin-top: 100px;
  width: 50%;
`;
export const ReviewComentsBox = styled.div`
  margin-top: 40px;
  width: 50%;
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
export const DetailImg = styled.img`
    width: 60%;
    min-width: 150px;
`;
export const Price = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    @media (min-width: 800px) {
      
      margin-top: 0px;
    }
`;

export const MiniImagesBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  `;
export const MiniImages = styled.img`
  width: 30%;
  /* padding: 5px; */
  /* border: solid 1px  ; */
  
  `;

  export const DeleteEditButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    @media (min-width: 600px) {
      
      width: 60%;
    }

  `;

