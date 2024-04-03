import React from 'react';
import styles from './Main.module.css';
import Visual from '../../components/Visual/Visual';
import Promotion from '../../components/Promotion/Promotion';
import NewProducts from '../../components/NewProducts/NewProducts';

export default function Main() {

    return (
        <main>
            <Visual />
            <Promotion />
            <NewProducts />
            <div className={styles.kakao}>
                <div className={`inner ${styles.inner}`}>
                    <strong>O!OiCOLLECTION KAKAO FRIEND</strong>
                    <p>오아이오아이 카카오 플러스 친구가 되시면
                        다양한 혜택을 받아보실 수 있습니다.</p>
                    <p className={styles.more}><a href="#">친추하기</a></p>
                </div>
            </div>
        </main>
    );
}

