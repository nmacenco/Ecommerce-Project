import React from 'react';
import Styled from './QuestionStyle';

interface Prop{
    res:string
}

const Answer=({res}:Prop):JSX.Element=>{
    return(
        <Styled.container>
            {/* <div className='div-img'>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            </div> */}
            <Styled.response>
                {res ? res : ''}
            </Styled.response>
        </Styled.container>
    )

}

export default Answer;