import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalUpdateSupplier.module.scss';
import { Modal, Button } from '@/components';
const cx = classNames.bind(styles);

const ModalUpdateSupplier = ({ onClose }) => {
    return (
        <div className={cx('modal-content')}>
            <h2 className={cx('modal-title')}>Cập nhật nhà cung cấp</h2>
            <form className={cx('modal-form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="supplierId">Mã NCC</label>
                    <input type="text" id="supplierId" className={cx('form-input')} value={1} readOnly disabled />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="supplierName">Tên nhà cung cấp</label>
                    <input type="text" id="supplierName" className={cx('form-input')} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="supplierPhone">Số điện thoại</label>
                    <input type="text" id="supplierPhone" className={cx('form-input')} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="supplierAddress">Địa chỉ</label>
                    <input type="text" id="supplierAddress" className={cx('form-input')} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="supplierEmail">Email</label>
                    <input type="email" id="supplierEmail" className={cx('form-input')} />
                </div>
                <div className={cx('form-actions')}>
                    <Button primary type="submit" className={cx('btn-submit')}>
                        Cập nhật
                    </Button>
                    <Button primary type="button" className={cx('btn-cancel')} onClick={onClose}>
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ModalUpdateSupplier;
