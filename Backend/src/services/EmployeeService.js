const db = require('../../models');
const dotenv = require('dotenv');
const Employee = db.Employee;
const Account = db.Account;

dotenv.config();

const HTTP_OK = process.env.HTTP_OK;
const HTTP_NOT_FOUND = process.env.HTTP_NOT_FOUND;
const HTTP_INTERNAL_SERVER_ERROR = process.env.HTTP_INTERNAL_SERVER_ERROR;

class EmployeeService {
    findEmployee(employeeID) {
        return new Promise(async (resolve, reject) => {
            try {
                const employee = await Employee.findOne({
                    where: { employeeID },
                    include: [
                        {
                            model: Account,
                            as: 'account'
                        }
                    ]
                });

                const {account, ...response} = employee.toJSON()
                
                if (employee)
                    resolve({
                        status: 'OK',
                        statusHttp: HTTP_OK,
                        message: 'Lấy nhân viên thành công',
                        employee: {
                            ...response,
                            statusWork: account.statusWork
                        },
                    });
                else {
                    reject({
                        status: 'OK',
                        statusHttp: HTTP_NOT_FOUND,
                        message: 'Nhân viên không tồn tại',
                    });
                }
            } catch (err) {
                reject({
                    status: 'ERR',
                    statusHttp: HTTP_INTERNAL_SERVER_ERROR,
                    message: err,
                });
            }
        });
    }
}

module.exports = new EmployeeService();
