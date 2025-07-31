import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Sidebar } from '../components';
import Header from '../components/Header';
import PageLayout from '../PageLayout';
import { Bot } from 'lucide-react';
import { ChatBox } from '@/components';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const [showChatBox, setShowChatBox] = useState(false);
    return (
        <div className={cx('wrapper-layout')}>
            <Header />
            <Sidebar />
            <div className={cx('container-content')}>
                <PageLayout>{children}</PageLayout>
            </div>

            <ChatBox classnames={'show'} isOpen={showChatBox} closed={() => setShowChatBox((prev) => !prev)}/>

            <button className={cx('btn-show-chat-box')} onClick={() => setShowChatBox((prev) => !prev)}>
                <Bot size={30} color={'white'}/>
                <p className={cx('title-chat-box')}>Trợ lý</p>
            </button>
        </div>
    );
};

export default DefaultLayout;
