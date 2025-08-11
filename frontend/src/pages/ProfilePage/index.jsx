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

    const handleUpdateProfile = async () => {
        try{
            // call api update profile
        }catch(err) {
            // throw err
        }
    }
    return (
    
            <ModalEmployee isAdmin={false} data={currentUser} setData={setCurrentUser}>
                    <Button primary onClick={handleUpdateProfile}>
                        <span>Cập nhật</span>
                    </Button>
            </ModalEmployee>
    );
}

export default ProfilePage;
