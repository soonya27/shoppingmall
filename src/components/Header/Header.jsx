import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import ShoppingbagIcon from '../ui/icons/ShoppingbagIcon';
import AllmenuIcon from './../ui/icons/AllMenuIcon';
import User from '../User/User';
import ModalPortal from '../ui/icons/ModalPortal';
import AllMenu from './../AllMenu/AllMenu';
import UserIcon from './../ui/icons/UserIcon';
import { useAuthContent } from '../../context/AuthContext';
import HeartIcon from './../ui/icons/HeartIcon';
import useCarts from '../../hooks/useCarts';

const allMenuList = [
    { text: 'Products', url: '/products', isAdmin: false, },
    { text: 'New', url: '/products/new', isAdmin: true, },
]

export default function Header() {
    //로그인여부 체크 -> 아이디표시, 로그인 버튼 변화 , 장바구니 불러오기 (갯수 표시)
    //로그인 ok ->1.일반, 2. 어드민:메뉴 하나 추가(newProduct)

    const [allMenu, setAllMenu] = useState(false);
    const { user, uid, login } = useAuthContent();
    const { pathname } = useLocation();

    const { cartQuery: {
        isLoading,
        error,
        data: products
    } } = useCarts(uid);

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
                                <ul className={styles.allmenu_list}>
                                    {/* <li><Link to="/products" className={`${pathname === '/products' ? styles.active : ''}`}>
                                        Products
                                    </Link></li>
                                    {user?.isAdmin && (
                                        <li>
                                            <Link to="/products/new">New</Link>
                                        </li>
                                    )} */}
                                    {
                                        allMenuList.map(({ text, url, isAdmin }) => {
                                            if (isAdmin && !user?.isAdmin) return;
                                            return (<li key={text}>
                                                <Link to={url} className={`${pathname === url ? styles.active : ''}`}>{text}</Link>
                                            </li>)
                                        })
                                    }
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

