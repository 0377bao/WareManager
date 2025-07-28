import React from 'react';
import classNames from 'classnames/bind';
import styles from './AuthPage.module.scss'

const cx = classNames.bind(styles)

const AuthPage = () => {
    return (
        <div className={cx('wrapper-auth')}>
            <h1>Auth Page</h1>
        </div>
    );
}

export default AuthPage;