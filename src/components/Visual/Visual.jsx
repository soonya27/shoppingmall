import React from 'react';
import styles from './Visual.module.css';

export default function Visual({ item, item: { id, name }, item2, item2: { key } }) {
    console.log(item)
    console.log(id, name)
    console.log(item2)
    console.log(key)
    return (
        <>
        </>
        // <section className={styles.visual} style={{ backgroundImage: `url(${imgUrl})` }}>
        //     {children}
        // </section>
    );
}

