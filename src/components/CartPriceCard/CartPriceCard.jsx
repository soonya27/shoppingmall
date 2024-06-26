import React from 'react';
import styles from './CartPriceCard.module.css';
import Button from '../ui/Button/Button';
import { useModalContext } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContent } from '../../context/AuthContext';
import { removeCartAllNotUser } from '../../api/localStorage';
import useCarts from '../../hooks/useCarts';

const SHIPPING_PRICE = 3000;
export default function CartPriceCard({ totalPrice }) {
    const { modalOpen, setModalObj } = useModalContext();
    const navigate = useNavigate();
    const { uid } = useAuthContent();

    const { removeAllItem } = useCarts(uid);


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
                if (totalPrice === 0) {
                    modalOpen();
                    setModalObj({
                        title: '장바구니가 비어 있습니다.',
                        text: '제품 추가후 주문을 다시 해주세요.'
                    });
                    return;
                }
                navigate('/');
                if (uid) {
                    //user
                    removeAllItem.mutate();

                } else {
                    //not login
                    removeCartAllNotUser();
                }
                modalOpen();
                setModalObj({
                    title: '주문이 완료되었습니다.',
                    text: '장바구니가 초기화 됩니다.',
                    btnCallback: () => {
                        return new Promise(resolve => {
                            if (!uid) {
                                window.location.reload();
                            }
                            resolve();
                        })
                    }
                });
            }}>
                주문하기

            </Button>
        </div>
    );
}

