import React from 'react';
import styles from './Cart.module.css';
import CartListByUser from '../../components/CartsListByUser/CartListByUser';
import CartListNotUser from '../../components/CartListNotUser/CartListNotUser';
import { useAuthContent } from '../../context/AuthContext';
import Button from '../../components/ui/Button/Button';

const SHIPPING_PRICE = 3000;
export default function Cart() {
    //불러오기  (user -> firebase  , !user -> localstorage)

    const { user, uid } = useAuthContent();

    return (
        <div className='inner'>
            <h2>내 장바구니</h2>
            <ul className={styles.listWrap}>
                {/* {
                    products && products.map(list => (
                        <li key={list.id}>{list.id}</li>
                    ))
                } */}
            </ul>
            {
                user ? (
                    <CartListByUser uid={uid} />
                ) : (
                    <CartListNotUser />
                )
            }
            <div className={styles.footer}>
                <ul className={styles.priceWrap}>
                    <li><p>상품총액</p>
                        <span></span>
                    </li>
                    <li>
                        <p>배송비</p>
                        <span>{SHIPPING_PRICE}</span>
                    </li>
                    <li>
                        <p>총가격</p>
                        <span></span>
                    </li>
                </ul>
                <Button onClick={() => { }}>
                    주문하기
                </Button>
            </div>
        </div >
    );
}

