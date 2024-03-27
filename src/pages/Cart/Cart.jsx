import React from 'react';
import styles from './Cart.module.css';

export default function Cart() {
    //카운트.. 삭제, 
    //주문하기 -> products list 업데이트 서버에 보내기

    return (
        <div>
            <h2>내 장바구니</h2>
            <ul className={styles.listWrap}>
                <li></li>
            </ul>
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

