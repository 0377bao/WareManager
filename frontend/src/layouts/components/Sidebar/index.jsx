import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import {
    Settings,
    User,
    LayoutDashboard,
    ShoppingBasket,
    CircleArrowLeft,
    CircleArrowRight,
    ClipboardMinus,
    Undo2,
    CalendarCheck,
} from 'lucide-react';
import logo from '../../../assets/logo.png';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const sidebarMenu = [
        {
            title: 'Dashboard',
            iconName: LayoutDashboard,
            path: '/',
        },
        {
            title: 'Sản phẩm',
            iconName: ShoppingBasket,
            path: '/products',
        },
        {
            title: 'Nhập kho',
            iconName: CircleArrowRight,
            path: '/ware-receive',
        },
        {
            title: 'Xuất kho',
            iconName: CircleArrowLeft,
            path: '/ware-release',
        },
        {
            title: 'Kiểm kê kho',
            iconName: CalendarCheck,
            path: '/check-inventory',
        },
        {
            title: 'Báo cáo',
            iconName: ClipboardMinus,
            path: '/report',
        },
        {
            title: 'Đổi trả',
            iconName: Undo2,
            path: '/return-order',
        },
        {
            title: 'Phân quyền',
            iconName: User,
            path: '/auth',
        },
        {
            title: 'Cài đặt',
            iconName: Settings,
            path: '/settings',
        },
    ];

    let location = useLocation();
    return (
        <div className={cx('wrapper-sidebar')}>
            <div className={cx('sidebar-content')}>
                <div className={cx('info-user')}>
                    <img src={logo} className={cx('logo-sidebar')} loading="lazy" />
                    <h1 className={cx('username')}>Nguyen Van Minh</h1>
                </div>
                <div className={cx('sidebar-list')}>
                    {sidebarMenu.map((item, index) => (
                        <SidebarItem
                            key={index}
                            title={item.title}
                            iconName={item.iconName}
                            path={item.path}
                            location={location.pathname}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
