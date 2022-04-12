import React, { useEffect, useState } from 'react';
import { getWish, Wish } from './typesWish';
import { DivButtons, WishContainer, WishGrid } from './whis';



const WishList = (): JSX.Element => {

    const [wishes, setWish] = useState<Wish[]>([]);


    useEffect(() => {

        getWish((data: Wish[]) => {
            console.log('LOS WISHES: ', data);
            setWish(data);
        });

    }, []);


    return (
        <WishContainer>
            <header>WishList</header>
            <WishGrid className={wishes.length ? '' : 'not-content'}>
                <span className='title'>Product</span>
                <span className='title'>Product name</span>
                <span className='title'>Price</span>
                <span className='title'>Status stock</span>
                <span className='title'>Actions</span>

                {/* Aca empizan los productos wajaja */}

                {
                    wishes.length ?

                        wishes.map((wish: Wish, i) => {
                            <>
                                <div className='item-borders'>
                                    <img src={wish.img} />
                                </div>
                                <div className='item-borders'><i>{wish.name}</i></div>
                                <div className='item-borders'><i>{wish.price}</i></div>
                                <div className='item-borders'><i>{wish.stock}</i></div>
                                <DivButtons className='item-borders'>
                                    <button>
                                        ADD CART
                                    </button>
                                    <button>
                                        REMOVE
                                    </button>
                                </DivButtons>


                            </>

                        })
                        :
                        <h3>NOT CONTENT</h3>
                }


                {/* // <div className='item-borders'>
                //     <img src='https://xiaomitiendaperu.com/wp-content/uploads/2020/12/Haylou-Smart-Watch-2-xiaomitiendaperu.jpg' />
                // </div>
                // <div className='item-borders'><i>SmartWatch</i></div>
                // <div className='item-borders'><i>20.00</i></div>
                // <div className='item-borders'><i>In stock</i></div>
                // <DivButtons className='item-borders'>
                //     <button>
                //         ADD CART
                //     </button>
                //     <button>
                //         REMOVE
                //     </button>
                // </DivButtons> */}

            </WishGrid>
        </WishContainer>
    )

}

export default WishList;