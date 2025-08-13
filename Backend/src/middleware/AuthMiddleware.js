const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const HTTP_UNAUTHORIZED = process.env.HTTP_UNAUTHORIZED;
const HTTP_INTERNAL_SERVER_ERROR = process.env.HTTP_INTERNAL_SERVER_ERROR;
const HTTP_BAD_REQUEST = process.env.HTTP_BAD_REQUEST;
const HTTP_FORBIDDEN = process.env.HTTP_FORBIDDEN;

const authUser = async (req, res, next) => {
    try {
        const employeeID = req.body.employeeID ? req.body.employeeID : req.query.employeeID;
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    return res.status(HTTP_UNAUTHORIZED).json({
                        status: 'ERR',
                        message: 'Token là không hợp lệ',
                    });
                } else if (employeeID != user.payload.employeeID) {
                    return res.status(HTTP_FORBIDDEN).json({
                        status: 'ERR',
                        message: 'Employee ID không trùng với token',
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(HTTP_BAD_REQUEST).json({
                status: 'ERR',
                message: 'Token là bắt buộc',
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const authUserIsManager = async (req, res, next) => {
    try {
        const employeeID = req.body.employeeID ? req.body.employeeID : req.query.employeeID;
        const warehouseId = req.body.warehouseId ? req.body.warehouseId : req.query.warehouseId;
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(HTTP_UNAUTHORIZED).json({
                        status: 'ERR',
                        message: 'Token là không hợp lệ',
                    });
                } else if (employeeID != user.payload.employeeID) {
                    return res.status(HTTP_UNAUTHORIZED).json({
                        status: 'ERR',
                        message: 'Employee ID không trùng với token',
                    });
                } else if (user.payload.role !== 'SYSTEM_ADMIN' && user.payload.role !== 'WARE_MANAGER') {
                    return res.status(HTTP_FORBIDDEN).json({
                        status: 'ERR',
                        message: 'Bạn không có quyền truy cập tài nguyên này',
                    });
                } else if (user.payload.role == 'WARE_MANAGER' && user.payload.warehouseId !== warehouseId) {
                    return res.status(HTTP_FORBIDDEN).json({
                        status: 'ERR',
                        message: 'Bạn không có quyền truy cập kho này',
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(HTTP_BAD_REQUEST).json({
                status: 'ERR',
                message: 'Token is required',
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

module.exports = { authUser, authUserIsManager };
