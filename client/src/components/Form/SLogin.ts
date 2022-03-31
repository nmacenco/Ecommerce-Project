import styled from 'styled-components';


export const ContainerLog=styled.div`
    margin: auto;
    span.spa-open{
        border: none;
        background-color: none;
        text-transform: uppercase;
        cursor:pointer;
    }

`


export const LogModal = styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #978c8c6e;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 10;

`;

export const LogForm = styled.form`
         width: 320px;
         /* height: 80%; */
         background-color: #556c85;
         border-radius: 10px;
         padding: 10px;

         header {
           margin: 20px 10px;
           text-align: center;
           color: white;
           font-weight: bold;
           font-size: 1.2rem;
         }
         article {
           width: 96%;
           margin: 10px 2%;
           height: 50px;
           text-align: right;
           button {
             padding: 5px 10px;
             border-radius: 2px;
             margin-right: 10px;
           }
         }
      .div-inputs{
        display: flex;
        input:nth-child(1){
          margin-right: 10px;
        }
      }

`;

export const Content=styled.div`
    width: 96%;
    margin: 10px 2%;
    /* height: 300px; */

    input{
        border: none;
        outline: none;
        padding:20px 10px;
        margin: 10px 0px;
        width: 100%;
        height: 30px;
        border-radius: 5px;

    }

`