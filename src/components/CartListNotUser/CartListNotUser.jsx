import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';

export default function CartListNotUser() {
    //localstorage에서 리스트 가져오기
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartsList')) || []);

    useEffect(() => {
        // setCartList()
    })
    return (
        <ul>
            {
                cartList.map(item => (
                    <CartItem key={item.id} product={item} />
                ))
            }
        </ul>
    );
}

