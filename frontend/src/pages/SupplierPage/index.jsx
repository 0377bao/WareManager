import React from 'react';
import classNames from "classnames/bind"
import styles from "./SupplierPage.module.scss"

const cx = classNames.bind(styles)

const SupplierPage = () => {
    return (
        <div className={cx('wrapper-supplier')}>
            <h1>Supplier</h1>
        </div>
    );
}

export default SupplierPage;
