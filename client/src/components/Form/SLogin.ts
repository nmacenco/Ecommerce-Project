import styled from 'styled-components';


export const ContainerLog=styled.div`
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;


`

export const LogForm = styled.form`
         width: 340px;
         /* height: 80%; */
         background-color: #43494e;
         /* border-radius: 5px; */
         padding: 10px 20px;

         header {
           margin: 20px 10px;
           text-align: center;
           color: white;
           font-weight: bold;
           font-size: 1.2rem;
           text-transform: uppercase;
         }

         .div-inputs {
           display: flex;
           div:nth-child(1) {
             margin-right: 10px;
           }
         }
       `;

export const Content = styled.div`
         width: 96%;
         margin: 10px 2%;
         /* height: 300px; */

         input {
           width: 100%;
           margin: 15px 0px;
           background-clip: padding-box;
           border: 0 solid #ced4da;
           -webkit-appearance: none;
           -moz-appearance: none;
           appearance: none;
           padding: 11px 15px;
           outline: none;
         }
         input:focus {
           box-shadow: 0 0 0 0.25rem rgb(206 198 198 / 25%);
         }
         article {
           width: 96%;
           margin: 20px 2% 10px 2%;
           height: 50px;
           text-align: right;
           .button-links {
             padding: 8px 10px;
             margin-right: 10px;
           }
         }
       `;