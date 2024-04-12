import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import AddCartIcon from '../../components/ui/icons/AddCartIcon';
import Button from '../../components/ui/Button/Button';
import { addCartsByUser } from '../../api/firebase';
import { useAuthContent } from '../../context/AuthContext';


export default function ProductDetail() {
    const { state: { product, product: { category, defaultImageUrl, hoverImageUrl, title, price, id, descripct, options } } } = useLocation();
    const [option, setOption] = useState({ size: options[0], itemNum: 1 });
    const handleChange = (e) => setOption((prev => ({ ...prev, [e.target.name]: e.target.value })));
    const { user } = useAuthContent();

    const handleSubmit = () => {
        // console.log(option, id);
        //login 돼있으면 -> user 아이디..같이
        //아니라면 localstorage
        if (user) {
            addCartsByUser({
                id, size: option.size, itemNum: option.itemNum, user: user.uid,
                product
            });
        } else {
            //localStorage
            console.log('비로그인 장바구니담기')
        }
    }
    return (
        <div className='inner'>
            <div className={styles.container}>
                <div className={styles.imgWrap}>
                    <img src={hoverImageUrl} alt="" />
                </div>
                <div className={styles.txt}>
                    <div className={styles.descripct}>
                        <p>{`[${category}]`}</p>
                        <strong>{title}</strong>
                        <p>{price}원</p>
                        <p>{descripct}</p>
                        {/* <select name="options" id="" value={option} onChange={handleChange}>
                            {
                                options.map(item => (
                                    <option value={item} key={item} >{item}</option>
                                ))
                            }
                            <option value=""></option>
                        </select> */}
                        <div className={styles.options_wrap}>
                            <p>size : </p>
                            {
                                options.map((item, idx) => (
                                    <div key={item} className={styles.option}>
                                        <input type="radio" name="size" id={`option_${item}`} value={item} onChange={handleChange} checked={option.size === item} />
                                        <label htmlFor={`option_${item}`} >{item}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.item_size}>
                            <input type="number" name="itemNum" id="" value={option.itemNum} onChange={handleChange} />
                            <p>개</p>
                        </div>
                    </div>
                    <Button onClick={handleSubmit}>
                        <p className={styles.btn_icon}><AddCartIcon /></p>Add Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

