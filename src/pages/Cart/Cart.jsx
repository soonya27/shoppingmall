import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import CartListByUser from '../../components/CartsListByUser/CartListByUser';
import CartListNotUser from '../../components/CartListNotUser/CartListNotUser';
import { useAuthContent } from '../../context/AuthContext';


export default function Cart() {
    //불러오기  (user -> firebase  , !user -> localstorage)

    const { user, uid } = useAuthContent();
    return (
        <div className='inner'>
            <h2>내 장바구니</h2>
            {
                user ? (
                    <CartListByUser uid={uid} />
                ) : (
                    <CartListNotUser />
                )
            }
        </div >
    );
}

