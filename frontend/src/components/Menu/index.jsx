import React from 'react';
import WrapperTippy from '../WrapperTippy';
import Popper from '../Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';


const cx = classNames.bind(styles);

const Menu = ({ children, menuItems = [] }) => {
    const renderMenuItem = (attrs) => {
        return (
            <div ref={attrs.ref} className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <Popper>
                    <Header/>
                    {menuItems.length > 0 &&
                        menuItems.map((item, index) => (
                            <MenuItem key={index} title={item.title} Icon={item.Icon} path={item.path} />
                        ))}
                </Popper>
            </div>
        );
    };

    return <WrapperTippy renderTooltip={renderMenuItem}>
             {children}
    </WrapperTippy>;
};

export default Menu;
