import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import CartPriceCard from '../CartPriceCard/CartPriceCard';

export default function CartListNotUser() {
    //localstorage에서 리스트 가져오기
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartsList')) || []);
    const totalPrice = cartList.length;
    return (
        <>
            <ul>
                {
                    cartList.map(item => (
                        <CartItem key={item.id} product={item} />
                    ))
                }
            </ul>
            <CartPriceCard totalPrice={totalPrice} />
        </>
    );
}

