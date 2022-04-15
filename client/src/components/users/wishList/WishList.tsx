import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { addProductCart } from '../../../redux/actions/cart';
import { deleteWish, getWish } from '../../../redux/actions/products';
import { State } from '../../../redux/reducers';
import { WishContainer, WishGrid } from './whis';


let nombres = ['dikson', 'yampier', 'other nombre'];

const WishList = (): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const wishes = useSelector((state: State) => state.products.wishList);
    const products = useSelector((state: State) => state.products.products);

    const WishDelete = (event: any) => {

        // console.log(event.target.id)
        if (user) {
            dispatch(deleteWish(event.target.id, user!.token));
        }

    }
    useEffect(() => {
        if (user && !wishes.length) {
            dispatch(getWish(user!.token));
        }
    }, [])

    const addProductToCart = (event: any) => {

        let index = event.target.id;
        console.log('ID_PRODUCT: ', index);
        console.log('ALL PRODUCTS: ', products);

        const encountered = products.find(product => product.id === Number(index));
        console.log('PRODUCTO ENCONTRADO?: ', encountered);
        if (encountered) {
            // console.log('PRODUCT COUNT: ', encountered.count);
            encountered.count = 1;

            dispatch(addProductCart(encountered));
            dispatch(deleteWish(Number(index), user!.token, (error) => {

                if (error) {
                    swal({
                        text: "Oops! An error has occurred",
                        content: error,
                        icon: "error",
                    });
                } else {
                    swal({
                        title: "Success",
                        text: 'added to cart',
                        icon: "success",
                    });
                }

            }))
        } else {
            alert('The product not exist! 🤔')
        }

    }

    return (
        <WishContainer>
            <header>WishList</header>
            <WishGrid className={wishes.length ? '' : ''}>
                <tbody>
                    <tr>
                        <th className='title'><i>Product</i></th>
                        <th className='title'><i>Product name</i></th>
                        <th className='title'><i>Price</i></th>
                        <th className='title'><i>Status stock</i></th>
                        <th className='title'><i>Actions</i></th>
                    </tr>
                    {console.log(wishes)}

                    {
                        wishes.map((wish, i) => {
                            // console.log(wish)
                            return (
                                <tr key={wish.id.toString()}>
                                    <td className='item-borders'>
                                        <Link to={`/detail/${wish.id}`} className='anchor-wish'>
                                            <img src={wish.image} />
                                        </Link>
                                    </td>
                                    <td className='item-borders'><i>{wish.name.slice(0, 30)}</i></td>
                                    <td className='item-borders'><i>{wish.price}</i></td>
                                    <td className='item-borders'><i>{wish.stock ? 'In Stock' : 'Not stock'}</i></td>
                                    <td >
                                        <div className='items-buttons'>
                                            <button id={wish.id} onClick={addProductToCart}>
                                                ADD CART
                                            </button>
                                            <button onClick={WishDelete} id={wish.id.toString()}>
                                                REMOVE
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })
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
                </tbody>
            </WishGrid>
        </WishContainer >
    )

}

export default WishList;