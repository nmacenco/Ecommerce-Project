import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { addProductCart, addProductOrder } from '../../../redux/actions/cart';
import { deleteWish, getWish } from '../../../redux/actions/products';
import { State } from '../../../redux/reducers';
import { WishContainer, WishGrid } from './whis';


const WishList = (): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const wishes = useSelector((state: State) => state.products.wishList);
    const products = useSelector((state: State) => state.products.copyProducts);

    useEffect(() => {
        if (user && !wishes.length) {
            alert('Traendo los wishes')
            dispatch(getWish(user!.token));
        }
    }, [])

    const WishDelete = (event: any) => {
        if (user) {
            dispatch(deleteWish(event.target.id, user!.token));
        }
    }

    const addProductToCart = (event: any) => {
        let index = event.target.id;
        console.log('ID_PRODUCT: ', index);
        console.log('ALL PRODUCTS: ', products);

        const encountered = products.find(product => product.id === Number(index));
        console.log('PRODUCTO ENCONTRADO?: ', encountered);
        if (encountered) {
            const productToAdd = {
                productId: encountered.id,
                productName: encountered.name,
                price: encountered.price,
                image: encountered.image,
                stock: encountered.stock,
                quantity: 1
            }
            productToAdd.quantity = 1;
            dispatch(addProductCart(productToAdd));
            user && productToAdd.productId && dispatch(addProductOrder(user!.token, productToAdd.productId))
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
            alert('The product does not exist')
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
                </tbody>
            </WishGrid>
        </WishContainer >
    )
}
export default WishList;