import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss'

const cx = classNames.bind(styles)

const Dashboard = () => {
    return (
        <div className={cx('wrapper-dashboard')}>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
