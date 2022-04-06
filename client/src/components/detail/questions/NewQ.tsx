import React from "react";
import Styled from "./newForm";


const NewQ=():JSX.Element=>{


    const createBlock=(event:React.MouseEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log('envio de datos:');

    }

    return(
        <Styled.container>
            <h5 >
                Write the Question!😉
            </h5>

            <Styled.form onSubmit={createBlock} >
                <input type='text' placeholder="Title of the question!..."/>
                <textarea placeholder="Question..."/>
                <div>
                    <button>Save</button>
                </div>
            </Styled.form>
        </Styled.container>
    )

}

export default NewQ;