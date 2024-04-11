import React from 'react';
import styles from './Cart.module.css';
import { useAuthContent } from '../../components/context/AuthContext';
import CartListByUser from '../../components/CartsListByUser/CartListByUser';
import CartListNotUser from '../../components/CartListNotUser/CartListNotUser';

export default function Cart() {
    //카운트.. 삭제, 
    //불러오기  (user -> firebase  , !user -> localstorage)

    const { user } = useAuthContent();


    return (
        <div>
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
                    <CartListByUser uid={user.uid} />
                ) : (
                    <CartListNotUser />
                )
            }
            <div className={styles.footer}>
                <div className={styles.priceWrap}>
                    <div><p>상품총액</p>
                        <span></span>
                    </div>
                    <div>
                        <p>배송비</p>
                        <span></span>
                    </div>
                    <div>
                        <p>총가격</p>
                        <span></span>
                    </div>
                </div>
                <button type="button">주문하기</button>

            </div>
        </div>
    );
}

