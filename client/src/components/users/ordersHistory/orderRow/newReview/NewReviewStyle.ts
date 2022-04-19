
import styled from 'styled-components';

export const Container = styled.div`
max-width: 700px;
`

export const FormRewie = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    outline: none;
    padding: 5px 10px 2px 10px;
  }
  textarea {
    outline: none;
    padding: 5px 10px 2px 10px;
  }
  div.buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    margin: 5px 20px 0px 0px;

    button{
        margin-right: 20px;
        margin-top: 10px;
        border: none;
        padding: 5px 10px;
        outline: none;
    }
  }
`;