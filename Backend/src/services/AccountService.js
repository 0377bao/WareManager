const db = require('../../models/index');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./JwtService');
const Account = db.Account;
const Employee = db.Employee;
const AccountRoles = db.AccountRoles;
const Role = db.Role;
const dotenv = require('dotenv');

dotenv.config();

const HTTP_OK = process.env.HTTP_OK;
const HTTP_NOT_FOUND = process.env.HTTP_NOT_FOUND;
const HTTP_UNAUTHORIZED = process.env.HTTP_UNAUTHORIZED;

class AccountService {
    checkEmailExists(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const accountFind = await Account.findAll({
                    where: {
                        email,
                    },
                });
                if (accountFind.length !== 0) {
                    resolve({
                        status: 'OK',
                        statusHttp: HTTP_OK,
                        message: 'Email already exists',
                        isExists: true,
                    });
                } else {
                    resolve({
                        status: 'OK',
                        statusHttp: HTTP_OK,
                        message: 'Email does not exist',
                        isExists: false,
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
    createAccount(newAccount) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    email,
                    password,
                    statusWork,
                    employeeName,
                    cccd,
                    dob,
                    phoneNumber,
                    gender,
                    image,
                    address,
                    startDate,
                    endDate,
                    roles,
                    warehouseId,
                } = newAccount;

                const accountFind = await Account.findAll({
                    where: {
                        phone,
                    },
                });
                if (accountFind.length !== 0) {
                    resolve({
                        status: 'ERR',
                        message: 'Phone number already exists',
                    });
                } else {
                    const hash = bcrypt.hashSync(password, 10);
                    const user = await User.create({
                        name: userName,
                        avatar,
                        dob,
                        gender,
                    });

                    const accessToken = await generateAccessToken({
                        userID: user.userID,
                        phone,
                    });

                    const refreshToken = await generateRefreshToken({
                        userID: user.userID,
                        phone,
                    });

                    const account = await Account.create({
                        phone,
                        password: hash,
                        refreshToken,
                        userID: user.userID,
                    });
                    resolve({
                        status: 'OK',
                        message: 'Create account successfully',
                        accessToken,
                        refreshToken,
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
    loginAccount(accountLogin) {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = accountLogin;

                const accountFind = await Account.findAll({
                    where: {
                        email,
                    },
                });
                if (accountFind.length === 0) {
                    resolve({
                        status: 'ERR',
                        message: 'Email does not exists',
                        statusHttp: HTTP_NOT_FOUND,
                    });
                } else {
                    const comparePassword = await bcrypt.compare(password, accountFind[0].password);
                    if (!comparePassword) {
                        resolve({
                            status: 'ERR',
                            message: 'Incorrect password',
                            statusHttp: HTTP_UNAUTHORIZED,
                        });
                    } else {
                        const roles = await AccountRoles.findAll({
                            where: {
                                accountID: accountFind[0].accountID,
                            },
                        });
                        console.log(roles);

                        const roleNames = await Promise.all(
                            roles.map((role) => Role.findOne({ where: { roleID: role.roleId } })),
                        );

                        console.log(roleNames);

                        if (!roleNames) {
                            resolve({
                                status: 'ERR',
                                message: 'Employee does not exist',
                                statusHttp: HTTP_NOT_FOUND,
                            });
                        }

                        const accessToken = await generateAccessToken({
                            employeeID: accountFind[0].employeeID,
                            email: accountFind[0].email,
                            role: roleNames.map((role) => role.roleName),
                        });

                        const refreshToken = await generateRefreshToken({
                            employeeID: accountFind[0].employeeID,
                            email: accountFind[0].email,
                            role: roleNames.map((role) => role.roleName),
                        });
                        resolve({
                            status: 'OK',
                            message: 'Login successfully',
                            statusHttp: HTTP_OK,
                            accessToken,
                            refreshToken,
                        });
                    }
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
}

module.exports = new AccountService();
