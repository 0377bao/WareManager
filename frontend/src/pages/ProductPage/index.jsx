import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductPage.module.scss'

const cx = classNames.bind(styles)

const ProductPage = () => {
    return (
        <div className={cx('wrapper-product')}>
            <h1>Products</h1>
        </div>
    );
}

export default ProductPage;
