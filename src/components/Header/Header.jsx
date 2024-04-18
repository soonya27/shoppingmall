import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import ShoppingbagIcon from '../ui/icons/ShoppingbagIcon';
import AllmenuIcon from './../ui/icons/AllMenuIcon';
import User from '../User/User';
import ModalPortal from '../ui/icons/ModalPortal';
import AllMenu from './../AllMenu/AllMenu';
import UserIcon from './../ui/icons/UserIcon';
import { getCartProduct } from '../../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContent } from '../../context/AuthContext';
import HeartIcon from './../ui/icons/HeartIcon';

export default function Header() {
    //로그인여부 체크 -> 아이디표시, 로그인 버튼 변화 , 장바구니 불러오기 (갯수 표시)
    //로그인 ok ->1.일반, 2. 어드민:메뉴 하나 추가(newProduct)

    const [allMenu, setAllMenu] = useState(false);
    const { user, uid, login } = useAuthContent();

    const {
        data: products
    } = useQuery({
        queryKey: ['carts', uid || ''],
        queryFn: () => getCartProduct(uid),
        enabled: !!uid
    })

    const cartList = user ? products : (JSON.parse(localStorage.getItem('cartsList')) || []);
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <button className={`${styles.button} ${styles.all_menu}`} onClick={() => setAllMenu(true)}>
                    <AllmenuIcon />
                </button>
                {
                    allMenu && (
                        <ModalPortal >
                            <AllMenu onClose={() => setAllMenu(false)}>
                                <ul>
                                    <li> <Link to="/products">
                                        Products
                                    </Link></li>
                                    {user?.isAdmin && (
                                        <li>
                                            <Link to="/products/new">New</Link>
                                        </li>
                                    )}
                                </ul>
                            </AllMenu>
                        </ModalPortal>
                    )
                }
                <h1>
                    <Link to="/">
                        <img src="/image/logo.png" alt="" />
                    </Link>
                </h1>

                <ul className={styles.navbar}>
                    {/* {user && ( */}
                    {user && <li><Link to='/bookmark' className={`${styles.menu_icon} ${styles.heart}`}><HeartIcon color='#000' bold /></Link></li>}
                    <li><Link to="/cart" className={styles.menu_icon}>
                        <ShoppingbagIcon />
                        {cartList && (<p className={styles.carts_length}>{cartList.length}</p>)}
                    </Link></li>
                    {user && <li><User user={user} /></li>}
                    {!user && <li><button className={styles.button} type="button" onClick={login}>
                        <UserIcon />
                    </button></li>}
                </ul>
            </div>

        </header>
    );
}

