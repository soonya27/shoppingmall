import React from 'react';
import styles from './Footer.module.css';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="inner">
                <ul className={styles.link}>
                    <li>이용약관</li>
                    <li>개인정보취급방침</li>
                    <li>CONTACT US</li>
                </ul>
                <h2><img src="/image/logo.png" alt="오아이오아이 로고" /></h2>
                <ul className={styles.sns}>
                    <li><img src="/image/footer_icon01.png" alt="페이스북" /></li>
                    <li><img src="/image/footer_icon02.png" alt="인스타그램" /></li>
                    <li><img src="/image/footer_icon03.png" alt="카카오톡" /></li>
                </ul>
                <p><span>COMPANY</span>Oi Studio CO,LTD</p>
                <p><span>CEO</span>YESEUL JUNG</p>
                <p><span>SERVICE CENTER</span>1600-6352<span>BUSINESS LICENSE</span>191-81-00440</p>
                <p>HR TEAM (Kdh.oioikoreaofficial@gmail.com) 채용문의 +82 070-4451-2248</p>
                <p>Copyright © O!Oi. All Rights Reserved.</p>
                <p className={styles.descript}>이 홈페이지는 포트폴리오용 사이트로 실제 서비스가 이루어지지 않습니다.</p>
            </div>
        </footer >
    );
}

