import React from 'react';
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
import { Sidebar } from '../components';
import Header from '../components/Header';
import PageLayout from '../PageLayout';

const cx = classNames.bind(styles)

const DefaultLayout = ({children}) => {
    return (
        <div className={cx('wrapper-layout')}>
            <Header/>
            <Sidebar/>
            <div className={cx('container-content')}>
                <PageLayout>
                    {children}
                </PageLayout>
            </div>
        </div>
    );
}

export default DefaultLayout;
