const { query, body } = require('express-validator');

const ALLOWED_ROLES = ['SYSTEM_ADMIN', 'WARE_MANAGER', 'STOCK_RECEIVER', 'STOCK_DISPATCHER', 'ACCOUNTANT'];

const checkEmailExists = [
    query('email').notEmpty().withMessage('Email là bắt buộc').bail().isEmail().withMessage('Email không hợp lệ'),
];

const checkSignUpValidate = [
    body('email').notEmpty().withMessage('Email là bắt buộc').bail().isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty()
        .withMessage('Mật khẩu là bắt buộc')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/)
        .withMessage('Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Xác nhận mật khẩu là bắt buộc')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Xác nhận mật khẩu không khớp');
            }
            return true;
        }),
    body('statusWork')
        .optional({ nullable: true, checkFalsy: true })
        .isIn(['active', 'inactive'])
        .withMessage('Trạng thái công việc phải là "active" hoặc "inactive"')
        .bail()
        .default('active'),
    body('employeeName')
        .notEmpty()
        .withMessage('Tên nhân viên là bắt buộc')
        .bail()
        .isString()
        .withMessage('Tên nhân viên phải là một chuỗi')
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage('Tên nhân viên phải có độ dài từ 2 đến 100 ký tự'),
    body('cccd')
        .notEmpty()
        .withMessage('CCCD là bắt buộc')
        .bail()
        .isString()
        .withMessage('CCCD phải là một chuỗi')
        .bail()
        .isLength(12)
        .withMessage('CCCD phải có độ dài 12 ký tự'),
    body('dob')
        .notEmpty()
        .withMessage('Ngày sinh là bắt buộc')
        .bail()
        .isDate()
        .withMessage('Ngày sinh không hợp lệ')
        .bail()
        .custom((value) => {
            const today = new Date();
            const dob = new Date(value);
            if (dob >= today) {
                throw new Error('Ngày sinh phải là trong quá khứ');
            }
            return true;
        }),
    body('phoneNumber')
        .notEmpty()
        .withMessage('Số điện thoại là bắt buộc')
        .bail()
        .isString()
        .withMessage('Số điện thoại phải là một chuỗi')
        .bail()
        .isLength({ min: 10, max: 15 })
        .withMessage('Số điện thoại phải có độ dài từ 10 đến 15 ký tự')
        .bail()
        .custom((value) => {
            const regex = /^[0-9]+$/;
            if (!regex.test(value)) {
                throw new Error('Số điện thoại không hợp lệ');
            }
            return true;
        }),
    body('gender')
        .notEmpty()
        .withMessage('Giới tính là bắt buộc')
        .bail()
        .isIn(['male', 'female', 'other'])
        .withMessage('Giới tính không hợp lệ'),
    body('image')
        .notEmpty()
        .withMessage('Hình ảnh là bắt buộc')
        .bail()
        .isURL()
        .withMessage('Hình ảnh phải là một URL hợp lệ'),
    body('address')
        .notEmpty()
        .withMessage('Địa chỉ là bắt buộc')
        .bail()
        .isString()
        .withMessage('Địa chỉ phải là một chuỗi')
        .bail()
        .isLength({ min: 5, max: 200 })
        .withMessage('Địa chỉ phải có độ dài từ 5 đến 200 ký tự'),
    body('startDate')
        .notEmpty()
        .withMessage('Ngày bắt đầu là bắt buộc')
        .bail()
        .isDate()
        .withMessage('Ngày bắt đầu không hợp lệ')
        .bail()
        .custom((value) => {
            const today = new Date();
            const startDate = new Date(value);
            if (startDate < today) {
                throw new Error('Ngày bắt đầu phải là trong tương lai');
            }
            return true;
        }),
    body('endDate')
        .isDate()
        .withMessage('Ngày kết thúc không hợp lệ')
        .bail()
        .custom((value, { req }) => {
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(value);
            if (endDate <= startDate) {
                throw new Error('Ngày kết thúc phải sau ngày bắt đầu');
            }
            return true;
        }),
    body('roles')
        .isArray({ min: 1 })
        .withMessage('Danh sách vai trò là bắt buộc và phải là mảng')
        .bail()
        .custom((roles) => {
            console.log(roles);

            const invalidRoles = roles.filter((role) => !ALLOWED_ROLES.includes(role.roleName));
            if (invalidRoles.length > 0) {
                throw new Error(`Các vai trò không hợp lệ: ${invalidRoles.join(', ')}`);
            }
            return true;
        }),
    body('warehouseId').notEmpty().withMessage('Warehouse ID là bắt buộc').bail(),
    // .isMongoId()
    // .withMessage('Warehouse ID không hợp lệ'),
];

const checkSignInValidate = [
    body('email').notEmpty().withMessage('Email là bắt buộc').bail(),
    body('password').notEmpty().withMessage('Mật khẩu là bắt buộc').bail(),
];

module.exports = {
    checkEmailExists,
    checkSignUpValidate,
    checkSignInValidate,
};
