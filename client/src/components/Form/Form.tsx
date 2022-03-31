import React, { useState } from 'react';
import { ContainerLog, Content, LogForm, LogModal } from "./SLogin";

interface Prop{
    title:string,
    children:JSX.Element | JSX.Element[]
}


const Form=({title,children}:Prop):JSX.Element=>{

    const [visible,setVisible]=useState<boolean>(false);



    const changeVisible=(event:React.MouseEvent)=>{
        event.preventDefault();
        setVisible(!visible)
    }

    const sendLogin=(event:React.FormEvent)=>{
        event.preventDefault();
        console.log('envio de datos wajwjajw');

    }

    return(
        <ContainerLog>
            <span onClick={changeVisible} className='spa-open'>
                {title? title : 'FORM'}
            </span>
            {
                visible ?
                    <LogModal>
                        <LogForm onSubmit={sendLogin}>
                            <header>{title ? title : 'FORM'}</header>
                            <Content>
                                {children}
                            </Content>
                            <article>
                                <button className='btn btn-success'>
                                    Submit
                                </button>
                                <button className='btn btn-secondary' onClick={changeVisible}>
                                    Close
                                </button>
                            </article>

                        </LogForm>
                    </LogModal>
                :
                null
            }
        </ContainerLog>
    )

}


export default Form;