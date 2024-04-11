import React, { useState } from 'react';
import { addNewProduct, getProduct } from '../../api/firebase';
import Title from './../../components/ui/Title/Title';
import styles from './AddProduct.module.css'
import UploadIcon from './../../components/ui/icons/UploadIcon';
import { uploadImage } from '../../api/uploader';
import Button from '../../components/ui/Button/Button';


const inputArr = ['default', 'hover'];
export default function AddProduct() {
    const [form, setForm] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        options: '',
    });
    //cloudnairy -> upload된 이미지 사용
    const [file, setFile] = useState({ default: '', hover: '' });
    // const handleClick = () => {
    //     addNewProduct();
    // }
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const fileValue = name === 'file_default' ? 'default' : 'hover';
            setFile(prev => ({ ...prev, [fileValue]: files[0] }));
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!file) return;
        if (!Object.values(file).every(item => item)) return;


        //cloudnary에 업로드 후 url획득 
        uploadImage(file.default)
            .then(defaultImageUrl => {
                uploadImage(file.hover)
                    .then(hoverImageUrl => {
                        console.log(defaultImageUrl, hoverImageUrl)
                        addNewProduct(form, { defaultImageUrl, hoverImageUrl });
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

