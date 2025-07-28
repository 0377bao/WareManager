import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss'
import {Button} from "@/components"

const cx = classNames.bind(styles)

const Dashboard = () => {
    return (
        <div className={cx('wrapper-dashboard')}>
            <h1>Dashboard</h1>
            <Button rounded medium> Test </Button>
        </div>
    );
}

export default Dashboard;
