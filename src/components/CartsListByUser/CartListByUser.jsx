import React from 'react';
import styles from './CartListByUser.module.css';
import CartItem from '../CartItem/CartItem';
import CartPriceCard from '../CartPriceCard/CartPriceCard';
import CartNotItem from '../CartNotItem/CartNotItem';
import useCarts from '../../hooks/useCarts';


export default function CartListByUser({ uid }) {
    const { cartQuery: {
        isLoading,
        error,
        data: products
    } } = useCarts(uid);

    const totalPrice = products ? products.reduce((sum, curr) => sum + (parseInt(curr.product.price.replaceAll(',', '')) * curr.itemNum), 0) : 0;

    return (
        <>
            <ul className={styles.cart_list}>
                {
                    products && ((products.length != 0) ? products.map((product) => (
                        <CartItem product={product} key={product.id} uid={uid} />
                    )) : (
                        <CartNotItem />
                    ))
                }
            </ul>
            <CartPriceCard totalPrice={totalPrice} />
        </>
    );
}

