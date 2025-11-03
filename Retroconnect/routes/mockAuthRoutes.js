const express = require('express');
const { getUsers, registerMock, loginMock } = require('../controllers/mockAuthController');

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', registerMock);
router.post('/login', loginMock);

module.exports = router;


