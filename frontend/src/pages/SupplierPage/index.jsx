import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MyTable, Button, Popper, Modal, ModalOrder } from '@/components';
import { Eye, PencilIcon } from 'lucide-react';
import styles from './SupplierPage.module.scss';
import globalStyle from '../../components/GlobalStyle/GlobalStyle.module.scss';
import Tippy from '@tippyjs/react';
import ModalUpdateSupplier from '../../components/ModalUpdateSupplier';
const cxGlobal = classNames.bind(globalStyle);

const cx = classNames.bind(styles);

const SupplierPage = () => {
    const [page, setPage] = useState(1);
    const [isOpenInfo, setIsOpenInfo] = useState(false);

    const columns = [
        {
            title: 'Mã NCC',
            dataIndex: 'supplierId',
            key: 'supplierId',
            width: '10%',
            ellipsis: true,
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'SDT',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            ellipsis: true,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: '30%',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Lịch sử GD',
            dataIndex: 'transactionHistory',
            key: 'transactionHistory',
            width: '10%',
            ellipsis: true,
            className: cx('transaction-history'),
            render: (_, record) => {
                return (
                    <div className={cxGlobal('action-table')}>
                        <Tippy content={'Xem chi tiết'} placement="bottom-end">
                            <button
                                className={cxGlobal('action-table-icon')}
                                onClick={() => console.log(record.customerId)}
                            >
                                <Eye size={20} />
                            </button>
                        </Tippy>
                        <Tippy content={'Chỉnh sửa'} placement="bottom-end">
                            <button className={cxGlobal('action-table-icon')} onClick={() => setIsOpenInfo(true)}>
                                <PencilIcon size={20} />
                            </button>
                        </Tippy>
                    </div>
                );
            },
        },
    ];

    const data = [
        {
            key: '1',
            supplierId: '1',
            name: 'Alice',
            phone: '123-456-7890',
            address: '123 Main St',
            email: 'alice@example.com',
            transactionHistory: <Button onClick={() => setIsOpenInfo(true)} small leftIcon={<Eye size={20} />} />,
        },
    ];

    const onChangePage = (page, pageSize) => {
        console.log(`Page: ${page}, Page Size: ${pageSize}`);
        setPage(page);
    };

    const closeModal = () => {
        setIsOpenInfo(false);
    };

    return (
        <div className={cx('wrapper-report')}>
            <div className={cx('header')}>
                <Popper>
                    <div>
                        {/* <span className={cx('title')}>Tên khách hàng</span>
                        <input type="text" className={cx('input')} placeholder="Nhập tên khách hàng" /> */}
                    </div>
                </Popper>
            </div>
            <div className={cx('content')}>
                <MyTable
                    currentPage={page}
                    columns={columns}
                    data={data}
                    pagination
                    pageSize={5}
                    onChangePage={onChangePage}
                />
            </div>
            <Modal showButtonClose={false} isOpenInfo={isOpenInfo} onClose={closeModal}>
                <ModalUpdateSupplier isOpenInfo={isOpenInfo} onClose={closeModal} />
            </Modal>
        </div>
    );
};

export default SupplierPage;
