import React from 'react';
import styles from './Footer.module.css';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="inner">
                <ul className={styles.link}>
                    <li><a href="#">이용약관</a></li>
                    <li><a href="#">개인정보취급방침</a></li>
                    <li><a href="#">CONTACT US</a></li>
                </ul>
                <h2><a href="#"><img src="/image/logo.png" alt="오아이오아이 로고" /></a></h2>
                <ul className={styles.sns}>
                    <li><a href="#"><img src="/image/footer_icon01.png" alt="페이스북" /></a></li>
                    <li><a href="#"><img src="/image/footer_icon02.png" alt="인스타그램" /></a></li>
                    <li><a href="#"><img src="/image/footer_icon03.png" alt="카카오톡" /></a></li>
                </ul>
                <p><span>COMPANY</span>Oi Studio CO,LTD</p>
                <p><span>CEO</span>YESEUL JUNG</p>
                <p><span>SERVICE CENTER</span>1600-6352<span>BUSINESS LICENSE</span>191-81-00440</p>
                <p>HR TEAM (Kdh.oioikoreaofficial@gmail.com) 채용문의 +82 070-4451-2248</p>
                <p>Copyright © O!Oi. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

