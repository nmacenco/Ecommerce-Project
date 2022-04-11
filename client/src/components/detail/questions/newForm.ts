import styled from 'styled-components';


const newContainer=styled.div`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;

    h5{
        padding: 5px 10px;
    }

    
    .form-closed{
        height: 0px;
        overflow: hidden;
        padding: 0px;
    }

`

const FormNew = styled.form`
  width: 100%;
  border: 2px solid lightgray;
  padding: 10px;
  display: flex;
  flex-direction: column;

  input {
    outline: none;
    border: none;
    padding-left: 10px;
    width: 50%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
  }
  /* input:focus {
    box-shadow: 0px 0px 0px 2px red;
  } */
  textarea {
    appearance: none;
    padding: 10px;
    /* border: none; */
    outline: none;
    height: 70px;
    border: 1px solid lightgray;
  }
  div {
    direction: rtl;
    button {
      padding: 5px 10px;
      margin: 5px 10px 0px 10px;
      border: none;
      outline: none;
      border: 1px solid lightgray;
    }
    button:focus {
      box-shadow: 0 0 0 0.25rem #cec6c68a;
    }
  }
`;


const Styled={
    container:newContainer,
    form:FormNew
}

export default Styled;