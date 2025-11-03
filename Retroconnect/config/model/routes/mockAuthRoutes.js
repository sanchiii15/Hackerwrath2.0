const express = require('express');
const { getUsers, registerMock, loginMock } = require('../../../controllers/mockAuthController');

const router = express.Router();

// GET /api/auth/users → return all mock users
router.get('/users', getUsers);

// POST /api/auth/login → check if email exists
router.post('/login', loginMock);

// POST /api/auth/register → create a fake new user
router.post('/register', registerMock);

module.exports = router;


