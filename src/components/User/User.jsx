import React, { useState } from 'react';
import styles from './User.module.css';
import { logout } from '../../api/firebase';
import LogoutIcon from './../ui/icons/LogoutIcon';
import { Link } from 'react-router-dom';


export default function User({ user: { photoURL, displayName } }) {
    const [popOpen, setPopOpen] = useState(false);
    return (
        <div className={styles.container} >
            <img src={photoURL} alt={displayName} onClick={() => setPopOpen(true)} />
            {
                popOpen && (
                    <>
                        <div className={styles.pop_bg} onClick={(e) => setPopOpen(false)}>
                        </div>
                        <div className={styles.pop_over}>
                            <p>{displayName}</p>
                            <Link to='/bookmark' >bookmark</Link>
                            <button className={styles.logoutBtn} type="button" onClick={logout}>
                                <span><LogoutIcon /></span>logout
                            </button>
                        </div>
                    </>
                )
            }
        </div >
    );
}

