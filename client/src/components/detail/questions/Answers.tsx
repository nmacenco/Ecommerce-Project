import React from 'react';
import Styled from './QuestionStyle';


const Answer=():JSX.Element=>{
    return(
        <Styled.container>
            {/* <div className='div-img'>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            </div> */}
            <Styled.response>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem sequi,
                 amet incidunt expedita animi corporis ea officia doloribus cupiditate 
                praesentium illo voluptatem cum. Aperiam nobis cupiditate aspernatur dolores. 
                Eos, quos!
            </Styled.response>
        </Styled.container>
    )

}

export default Answer;