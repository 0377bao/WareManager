import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';

const cx = classNames.bind(styles);

const ChatBox = ({ classnames, isOpen }) => {
    return (
        <div
            className={cx('chat-box', {
                [classnames]: isOpen,
            })}
        >
            <h1 className={cx('header-chat-box')}>Trợ lý thông minh</h1>
            <div className={cx('content-chat-box')}>Nội dung</div>
            {/*input search chat box*/}
        </div>
    );
};

export default React.memo(ChatBox);
