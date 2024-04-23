import React, { useState } from 'react';
import { addNewProduct, getProduct } from '../../api/firebase';
import Title from './../../components/ui/Title/Title';
import styles from './AddProduct.module.css'
import UploadIcon from './../../components/ui/icons/UploadIcon';
import { uploadImage } from '../../api/uploader';
import Button from '../../components/ui/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useProducts from '../../hooks/useProducts';

const DEFAUT_FORM = {
    title: '',
    price: '',
    category: '',
    description: '',
    options: '',
}
const inputArr = ['default', 'hover'];
export default function AddProduct() {
    const [form, setForm] = useState(DEFAUT_FORM);
    const [file, setFile] = useState({ default: '', hover: '' });
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const fileValue = name === 'file_default' ? 'default' : 'hover';
            setFile(prev => ({ ...prev, [fileValue]: files[0] }));
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }))
    }

    //react query mutation(업로드후 바로 캐시 업데이트)
    // const queryClient = useQueryClient();
    // const addProduct = useMutation(
    //     {
    //         mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),
    //         mutationKey: ['products'],
    //         onSuccess: () => queryClient.invalidateQueries(['products'])
    //     }
    // );

    const { addProduct } = useProducts();


    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!file) return;
        if (!Object.values(file).every(item => item)) return;

        //cloudnary에 업로드 후 url획득 
        uploadImage(file.default)
            .then(defaultImageUrl => {
                uploadImage(file.hover)
                    .then(hoverImageUrl => {
                        // console.log(defaultImageUrl)
                        // addNewProduct(form, { defaultImageUrl, hoverImageUrl });
                        addProduct.mutate({
                            form, url: { defaultImageUrl, hoverImageUrl }
                        },
                            {
                                onSuccess: () => {
                                    console.log('성공적으로 추가');
                                    setForm(DEFAUT_FORM);
                                }
                            })
                    })
            })
    }
    return (
        <div className='inner'>
            <Title text="Products" highlight="Add New" />
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 제품명 가격 카테고리 설명 옵션 */}
                {
                    inputArr.map(input => {
                        return file[input] ? (
                            <div key={input}>
                                <h2>{input} image</h2>
                                <div className={styles.preview_wrap}>
                                    <img className={styles.preview} src={URL.createObjectURL(file[input])} alt="" />
                                    <input type="file" name={`file_${input}`} id={`fileUpload_${input}`} accept='image/*' onChange={handleChange}
                                        className={styles.file_upload_input} />
                                    <label htmlFor={`fileUpload_${input}`} className={styles.file_upload_label}>
                                        Upload
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div key={input}>
                                <h2>{input} image</h2>
                                <div className={styles.file_upload} key={input}>
                                    <span>
                                        <UploadIcon />
                                    </span>
                                    <p>Upload Image</p>
                                    <input type="file" name={`file_${input}`} id={`fileUpload_${input}`} accept='image/*' onChange={handleChange}
                                        className={styles.file_upload_input} />
                                    <label htmlFor={`fileUpload_${input}`} className={styles.file_upload_label}>
                                        Upload
                                    </label>
                                </div>
                            </div>
                        )
                    }
                    )
                }

                <input type="text" placeholder='title' name='title' value={form.title} onChange={handleChange} required />
                <input type="text" placeholder='price' name='price' value={form.price} onChange={handleChange} required />
                <input type="text" placeholder='category' name='category' value={form.category} onChange={handleChange} required />
                <input type="text" placeholder='description' name='description' value={form.description} onChange={handleChange} required />
                <input type="text" placeholder='options' name='options' value={form.options} onChange={handleChange} required />
                <Button type='submit'>submit</Button>
            </form >

        </div >
    );
}

