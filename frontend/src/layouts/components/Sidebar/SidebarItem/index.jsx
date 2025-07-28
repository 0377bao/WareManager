import React from 'react';
import {Link} from 'react-router-dom'
import classNames from 'classnames/bind';
import styles from "./SidebarItem.module.scss"
import Icon from '../../../../components/Icon';

const cx = classNames.bind(styles)

const SidebarItem = ({title, iconName, path, location}) => {
    return (
        <Link to={`${path}`} className={cx('wrapper-link', {
            active: path == location
        })}>
            {iconName && <Icon name={iconName}/>}
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}

export default SidebarItem;
