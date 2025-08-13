import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthPage.module.scss';
import { Image, Button, ModalCreateAccount, ModalEmployee, ModelFilter } from '@/components';
import { MyTable } from '@/components';
import globalStyle from '../../components/GlobalStyle/GlobalStyle.module.scss';
import Tippy from '@tippyjs/react';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { styleMessage } from '../../constants';

const cx = classNames.bind(styles);
const cxGlobal = classNames.bind(globalStyle);
const tableColumns = [
    {
        title: 'Mã nhân viên',
        dataIndex: 'empId',
        key: 'empId',
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'empName',
        key: 'empName',
    },
    {
        title: 'CCCD',
        dataIndex: 'empCCCD',
        key: 'empCCCD',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'empDob',
        key: 'empDob',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'empPhone',
        key: 'empPhone',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'empAddress',
        key: 'empAddress',
    },
    {
        title: 'Ngày vào làm',
        dataIndex: 'empStartDate',
        key: 'empStartDate',
    },
    {
        title: 'Mã kho',
        dataIndex: 'warehouseId',
        key: 'warehouseId',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'empRole',
        key: 'empRole',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'empStatus',
        key: 'empStatus',
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            return (
                <div className={cxGlobal('action-table')}>
                    <Tippy content={'Xem lịch sử hoạt động'} placement="bottom-end">
                        <button className={cxGlobal('action-table-icon')} onClick={() => console.log(record.empId)}>
                            <Eye size={20} />
                        </button>
                    </Tippy>
                </div>
            );
        },
    },
];

const dataSource = [
    {
        key: '1',
        empId: 'NV001',
        empName: 'Nguyễn Văn A',
        empCCCD: '012345678901',
        empDob: '1990-01-01',
        gender: 'Nam',
        empPhone: '0901234567',
        empAddress: 'Hà Nội',
        empStartDate: '2020-05-01',
        warehouseId: 'K01',
        empRole: 'Quản trị viên',
        empStatus: 'Đang làm',
        empImage:
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784zzu/anh-mo-ta.png',
    },
    {
        key: '2',
        empId: 'NV002',
        empName: 'Trần Thị B',
        empCCCD: '012345678902',
        empDob: '1992-03-15',
        gender: 'Nữ',
        empPhone: '0902345678',
        empAddress: 'TP.HCM',
        empStartDate: '2021-06-15',
        warehouseId: 'K02',
        empRole: 'Nhân viên xuất hàng',
        empStatus: 'Đang làm',
        empImage:
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784zzu/anh-mo-ta.png',
    },
    {
        key: '3',
        empId: 'NV003',
        empName: 'Lê Văn C',
        empCCCD: '012345678903',
        empDob: '1995-07-20',
        gender: 'Nam',
        empPhone: '0903456789',
        empAddress: 'Đà Nẵng',
        empStartDate: '2022-01-10',
        warehouseId: 'K01',
        empRole: 'Nhân viên nhận hàng',
        empStatus: 'Nghỉ việc',
        empImage:
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784zzu/anh-mo-ta.png',
    },
    {
        key: '4',
        empId: 'NV004',
        empName: 'Phạm Thị D',
        empCCCD: '012345678904',
        empDob: '1998-12-05',
        gender: 'Nữ',
        empPhone: '0904567890',
        empAddress: 'Cần Thơ',
        empStartDate: '2023-03-01',
        warehouseId: 'K03',
        empRole: 'Quản lý kho',
        empStatus: 'Đang làm',
        empImage:
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784zzu/anh-mo-ta.png',
    },
    {
        key: '5',
        empId: 'NV005',
        empName: 'Đỗ Văn E',
        empCCCD: '012345678905',
        empDob: '2000-10-12',
        gender: 'Nam',
        empPhone: '0905678901',
        empAddress: 'Hải Phòng',
        empStartDate: '2024-01-20',
        warehouseId: 'K02',
        empRole: 'Kế toán',
        empStatus: 'Đang làm',
        empImage:
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784zzu/anh-mo-ta.png',
    },
];

const columnsFilter = [
    {
        id: 1,
        label: 'Mã nhân viên',
    },
    {
        id: 2,
        label: 'Số điện thoại',
    },
    {
        id: 3,
        label: 'Chức vụ',
    },
];

const resetData = {
        empId: '',
        empName: '',
        empCCCD: '',
        empDob: '',
        gender: '',
        empPhone: '',
        empAddress: '',
        empStartDate: '',
        warehouseId: '',
        empRole: '',
        empStatus: '',
        empImage: '',
    }

const AuthPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [action, setAction] = useState({
        add: false,
        update: false,
        createAccount: false,
    });

    const [empData, setEmpData] = useState(resetData);
    const [showModalAccount, setShowModalAccount] = useState(false)

    const rowSelection = {
        type: 'radio',
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setAction((prev) => ({
                add: false,
                update: true,
                createAccount: false,
            }));
            window.scrollTo(top);
        },
    };

    const handleAddEmployee = () => {
        // validate dữ liệu
        try {
            //call api thêm nhân viên
            toast.success('Thêm nhân viên mới thành công', styleMessage);
        } catch (err) {
            toast.error(err, styleMessage);
        }
    };

    const handleCloseModal = (key, value) => {
        if (key === 'update') {
            setSelectedRowKeys((prev) => []);
        }
        setAction((prev) => ({ ...prev, [key]: value }));
        setEmpData(resetData)
    };

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            console.log(selectedRowKeys);
            setEmpData(dataSource[Number.parseInt(selectedRowKeys[0]) - 1]);
        }
    }, [selectedRowKeys]);

    const handleUpdateEmployee = useCallback(async () => {
        try {
            // call api update employee
        } catch (err) {
            // throw err
        }
    }, []);

    const showModalCreateAccount = async () => {
        try{
            // call api check empId exist
            setShowModalAccount(prev => !prev)
        }catch(err) {
            toast.error('Vui lòng tạo nhân viên trước khi tạo tài khoản')
        }
    }

    return (
        <div className={cx('wrapper-auth')}>
            {action.add && (
                <ModalEmployee data={empData} isAdmin={true} onClose={() => handleCloseModal('add', false)} setData={setEmpData}>
                    <>
                        <Button primary onClick={handleAddEmployee}>
                        <span>Thêm nhân viên</span>
                    </Button>
                    <Button primary onClick={showModalCreateAccount}>
                        <span>Tạo tài khoản</span>
                    </Button>
                    </>  
                </ModalEmployee>
            )}
            {action.update && (
                <ModalEmployee isAdmin={true} data={empData} onClose={() => handleCloseModal('update', false)} setData={setEmpData}>
                    <Button primary onClick={handleUpdateEmployee}>
                        <span>Cập nhật</span>
                    </Button>
                </ModalEmployee>
            )}

            {/** Lọc theo điều kiện */}
            <ModelFilter columns={columnsFilter}>
                <Button primary onClick={() => handleCloseModal('add', true)} disabled={action.add}>
                    <span>Thêm nhân viên</span>
                </Button>
            </ModelFilter>

            <h1>Danh sách nhân viên</h1>
            <MyTable
                rowSelection={rowSelection}
                data={dataSource}
                columns={tableColumns}
                pageSize={10}
                pagination
                className={cx('my-table-employee')}
            ></MyTable>

            {showModalAccount && <ModalCreateAccount isOpen={showModalAccount} onClose={() => setShowModalAccount(prev => !prev)}/>}
        </div>
    );
};

export default AuthPage;
