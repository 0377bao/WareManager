import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { MyTable, Modal, ModalOrder } from '@/components';
import styles from './HistoryPage.module.scss';
import ModelFilter from '../../components/ModelFilter';
import { filterProductQuantityLog } from '../../services/productquantitylog.service';
import { typeTransaction } from '../../constants';
import { convertDateVN } from '../../common';

const cx = classNames.bind(styles);

const HistoryPage = () => {
    const [page, setPage] = useState(1);
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [typeTransactionFilter, setTypeTransactionFilter] = useState('ALL');
    const [employeeCreateFilter, setEmployeeCreateFilter] = useState('');
    const [productFilter, setProductFilter] = useState('');
    const [listHistory, setListHistory] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const columns = [
        {
            title: 'Loại giao dịch',
            dataIndex: 'transactionType',
            key: 'transactionType',
            // width: '20%',
            ellipsis: true,
            render: (_, record) => {
                return <span>{typeTransaction[record.actionType]}</span>;
            },
        },
        {
            title: 'Số lượng trước',
            dataIndex: 'previousAmount',
            key: 'previousAmount',
            // width: '10%',
            ellipsis: true,
        },
        {
            title: 'Số lượng sau',
            dataIndex: 'newAmount',
            key: 'newAmount',
            // width: '30%',
            ellipsis: true,
        },
        {
            title: 'Số lượng thay đổi',
            dataIndex: 'quantityChange',
            key: 'quantityChange',
            // width: '20%',
            ellipsis: true,
        },
        {
            title: 'Mã giao dịch',
            dataIndex: 'referenceID',
            key: 'referenceID',
            // width: '10%',
            ellipsis: true,
        },
        {
            title: 'Ngày giao dịch',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // width: '10%',
            ellipsis: true,
            render: (_, record) => {
                return <span>{convertDateVN(record.createdAt)}</span>;
            },
        },
        {
            title: 'Người tạo giao dịch',
            dataIndex: 'employeeCreate',
            key: 'employeeCreate',
            // width: '10%',
            ellipsis: true,
            render: (index, record) => {
                let employee = null;
                if (record.orderPurchase) {
                    employee = record.orderPurchase.employee;
                } else if (record.orderRelease) {
                    employee = record.orderRelease.employees;
                } else if (record.inventoryCheck) {
                    employee = record.inventoryCheck.employee;
                }
                return <span>{employee?.employeeName}</span>;
            },
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        },
    ];

    const onChangePage = (page) => {
        setPage(page);
    };

    const handleSubmitFilter = () => {
        fetchData();
    };

    const columnsFilter = [
        {
            id: 'startDate',
            label: 'Từ ngày',
            value: startDateFilter,
            setValue: setStartDateFilter,
            type: 'date',
        },
        {
            id: 'endDate',
            label: 'Đến ngày',
            value: endDateFilter,
            setValue: setEndDateFilter,
            type: 'date',
        },
        {
            id: 'employeeCreate',
            label: 'Người tạo giao dịch',
            value: employeeCreateFilter,
            setValue: setEmployeeCreateFilter,
        },
        {
            id: 'product',
            label: 'Mã sản phẩm',
            value: productFilter,
            setValue: setProductFilter,
        },
    ];

    const selectInput = [
        {
            label: 'Loại giao dịch',
            value: typeTransactionFilter,
            option: [
                {
                    name: 'Tất cả',
                    value: 'ALL',
                },
                {
                    name: 'Nhập hàng',
                    value: 'PURCHASE',
                },
                {
                    name: 'Xuất hàng',
                    value: 'RELEASE',
                },
                {
                    name: 'Kiểm kê',
                    value: 'INVENTORY_CHECK',
                },
            ],
            setValue: (value) => setTypeTransactionFilter(value),
        },
    ];

    const fetchData = async () => {
        // Fetch data logic here
        const res = await filterProductQuantityLog({
            dateFrom: startDateFilter,
            dateTo: endDateFilter,
            actionType: typeTransactionFilter == 'ALL' ? '' : typeTransactionFilter,
            employeeCreate: employeeCreateFilter,
            productID: productFilter,
            page: page,
        });

        if (res.data?.status === 'OK') {
            setListHistory(res.data?.data || []);
            setTotalPage(res.data?.pagination?.totalPages || 0);
        }
    };

    useEffect(() => {
        // Fetch initial data if needed
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className={cx('wrapper-report')}>
            <div className={cx('header')}>
                <ModelFilter
                    handleSubmitFilter={handleSubmitFilter}
                    handleResetFilters={() => {
                        setStartDateFilter('');
                        setEndDateFilter('');
                        setTypeTransactionFilter('ALL');
                        setEmployeeCreateFilter('');
                        setProductFilter('');
                        setPage(1);
                        fetchData();
                    }}
                    selectInput={selectInput}
                    columns={columnsFilter}
                />
            </div>
            <div className={cx('content')}>
                <MyTable
                    currentPage={page}
                    columns={columns}
                    data={listHistory}
                    pagination
                    total={totalPage * 5}
                    pageSize={5}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    );
};

export default HistoryPage;
