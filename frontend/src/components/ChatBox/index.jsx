import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { X as XClosed } from 'lucide-react';


const cx = classNames.bind(styles);

const ChatBox = ({ classnames, isOpen, closed }) => {
    return (
        <div
            className={cx('chat-box', {
                [classnames]: isOpen,
            })}
        >
            <div className={cx('header-chat-box')}>
                <h1 className={cx('header-title')}>Trợ lý thông minh</h1>
                <button className={cx('btn-close-chat')} onClick={closed}>
                    <XClosed size={20}/>
                </button>
            </div> 
            <div className={cx('content-chat-box')}>Nội dung</div>
            {/*input search chat box*/}
        </div>
    );
};

export default React.memo(ChatBox);
