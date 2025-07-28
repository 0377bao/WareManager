import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import Icon from "../../../components/Icon"
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles)

const Header = ({children}) => {
    let location = useLocation();
    const viewPage = {
        '/': "Dashboard",
        '/products': 'Sản phẩm',
        '/ware-receive': 'Nhập kho',
        '/ware-release': 'Xuất kho',
        '/check-inventory': 'Kiểm kê',
        '/report': 'Báo cáo',
        '/return-order': 'Đổi trả',
        '/auth': 'Phân quyền',
        '/settings': 'Cài đặt'
    }
    return (
        <div className={cx('wrapper-header')}>
            <div className={cx('left-header')}>
                <p className={cx('current-page')}>Pages / <strong>{viewPage[location.pathname]}</strong></p>
            </div>
            {children}
            <div className={cx('right-header')}>
                <p className={cx('title')}>Welcome Admin</p>
                {/** avatar */}
               <Icon name={faCircleUser}/>
            </div>
        </div>
    );
}

export default Header;
