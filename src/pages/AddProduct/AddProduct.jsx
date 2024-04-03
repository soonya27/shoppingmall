import React, { useState } from 'react';
import { addNewProduct, getProduct } from '../../api/firebase';
import Title from './../../components/ui/Title/Title';
import styles from './AddProduct.module.css'
import UploadIcon from './../../components/ui/icons/UploadIcon';
import { uploadImage } from '../../api/uploader';


export default function AddProduct() {
    const [form, setForm] = useState({
        file: '',
        title: '',
        price: '',
        category: '',
        description: '',
        options: '',
    });
    //cloudnairy -> upload된 이미지 사용
    const [file, setFile] = useState();
    // const handleClick = () => {
    //     addNewProduct();
    // }
    const handleClickGet = async () => {
        const data = await getProduct();
        console.log(data);
    }
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFile(files[0]);
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        //cloudnary에 업로드 후 url획득 
        // console.log(file)
        // console.log(form)
        uploadImage(file)
            .then(url => {
                console.log(url)
            })
    }
    return (
        <div className='inner'>
            <Title text="Products" highlight="Add New" />
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* 제품명 가격 카테고리 설명 옵션 */}
                {
                    file ? (
                        <div className={styles.preview_wrap}>
                            <img className={styles.preview} src={URL.createObjectURL(file)} alt="" />
                            <input type="file" name="file" id="fileUpload" accept='image/*' onChange={handleChange}
                                className={styles.file_upload_input} />
                            <label htmlFor="fileUpload" className={styles.file_upload_label}>
                                Upload
                            </label>
                        </div>
                    ) : (
                        <div className={styles.file_upload}>
                            <span>
                                <UploadIcon />
                            </span>
                            <p>Upload Image</p>
                            <input type="file" name="file" id="fileUpload" accept='image/*' onChange={handleChange}
                                className={styles.file_upload_input} />
                            <label htmlFor="fileUpload" className={styles.file_upload_label}>
                                Upload
                            </label>
                        </div>
                    )
                }

                <input type="text" placeholder='title' name='title' value={form.title} onChange={handleChange} required />
                <input type="text" placeholder='price' name='price' value={form.price} onChange={handleChange} required />
                <input type="text" placeholder='category' name='category' value={form.category} onChange={handleChange} required />
                <input type="text" placeholder='description' name='description' value={form.description} onChange={handleChange} required />
                <input type="text" placeholder='options' name='options' value={form.options} onChange={handleChange} required />
                <button type="submit"
                >
                    submit
                </button>
                <button type="button"
                    onClick={handleClickGet}>
                    조회
                </button>
            </form >

        </div >
    );
}

