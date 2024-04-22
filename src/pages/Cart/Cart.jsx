import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import CartListByUser from '../../components/CartsListByUser/CartListByUser';
import CartListNotUser from '../../components/CartListNotUser/CartListNotUser';
import { useAuthContent } from '../../context/AuthContext';
import Title from '../../components/ui/Title/Title';


export default function Cart() {
    //불러오기  (user -> firebase  , !user -> localstorage)

    const { user, uid } = useAuthContent();
    return (
        <div className='inner'>
            <Title highlight='MY CART' text='' />
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

