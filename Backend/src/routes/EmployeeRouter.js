const express = require('express');
const { authUser } = require('../middleware/AuthMiddleware');
const validate = require('../validates/validate');
const EmployeeController = require('../controllers/EmployeeController');
const { checkEmail } = require('../validates/employee.validation');
const router = express.Router();
router.get('/', (req, res) => {
    return res.send('EmployeeRouter Router is working!');
});

router.post('/employee-detail', authUser, checkEmail, validate, EmployeeController.getEmployee);
module.exports = router;
