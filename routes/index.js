const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

const Emp = require('./employee');
const User = require('./Auth');

router.post('/create-emp',fetchUser , Emp.createEmployee);
router.post('/update-emp',fetchUser , Emp.updateEmployee);
router.post('/delete-emp',fetchUser , Emp.deleteEmployee);
router.get('/all', fetchUser, Emp.getAllEmployee);

// router.post('/signin', User.register);
router.post('/login', User.login);

module.exports = router;