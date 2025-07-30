import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '../../Image';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper-header-menu')}>
            <Image
                classname={cx('image')}
                alt={'avatar'}
                src={
                    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT90awoHrzBfmnOsQ4zV_vU1kJmgxJsjALKNdHf4NOXeh0GclY1Wwo1LRWYmwt5y8UUDyL5Cpt1CpIiqhCyxZFPVa9nXbnRZnL5fVuiug'
                }
            />
            <div className={cx('header-content')}>
                <p className={cx('title')}>Van Nam</p>
                <p className={cx('user-id')}>ID: NV#213</p>
            </div>
        </div>
    );
};

export default Header;
