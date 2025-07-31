import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useLocation } from 'react-router-dom';
import { CircleUserRound, UserCircle2, LogOut, Bell } from 'lucide-react';
import { Menu, Notification } from '@/components';
import { Search } from '@/components';

const cx = classNames.bind(styles);

const Header = ({ children }) => {
    let location = useLocation();
    const viewPage = {
        '/': 'Dashboard',
        '/products': 'Sản phẩm',
        '/ware-receive': 'Nhập kho',
        '/ware-release': 'Xuất kho',
        '/check-inventory': 'Kiểm kê',
        '/report': 'Báo cáo',
        '/return-order': 'Đổi trả',
        '/auth': 'Phân quyền',
        '/product-error': 'Quản lý hàng lỗi',
        '/supplier': "Nhà cung cấp",
        '/ware-transfer': 'Chuyển kho',
        '/manage-warehouse': 'Quản lý kho',
    };

    const menuItems = [
        {
            title: 'Thông tin cá nhân',
            Icon: UserCircle2,
            path: '/profile',
        },
        {
            title: 'Đăng xuất',
            Icon: LogOut,
            path: '/login',
        },
    ];
    return (
        <div className={cx('wrapper-header')}>
            <div className={cx('left-header')}>
                <p className={cx('current-page')}>
                    Pages / <strong>{viewPage[location.pathname]}</strong>
                </p>
            </div>
            {children}
            <div className={cx('right-header')}>
                <Search />
                <div>
                    <Notification>
                        <Bell className={cx('icon-right-header')} size={26} />
                    </Notification>
                </div>

                <div>
                    {/** avatar */}
                    <Menu menuItems={menuItems}>
                        <CircleUserRound className={cx('icon-right-header')} size={26} />
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;
