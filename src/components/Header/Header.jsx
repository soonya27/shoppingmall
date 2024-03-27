import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { login, onUserStateChange } from '../../api/firebase';
import ShoppingbagIcon from '../ui/icons/ShoppingbagIcon';
import AllmenuIcon from './../ui/icons/AllMenuIcon';
import User from '../User/User';

export default function Header() {
    //로그인여부 체크 -> 아이디표시, 로그인 버튼 변화 , 장바구니 불러오기 (갯수 표시)
    //로그인 ok ->1.일반, 2. 어드민:메뉴 하나 추가(newProduct)
    const [user, setUser] = useState();

    useEffect(() => {
        onUserStateChange((user) => {
            // console.log(user);
            setUser(user);
        });
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <button className={`${styles.button} ${styles.all_menu}`}>
                    <AllmenuIcon />
                </button>
                <h1>
                    <Link to="/">
                        <img src="/image/logo.png" alt="" />
                    </Link>
                </h1>

                <ul className={styles.navbar}>
                    <li>
                        <ul>
                            <li>
                                <Link to="/products">
                                    Products
                                </Link>
                            </li>
                        </ul>

                    </li>
                    {user && (
                        <li><Link to="/cart" className={styles.menu_icon}>
                            <ShoppingbagIcon />
                        </Link></li>
                    )}

                    {user?.isAdmin && (
                        <li>
                            <Link to="/products/new">New</Link>
                        </li>
                    )}
                    {user && <li><User user={user} /></li>}
                    {!user && <li><button className={styles.button} type="button" onClick={login}>Login</button></li>}
                </ul>
            </div>

        </header>
    );
}

