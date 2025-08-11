class EmployeeDTO {
    constructor(data) {
        this.key= data.employeeID,
        this.empId= data.employeeID,
        this.empName= data.employeeName,
        this.empCCCD= data.cccd,
        this.empDob= data.dob,
        this.gender= data.gender,
        this.empPhone= data.phoneNumber,
        this.empAddress= data.address,
        this.empStartDate= data.startDate,
        this.warehouseId= data.warehouseId,
        this.empRole= data.role,
        this.empStatus= 'Đang làm',
        this.empImage= data.image
    }
}

export default EmployeeDTO