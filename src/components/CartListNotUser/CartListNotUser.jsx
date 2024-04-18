import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import CartPriceCard from '../CartPriceCard/CartPriceCard';
import CartNotItem from '../CartNotItem/CartNotItem';

export default function CartListNotUser() {
    //localstorage에서 리스트 가져오기
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartsList')) || []);
    const totalPrice = cartList ? cartList.reduce((sum, curr) => sum + (parseInt(curr.product.price.replaceAll(',', '')) * curr.itemNum), 0) : 0;

    return (
        <>
            <ul>
                {
                    cartList.length != 0 ? (cartList.map(item => (
                        <CartItem key={item.id} product={item} />
                    ))) : (
                        <CartNotItem />
                    )

                }
            </ul>
            <CartPriceCard totalPrice={totalPrice} />
        </>
    );
}

