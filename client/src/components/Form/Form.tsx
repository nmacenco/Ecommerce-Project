import React from 'react';
import { ContainerLog, Content, LogForm } from "./SLogin";

interface Prop{
    title:string,
    children:JSX.Element | JSX.Element[]
}


const Form=({title,children}:Prop):JSX.Element=>{


    const sendLogin=(event:React.FormEvent)=>{
        event.preventDefault();

    }

    return(
        <ContainerLog>
            <LogForm onSubmit={sendLogin} autoComplete='off'>
                <header>{title ? title : 'FORM'}</header>
                <Content>
                    {children}
                </Content>
            </LogForm>
        </ContainerLog>
    )

}


export default Form;