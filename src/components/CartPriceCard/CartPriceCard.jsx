import React, { useState } from 'react';
import styles from './CartPriceCard.module.css';
import Button from '../ui/Button/Button';
import { useModalContext } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContent } from '../../context/AuthContext';
import { removeCartAll } from '../../api/firebase';
import { useQueryClient } from '@tanstack/react-query';

const SHIPPING_PRICE = 3000;
export default function CartPriceCard({ totalPrice }) {
    const { modalOpen, setModalObj } = useModalContext();
    const navigate = useNavigate();
    const { uid } = useAuthContent();


    //query mutation
    const queryClient = useQueryClient();


    return (
        <div className={styles.footer}>
            <ul className={styles.priceWrap}>
                <li><p>상품총액</p>
                    <span>{`${totalPrice.toLocaleString('ko-KR')}`}</span>
                </li>
                <li>
                    <p>배송비</p>
                    <span>{`${SHIPPING_PRICE.toLocaleString('ko-KR')}`}</span>
                </li>
                <li>
                    <p>총가격</p>
                    <span>{`₩ ${(totalPrice + SHIPPING_PRICE).toLocaleString('ko-KR')}`}</span>
                </li>
            </ul>
            <Button onClick={() => {
                navigate('/');
                //cart 삭제..
                if (uid) {
                    removeCartAll(uid);
                    queryClient.invalidateQueries(['carts']);
                } else {
                    localStorage.removeItem('cartsList');
                }
                modalOpen();
                setModalObj({
                    title: '주문이 완료되었습니다.',
                    text: '장바구니가 초기화 됩니다.'
                });
            }}>
                주문하기

            </Button>
        </div>
    );
}

