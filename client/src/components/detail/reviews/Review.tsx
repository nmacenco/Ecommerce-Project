import React from 'react';
import { RewieHeader, RewiewContainer, Rewiewstars } from './ReviewStyle';

const Rewies = (): JSX.Element => {


    const handleClick=(event:any)=>{

        event.preventDefault();
        console.log(event.target);

    }

    return (
        <RewiewContainer className="card border-secondary mb-3" >
            <RewieHeader className="card-header">
                <div className='d-img-rewiew'>
                    <div>
                        <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                    </div>
                    <div>
                        Pedrito Suarez Valdez
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
            <div className="card-body">
                <h4 className="card-title">Title?</h4>
                <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequuntur hic alias deleniti earum ad ipsam libero odio aut voluptatem
                    enim, magnam quae repellat illum qui mollitia, cum neque tempora quam?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequuntur hic alias deleniti earum ad ipsam libero odio aut voluptatem
                    enim, magnam quae repellat illum qui mollitia, cum neque tempora quam?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequuntur hic alias deleniti earum ad ipsam libero odio aut voluptatem
                    enim, magnam quae repellat illum qui mollitia, cum neque tempora quam? </p>
            </div>
        </RewiewContainer>
    )
}


export default Rewies;