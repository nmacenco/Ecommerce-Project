import React from 'react';
import { RewieHeader, RewiewContainer, Rewiewstars, RewiewstarStatic } from './ReviewStyle';

const starsRating = [1, 2, 3, 4, 5]


interface Prop{
    name:string,
    img:string,
    stars:number
}


const Rewies = ({name,img,stars}:Prop): JSX.Element => {


    // const printStars=(number:number)=>{


    //     for(let i=0;i<= number ; i++){

    //     }
        
    // }
    let countStars=0;

    const handleClick=(event:any)=>{

        event.preventDefault();
        console.log(event.target);

    }

    return (
        <RewiewContainer className="card border-secondary mb-3" >
            <RewieHeader className="card-header">
                <div className='d-img-rewiew'>
                    <div>
                        <img src='https://previews.123rf.com/images/pandavector/pandavector1704/pandavector170400314/75968328-avatar-de-un-hombre-en-una-camisa-avatar-y-cara-solo-icono-en-estilo-de-dibujos-animados-vector-s%C3%ADmb.jpg' />
                    </div>
                    <div>
                        {name?  name :'not found'}
                    </div>
                </div>
                <RewiewstarStatic >

                    {starsRating.map((star, i) => {
                        console.log(star)
                        let classe = (countStars === stars) ? 'dark-star' : 'rating';
                        console.log(classe,stars)
                        countStars++;

                        return (
                            <b className={classe}/>
                        )
                    })}
                    
                </RewiewstarStatic>
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