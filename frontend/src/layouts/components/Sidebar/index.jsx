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
    Truck,
    Warehouse,
    Factory,
    ShieldX,
    Info,
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
            title: 'Nhân sự',
            iconName: User,
            path: '/auth',
        },
        {
            title: 'Nhà cung cấp',
            iconName: Factory,
            path: '/supplier',
        },
        {
            title: 'Quản lý hàng lỗi',
            iconName: ShieldX,
            path: '/product-error',
        },
        {
            title: 'Chuyển kho',
            iconName: Truck,
            path: '/ware-transfer',
        },
        {
            title: 'Quản lý kho',
            iconName: Warehouse,
            path: '/manage-warehouse',
        },
    ];

    let location = useLocation();
    const warehouseName = 'HT WareSoft';

    const showInfoWarehouse = () => {};

    return (
        <div className={cx('wrapper-sidebar')}>
            <div className={cx('sidebar-content')}>
                <div className={cx('info-user')}>
                    <img src={logo} className={cx('logo-sidebar')} loading="lazy" />
                    <div className={cx('ware-brand')}>
                        <h1 className={cx('username')}>{warehouseName}</h1>
                        <Info className={cx('icon')} size={19} onClick={showInfoWarehouse} />
                    </div>
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
