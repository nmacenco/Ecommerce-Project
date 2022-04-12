import React from 'react';
import { RewieHeader, RewiewContainer, Rewiewstars, RewiewstarStatic } from './ReviewStyle';

const starsRating = [1, 2, 3, 4, 5]


interface Prop {
    name: string,
    texto: string,
    stars: number,
    title: string
}


const Rewies = ({ texto, stars, title, name }: Prop): JSX.Element => {


    return (
        <RewiewContainer className="card border-secondary mb-3" >
            <RewieHeader className="card-header">
                <div className='d-img-rewiew'>
                    {/* <div>
                        <img src='https://previews.123rf.com/images/pandavector/pandavector1704/pandavector170400314/75968328-avatar-de-un-hombre-en-una-camisa-avatar-y-cara-solo-icono-en-estilo-de-dibujos-animados-vector-s%C3%ADmb.jpg' />
                    </div> */}
                    <div>
                        {name ? name : 'anonymous'}
                    </div>
                </div>
                <RewiewstarStatic >

                    {starsRating.map((star, i) => {
                        let classe = (stars <= 0) ? 'dark-star' : 'rating';
                        stars--;

                        return (
                            <b className={classe} />
                        )
                    })}

                </RewiewstarStatic>
            </RewieHeader>
            <div className="card-body">
                <h4 className="card-title">{title ? title : ''}</h4>
                <p className="card-text">{texto ? texto : ''} </p>
            </div>
        </RewiewContainer>
    )
}


export default Rewies;