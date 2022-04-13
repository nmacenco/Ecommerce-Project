import styled from "styled-components";

const QuestionContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const QuestionContent = styled.div`
  width: 100%;
  header {
    width: 100%;
    padding: 4px 10px;
    height: 36px;
    box-sizing: border-box;
    font-size: 1.3rem;
    font-weight: bold;
  }
  main {
    width: 100%;
    height: calc(100% - 40px);
    padding: 10px;

    .btn-reply {
      margin: 10px 0px 0px 10px;
      border: none;
      padding: 7px 12px;
    }
  }

  form {
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
