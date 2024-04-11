import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import AddCartIcon from '../../components/ui/icons/AddCartIcon';
import Button from '../../components/ui/Button/Button';


export default function ProductDetail() {
    const { state: { product: { category, defaultImageUrl, hoverImageUrl, title, price, id, descripct, options } } } = useLocation();
    const [option, setOption] = useState(options[0]);
    const handleChange = (e) => setOption(e.target.value)
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
                                        <input type="radio" name="options" id={`option_${item}`} value={item} onChange={handleChange} checked={option === item} />
                                        <label htmlFor={`option_${item}`} >{item}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Button>
                        <p className={styles.btn_icon}><AddCartIcon /></p>Add Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

