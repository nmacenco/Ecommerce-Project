import styled from "styled-components";

const QuestionContainer = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  margin-bottom: 20px;
  /* display: grid;
    grid-template-columns: 10% 90%; */

  /* div.div-img{
        border: 3px solid blue;
        width: 100%;
        height: 70%;
        img{
            width: 100%;
            height: 100%;
        }

    } */
`;

const QuestionContent = styled.div`
  width: 100%;
  header {
    width: 100%;
    padding: 4px 10px;
    height: 36px;
    /* border: 2px solid #000; */
    box-sizing: border-box;
    font-size: 1.3rem;
    font-weight: bold;
  }
  main {
    width: 100%;
    height: calc(100% - 40px);
    /* border: 2px solid red; */
    padding: 10px;

    .btn-reply {
      margin: 10px 0px 0px 10px;
      border: none;
      padding: 7px 12px;
    }
  }

  form {
    /* border: 2px solid #f00; */
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    textarea{
      padding: 7px 5px;
      outline: none;

    }

    div {
      direction: rtl;

      button {
        border: none;
        margin: 10px 20px 0px 0px;
        padding: 5px 10px;
        font-weight: bold;
      }
    }
  }

  .close {
    padding: 0px;
    height: 0px;
    overflow: hidden;
    margin: 0px;
  }
`;

const ShowQuestions = styled.div`
  margin: 20px 15% 0% 5%;
  width: 80%;
  /* border: 2px solid blue; */
  padding-left:10px ;

  aside.show-answer {
    color: blue;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
  }

  
  
`;

const response = styled.article`
  width: 100%;
`;

const Styled = {
  container: QuestionContainer,
  content: QuestionContent,
  answers: ShowQuestions,
  response: response,
};

export default Styled;
