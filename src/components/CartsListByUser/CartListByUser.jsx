import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCartProduct } from '../../api/firebase';
import styles from './CartListByUser.module.css';
import CartItem from '../CartItem/CartItem';
import CartPriceCard from '../CartPriceCard/CartPriceCard';
import CartNotItem from '../CartNotItem/CartNotItem';


export default function CartListByUser({ uid }) {
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => getCartProduct(uid),
    });
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

