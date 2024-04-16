import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCartProduct } from '../../api/firebase';
import styles from './CartListByUser.module.css';
import CartItem from '../CartItem/CartItem';


export default function CartListByUser({ uid }) {
    const {
        isLoading,
        error,
        data: products
    } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => getCartProduct(uid),
    });



    return (
        <ul className={styles.cart_list}>
            {
                products && products.map((product) => (
                    <CartItem product={product} key={product.id} uid={uid} />
                ))
            }
        </ul>
    );
}

