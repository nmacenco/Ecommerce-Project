import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createAnswer } from '../../../redux/actions/productDetail';
import { State } from '../../../redux/reducers';
import Answer from './Answers';
import Styled from './QuestionStyle';

interface Prop {
    title: string,
    idA: number,
    body: string,
    answer: string,
    user: any
}


const Question = ({ title, body, answer, user, idA }: Prop): JSX.Element => {

    const [show, setShow] = useState<boolean>(false);
    const [reply, setReply] = useState<boolean>(false);
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch();



    const SendReply = (event: any) => {
        event.preventDefault();
        console.log(event.target.reply.value)
        let reply = event.target.reply.value;

        if (reply) {
            let userId = 1;
            console.log(idA);

            dispatch(createAnswer(idA, Number(id), userId, title, body, reply));
            console.log('despatch')

        } else {
            alert('FALTAN CAMPOS!');
        }

    }




    return (
        <Styled.container>

            <Styled.content>
                <header>
                    {title ? title : ''}
                </header>
                <main>
                    <div>
                        {body ? body : ''}
                    </div>
                    {console.log(user && !answer)}
                    {
                        user && user.role !== 'user' && !answer ?
                            <>
                                <button className='btn-reply' onClick={() => setReply(!reply)}>
                                    Reply
                                </button>
                                <form className={reply ? '' : 'close'} onSubmit={SendReply}>
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
                                        <Answer res={answer} />

                                    </div>
                                </>
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