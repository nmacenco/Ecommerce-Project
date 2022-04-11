import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createRewie } from '../../../redux/actions/productDetail';
import { State } from '../../../redux/reducers';
import { FormRewie } from './NewR';
import { RewieHeader, RewiewContainer, Rewiewstars } from './ReviewStyle';


function returnStar(id:string){

    let star=id[id.length-1];
    // console.log(star);
    switch(star){
        case '1':
            return 5
        case '2':
            return 4
        case '3':
            return 3
        case '4':
            return 2;

        case '5':
            return 1;
    }
}


const newRewie=():JSX.Element=>{

    const user=useSelector((state:State)=>state.user);
    const [data, setData] = useState<number>();
    const dispatch=useDispatch();
    const { id } = useParams<{ id?: string }>();



    const SendRewie = (event: any) => {
        event.preventDefault();
        console.log('send del rewie');
        let title=event.target.title.value;
        let body=event.target.body.value;

        if(!title || !body || !data){
            alert('faltan datos weon');
        }else{
            console.log({title,body,data});
            let userId=1;
            
            dispatch(createRewie(title,body,Number(id),userId,data));
            console.log('se depacho la rewie');
        }
    }


    const CancelRewie = (event: any) => {
        event.preventDefault();
        console.log('reset');
    }

    const handleStar = (event: any) => {
        console.log(event.target.id);
        let star = returnStar(event.target.htmlFor);
        setData(star);
    }


    return(
        <RewiewContainer className="card border-secondary mb-3" >
            <RewieHeader className="card-header">
                <h5>
                        {(user && user.name) ? user.name : 'not found'}
                </h5>
                <Rewiewstars >

                    <input type='radio' name='star' id='star1' /><label htmlFor='star1' onClick={handleStar}>
                    </label>
                    <input type='radio' name='star' id='star2' /><label htmlFor='star2' onClick={handleStar}>
                    </label>
                    <input type='radio' name='star' id='star3' /><label htmlFor='star3' onClick={handleStar}>
                    </label>
                    <input type='radio' name='star' id='star4' /><label htmlFor='star4' onClick={handleStar}>
                    </label>
                    <input type='radio' name='star' id='star5' /><label htmlFor='star5' onClick={handleStar}>
                    </label>

                </Rewiewstars>
            </RewieHeader>
            <FormRewie className="card-body" onSubmit={SendRewie}>
                <input type='text' placeholder='Title...' name='title'/>
                <textarea placeholder='Review...' name='body'>

                </textarea>
                <div className='buttons'>
                    <button onClick={CancelRewie}>
                        Cancel
                    </button>
                    <button>
                        Save
                    </button>

                </div>
            </FormRewie>
        </RewiewContainer>
    )

}

export default newRewie;