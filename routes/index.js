const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

const { createEmployee, updateEmployee, deleteEmployee, getAllEmployee } = require('../controllers/employee');
const {login} = require('../controllers/Auth');

router.post('/create-emp',fetchUser , createEmployee);
router.post('/update-emp',fetchUser , updateEmployee);
router.post('/delete-emp',fetchUser , deleteEmployee);
router.get('/all', fetchUser, getAllEmployee);

// router.post('/signin', User.register);
router.post('/login', login);

module.exports = router;