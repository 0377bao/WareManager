import React, { useState } from 'react';
import { ModalEmployee, Button } from '@/components';


const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState({
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
    })

    return (
            <ModalEmployee isAdmin={false} data={currentUser} setData={setCurrentUser}/>  
    );
}

export default ProfilePage;
