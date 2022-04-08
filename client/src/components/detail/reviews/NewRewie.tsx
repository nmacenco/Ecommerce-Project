import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/reducers';
import { FormRewie } from './NewR';
import { RewieHeader, RewiewContainer, Rewiewstars } from './ReviewStyle';


const newRewie=():JSX.Element=>{

    const user=useSelector((state:State)=>state.user);


    return(
        <RewiewContainer className="card border-secondary mb-3" >
            <RewieHeader className="card-header">
                <div className='d-img-rewiew'>
                    <div>
                        <img src='https://www.iconninja.com/files/648/510/436/avatar-face-icon.png' />
                    </div>
                    <div>
                        {(user && user.name) ? user.name : 'nout found'}
                    </div>
                </div>
                <Rewiewstars >

                    <input type='radio' name='star' id='star1' /><label htmlFor='star1'>
                    </label>
                    <input type='radio' name='star' id='star2' /><label htmlFor='star2'>
                    </label>
                    <input type='radio' name='star' id='star3' /><label htmlFor='star3'>
                    </label>
                    <input type='radio' name='star' id='star4' /><label htmlFor='star4'>
                    </label>
                    <input type='radio' name='star' id='star5' /><label htmlFor='star5'>
                    </label>

                </Rewiewstars>
            </RewieHeader>
            <FormRewie className="card-body">
                <input type='text' placeholder='Title...' name='title'/>
                <textarea placeholder='Rewie...' name='body'>

                </textarea>
                <div className='buttons'>
                    <button>
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