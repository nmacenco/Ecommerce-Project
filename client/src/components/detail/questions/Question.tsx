import React, { useState } from 'react';
import Answer from './Answers';
import Styled from './QuestionStyle';

interface Prop {
    title: string,
    body: string,
    answer: string,
    user: any

}


const Question = ({ title, body, answer, user }: Prop): JSX.Element => {

    const [show, setShow] = useState<boolean>(false);
    const [reply, setReply] = useState<boolean>(false);


    const FetchQuestion = (event: any) => {
        event.preventDefault();
        // console.log(event.target.reply.value)

    }


    return (
        <Styled.container>
            {/* <div className='div-img'>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            </div> */}

            <Styled.content>
                <header>
                    {title ? title : ''}
                </header>
                <main>
                    <div>
                        {body ? body : ''}
                    </div>
                    {
                        user ?
                            <>
                                <button className='btn-reply' onClick={() => setReply(!reply)}>
                                    Reply
                                </button>
                                <form className={reply ? '' : 'close'} onSubmit={FetchQuestion}>
                                    <textarea name="reply" placeholder='Reply...' ></textarea>
                                    <div>
                                        <button>
                                            Reply
                                        </button>
                                    </div>
                                </form></>
                            :
                            null
                    }

                    <Styled.answers>
                        {
                            answer ?
                                <>
                                    <aside className='show-answer' onClick={() => setShow(!show)}>
                                        View answers
                                    </aside>
                                    <div className={show ? '' : 'close'}>
                                        <Answer />
                                        <br />
                                        <Answer />
                                    </div></>
                                :
                                null
                        }
                    </Styled.answers>
                </main>

            </Styled.content>

        </Styled.container>
    )
}

export default Question;