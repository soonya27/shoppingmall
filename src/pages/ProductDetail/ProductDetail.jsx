import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import AddCartIcon from '../../components/ui/icons/AddCartIcon';
import Button from '../../components/ui/Button/Button';
import { useAuthContent } from '../../context/AuthContext';
import ArrowBackIcon from '../../components/ui/icons/ArrowBackIcon';
import { useModalContext } from '../../context/ModalContext';
import { addOrUpdateToCartNotUser } from '../../api/localStorage';
import useCarts from '../../hooks/useCarts';


export default function ProductDetail() {
    const { state: { product, product: { category, defaultImageUrl, hoverImageUrl, title, price, id, descripct, options } } } = useLocation();
    const [option, setOption] = useState({ size: options[0], itemNum: 1 });
    const handleChange = (e) => setOption((prev => ({ ...prev, [e.target.name]: e.target.value })));
    const { user, uid } = useAuthContent();
    const navigate = useNavigate();
    const { modalOpen, setModalObj } = useModalContext();

    const { addOrUpdateToItem } = useCarts(uid);


    const handleSubmit = async () => {
        if (user) {
            //user
            addOrUpdateToItem.mutate({
                id, size: option.size, itemNum: option.itemNum, user: user.uid,
                product
            });

        } else {
            //not login
            addOrUpdateToCartNotUser({
                id, size: option.size, itemNum: option.itemNum,
                product
            });
        }

        //완료 후
        setModalObj({
            title: '장바구니 담기 완료.',
            text: '장바구니 목록에서 확인 가능합니다.',
            btnCallback: () => {
                // return new Promise(resolve => setTimeout(() => {
                //     console.log('loading....');
                //     window.location.reload();
                //     resolve();
                // }, 0))
                return new Promise(resolve => {
                    if (!user) {
                        window.location.reload();
                    }
                    resolve();
                })
            }
        })
        modalOpen();
    }
    const handleClick = (e) => {
        navigate(-1);
    }
    return (
        <div className='inner'>
            <div className={styles.navbar}>
                <button type='button' onClick={handleClick} className={styles.btn_back}><ArrowBackIcon /></button>
            </div>
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
                            <input type="number" name="itemNum" id="" value={option.itemNum} onChange={handleChange} min={1} onKeyDown={(e) => e.preventDefault()} />
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

