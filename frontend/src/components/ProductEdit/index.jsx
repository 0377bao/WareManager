import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductEdit.module.scss';
import Modal from '../Modal';
import Button from '../Button';
import toast from "react-hot-toast"

const cx = classNames.bind(styles);

const ProductEdit = ({ data, onClose }) => {
    const [productData, setProductData] = useState({
        productName: data.productName,
        productUnit: data.unit,
        productMinStock: data.minStock
    })

    const handleUpdateProduct = async () => {
        try{
            // call api
        }catch(err) {
            toast.error(err)
        }
    }

    return (
        <Modal className={cx('modal-edit-product')} isOpenInfo={true} onClose={onClose}>
            <div className={cx('wrapper-product-edit')}>
                <h1>Sửa sản phẩm</h1>
                <div className={cx('form-control')}>
                    <label htmlFor="productName">* Tên sản phẩm</label>
                    <input type='text' className={cx("productName")} value={productData.productName} onChange={(e) => setProductData(prev => ({...prev, productName: e.target.value}))}/>
                </div>  
                <div className={cx('form-control')}>
                    <label htmlFor="productUnit">* Đơn vị tính</label>
                    <select className={cx("unit-product")} onChange={(e) => setProductData(prev => ({...prev, productUnit: e.target.value}))} defaultValue={productData.productUnit}>
                        {["hộp", "lon", "gói", "cái"].map((item, index) => {
                           return <option key={index} value={item}>{item}</option>})
                    }
                    </select>
                </div>
                 <div className={cx('form-control')}>
                    <label htmlFor="productMinStock">* Tồn kho tối thiểu</label>
                    <input type='number' className={cx("productMinStock")} value={productData.productMinStock} onChange={(e) => setProductData(prev => ({...prev, productMinStock: e.target.value}))}/>
                </div> 
                <Button className={cx('btn-update')} onClick={handleUpdateProduct}>
                    <span className={cx('title-btn')}>Cập nhật</span>
                </Button>
            </div>
        </Modal>
    );
};

export default ProductEdit;
