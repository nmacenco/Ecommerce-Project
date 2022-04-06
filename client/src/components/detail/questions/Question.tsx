import React, { useState } from 'react';
import Answer from './Answers';
import Styled from './QuestionStyle';

const Question = (): JSX.Element => {

    const [show, setShow] = useState<boolean>(false);

   

    return (
        <Styled.container>
            {/* <div className='div-img'>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            </div> */}

            <Styled.content>
                <header>
                    Title of the question
                </header>
                <main>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae id nesciunt,
                    quaerat qui facere veritatis repellat sapiente. Blanditiis dolores ducimus
                    excepturi natus nesciunt assumenda ut ratione officia quo exercitationem! Expedita?
                    <Styled.answers>
                        <aside className='show-answer' onClick={() => setShow(!show)}>
                            View answers
                        </aside>
                        {console.log('sho is: ',show)}
                        <div className={show ? '': 'close'}>
                            <Answer />
                            <br/>
                            <Answer />
                        </div>
                    </Styled.answers>
                </main>

            </Styled.content>

        </Styled.container>
    )
}

export default Question;