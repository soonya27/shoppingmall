import React, { useState } from 'react';
import styles from './CartItem.module.css';
import MinusIcon from '../ui/icons/MinusIcon';
import PlusIcon from '../ui/icons/PlusIcon';
import CloseIcon from '../ui/icons/CloseIcon';
import { useNavigate } from 'react-router-dom';
import { addOrUpdateToCart, removeFromCart } from '../../api/firebase';
import { useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCartNotUser, removeCartNotUser } from '../../api/localStorage';
import useCarts from '../../hooks/useCarts';



export default function CartItem({
    product: { id, product, product: { hoverImageUrl, options, title, price }, size, itemNum },
    uid,
}) {
    const defaultPrice = parseInt(price.replaceAll(',', ''));
    const [option, setOption] = useState({ size, itemNum, totalPrice: defaultPrice * parseInt(itemNum) });
    const handleChange = (e) => {
        setOption((prev => ({ ...prev, [e.target.name]: e.target.value })));
        //user
        if (uid) {
            addOrUpdateToCart({
                id, size: e.target.value, itemNum: option.itemNum, user: uid,
                product
            });
        } else {
            addOrUpdateToCartNotUser({
                id, size: e.target.value, itemNum: option.itemNum,
                product
            });
            window.location.reload();
        }
    };
    const navigate = useNavigate();
    const handleClickLink = () => {
        navigate(`/products/${id}`, { state: { product } });
    }

    const { addOrUpdateToItem, removeItem } = useCarts(uid);

    const handleMinus = () => {
        setOption(prev => {
            if (prev.itemNum == 1) return prev;
            const itemNum = parseInt(prev.itemNum) - 1;
            //user
            if (uid) {
                addOrUpdateToItem.mutate({
                    id, size: option.size, itemNum, user: uid,
                    product
                });

            } else {
                //not login
                addOrUpdateToCartNotUser({
                    id, size: option.size, itemNum,
                    product
                });
                window.location.reload();
            }

            return {
                ...prev, itemNum,
                totalPrice: (defaultPrice * itemNum)
            }
        });

    }

    const handlePlus = () => {
        setOption(prev => {
            const itemNum = parseInt(prev.itemNum) + 1;
            //user
            if (uid) {
                addOrUpdateToItem.mutate({
                    id, size: option.size, itemNum, user: uid,
                    product
                });

            } else {
                //not login
                addOrUpdateToCartNotUser({
                    id, size: option.size, itemNum,
                    product
                });
                window.location.reload();
            }

            return {
                ...prev, itemNum,
                totalPrice: (defaultPrice * itemNum)
            }
        }
        );
    }

    const handleDelete = () => {
        if (uid) {
            //user
            removeItem.mutate({
                uid, id
            });
        } else {
            //not login
            removeCartNotUser(id);
            window.location.reload();
        }


    }

    return (
        <li className={styles.list} >
            <img src={hoverImageUrl} alt="" onClick={handleClickLink} />
            <div className={styles.text_wrap}>
                <div className={styles.descript_wrap}>
                    <p className={styles.title}>{title}</p>
                    <p>size :      <select name="size" id="" value={option.size} onChange={handleChange}>
                        {
                            options.map(item => (
                                <option value={item} key={item} >{item}</option>
                            ))
                        }
                    </select></p>
                    <p className={styles.price}>{`₩ ${option.totalPrice.toLocaleString('ko-KR')}`}</p>
                </div>
                <div className={styles.itemNumInput_wrap}>
                    <button type='button' onClick={handleMinus}><MinusIcon /></button>
                    <input type="number" name="itemNum" id="" value={option.itemNum} onChange={handleChange} />
                    <button type='button' onClick={handlePlus}><PlusIcon /></button>
                </div>
            </div>
            <button type="button" onClick={handleDelete} className={styles.btn_close}><CloseIcon /></button>
        </li>
    );
}
