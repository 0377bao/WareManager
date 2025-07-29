import React, { Fragment } from 'react';
import {Link} from "react-router-dom"
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss'

const cx = classNames.bind(styles)

const MenuItem = ({title, Icon, path}) => {
    
    return (
        <Link className={cx('wrapper-menu-item')} to={`${path}`}>
            {Icon && <Icon className={cx('icon')} size={18}/>}
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}

export default MenuItem;
